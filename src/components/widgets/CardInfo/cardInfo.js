import React from 'react';
import moment from 'moment';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import style from './cardInfo.css';

const CardInfo = (props) => {

   const teamName = (teams, team) => {
      let data = teams.find((item) => {
         return item.teamId === team
      });
      if(data){
         return data.name;
      } else return 'Not name';
   }

   const formatDate = (date) => {
      return moment(date).format('MM-DD-YYYY');
   }

   return(
      <div className={style.cardNfo}>
         <span className={style.teamName}>
            {teamName(props.teams, props.team)}
         </span>
         <span className={style.date}>
            <FontAwesomeIcon icon={faClock}/>
            {formatDate(props.date)}
         </span>
      </div>
   )
}

export default CardInfo;
