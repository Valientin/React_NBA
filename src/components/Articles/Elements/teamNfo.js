import React from 'react';
import style from '../articles.css';

const TeamNfo = (props) => (
   <div>
      <div className={style.articleTeamHeader}>
         <div className={style.left}
            style={{
               background: `url('/img/teams/${props.team.logo}')`
            }}
         >
         </div>
         <div className={style.right}>
            <div>
               <span>{props.team.city} {props.team.name}</span>
            </div>
            <div>
               W{props.team.stats[0].wins}-L{props.team.stats[0].defeats}
            </div>
         </div>
      </div>
   </div>
)

export default TeamNfo;
