import React from 'react';
import style from './slider.css';
import SliderTemplates from './sliderTemplates';

import { firebase, firebaseArticles, firebaseLooper } from '../../../firebase';

class NewsSlider extends React.Component {

   state = {
      news: []
   }

   componentWillMount(){
      firebaseArticles.limitToFirst(3).once('value')
      .then((snapshot) => {
         const news = firebaseLooper(snapshot)


         const asyncFunction = (item, i, cb) => {
            firebase.storage().ref('img')
            .child(item.image).getDownloadURL()
            .then(url => {
               news[i].image = url;
               cb();
            })
         }

         let requests = news.map((item, i) => {
            return new Promise((resolve) => {
               asyncFunction(item, i, resolve)
            })
         })

         Promise.all(requests).then(() => {
            this.setState({
               news
            })
         })
      });
   //    axios.get(`${URL}/articles?_start=${this.props.start}&_end=${this.props.end}`)
   //    .then(res => {
   //       this.setState({
   //          news: res.data
   //       })
   //    })
   }

   render(){
      return(
         <div className={style.featured_wrapper}>
            <SliderTemplates
               data={this.state.news}
               type={this.props.type}
               settings={this.props.settings}
            />
         </div>
      )
   }
}

export default NewsSlider;
