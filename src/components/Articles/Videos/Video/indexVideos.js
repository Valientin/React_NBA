import React from 'react';
import { firebaseDB, firebaseTeams, firebaseLooper, firebaseVideos } from '../../../../firebase';
import style from '../../articles.css';

import HeaderVideos from './headerVideos';
import VideosRelated from '../../../widgets/VideosList/VideosRelated/videosRelated';

class VideosArticle extends React.Component {

   state = {
      article: [],
      team: [],
      teams: [],
      related: []
   }

   componentWillMount(){
      firebaseDB.ref(`videos/${this.props.match.params.id}`).once('value')
      .then((snapshot) => {
         let article = snapshot.val();

         firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value')
         .then((snapshot) => {
            const team = firebaseLooper(snapshot);
            this.setState({
               article,
               team
            })
            this.getRelated();
         })
      })
      // axios.get(`${URL}/videos?id=${this.props.match.params.id}`)
      // .then(res => {
      //    let article = res.data[0]
      //
      //    axios.get(`${URL}/teams?id=${article.team}`)
      //    .then(res => {
      //       this.setState({
      //          article,
      //          team: res.data
      //       });
      //       this.getRelated();
      //    })
      // })
   }

   getRelated = () => {
      firebaseTeams.once('value')
      .then((snapshot) => {
         const teams = firebaseLooper(snapshot);

         firebaseVideos
         .orderByChild("team")
         .equalTo(this.state.article.team)
         .limitToFirst(3).once('value')
         .then((snapshot) => {
            const related = firebaseLooper(snapshot);
            this.setState({
               teams,
               related
            })
         })
      })
      // axios.get(`${URL}/teams`)
      // .then(res => {
      //    let teams = res.data;
      //
      //    axios.get(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`)
      //    .then(res => {
      //       this.setState({
      //          teams,
      //          related: res.data
      //       })
      //    })
      // })
   }

   render(){
      const article = this.state.article;
      const team = this.state.team;

      return(
         <div>
            <HeaderVideos teamData={team[0]} />
            <div className={style.videoWrapper}>
               <h1>{article.title}</h1>
               <iframe
                  title="videoplayer"
                  width="100%"
                  height="300px"
                  src={`https://www.youtube.com/embed/${article.url}`}
               >
               </iframe>
               {/* <div className={style.videoPlayer}></div> */}
            </div>
            <VideosRelated
               data={this.state.related}
               teams={this.state.teams}
            />
         </div>
      )
   }
}

export default VideosArticle;
