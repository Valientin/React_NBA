import React from 'react';
import { Link } from 'react-router-dom';
import CardInfo from '../CardInfo/cardInfo';

import style from './videosList.css';

const VideosListTemplate = (props) => {
   return props.data.map((item,i) =>{
      return (
         <Link to={`/videos/${item.id}`} key={i} className={style.videosList_link}>
            <div className={style.videoListItem_wrapper}>
               <div className={style.left}
                  style={{
                     background: `url(/img/videos/${item.image})`
                  }}
               >
                  <div></div>
               </div>
               <div className={style.right}>
                  <CardInfo teams={props.teams} team={item.team} date={item.date}/>
                  <h2>{item.title}</h2>
               </div>
            </div>
         </Link>
      )
   })
}

export default VideosListTemplate;
