import React from 'react';
import { firebase, firebaseDB, firebaseTeams, firebaseLooper } from '../../../../firebase';
import HeaderArticle from './headerArticle';
import style from '../../articles.css';

class NewsArticles extends React.Component {

   state = {
      article: [],
      team: [],
      imageURL: ''
   }

   componentWillMount(){
      firebaseDB.ref(`articles/${this.props.match.params.id}`).once('value')
      .then((snapshot) => {
         let article = snapshot.val();

         firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value')
         .then((snapshot) => {
            const team = firebaseLooper(snapshot);
            this.setState({
               article,
               team
            })
            this.getImageURL(article.image)
         })
      })

      // axios.get(`${URL}/articles?id=${this.props.match.params.id}`)
      // .then(res => {
      //    let article = res.data[0]
      //
      //    axios.get(`${URL}/teams?id=${article.team}`)
      //    .then(res => {
      //       this.setState({
      //          article,
      //          team: res.data
      //       })
      //    })
      // })
   }

   getImageURL = (filename) => {
      firebase.storage().ref('img')
      .child(filename).getDownloadURL()
      .then( url => {
         this.setState({
            imageURL: url
         })
      })

   }

   render(){
      const article = this.state.article;
      const team = this.state.team;
      return(
         <div className={style.articleWrapper}>
            <HeaderArticle
               teamData={team[0]}
               date={article.date}
               author={article.author}
            />
            <div className={style.articleBody}>
               <h1>{article.title}</h1>
               <div className={style.articleImage}
                  style={{
                     background:`url('${this.state.imageURL}')`
                  }}
               ></div>
               <div className={style.articleText}
                  dangerouslySetInnerHTML={{
                     __html: article.body
                  }}
               >
               </div>
            </div>
         </div>
      )
   }
}

export default NewsArticles;
