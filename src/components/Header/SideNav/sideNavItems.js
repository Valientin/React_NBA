import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { firebase } from '../../../firebase';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faHome from '@fortawesome/fontawesome-free-solid/faHome';
import faNewspaper from '@fortawesome/fontawesome-free-solid/faNewspaper';
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay';
import faSignInAlt from '@fortawesome/fontawesome-free-solid/faSignInAlt';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import style from './sideNav.css';

const SideNavItems = (props) => {
   const items = [
      {
         type: style.option,
         icon: faHome,
         text: 'Home',
         link: '/',
         login: ''
      },
      {
         type: style.option,
         icon: faNewspaper,
         text: 'News',
         link: '/news',
         login: ''
      },
      {
         type: style.option,
         icon: faPlay,
         text: 'Videos',
         link: '/videos',
         login: ''
      },
      {
         type: style.option,
         icon: faNewspaper,
         text: 'Dashboard',
         link: '/dashboard',
         login: false
      },
      {
         type: style.option,
         icon: faSignInAlt,
         text: 'Sign in',
         link: '/sign-in',
         login: true
      },
      {
         type: style.option,
         icon: faSignOutAlt,
         text: 'Sign out',
         link: '/sign-out',
         login: false
      }
   ]

   const element = (item, i) => (
      <div key={i} className={item.type}>
         <Link to={item.link} >
            <FontAwesomeIcon icon={item.icon} />
            <span>{item.text}</span>
         </Link>
      </div>
   )

   const restricted = (item,i) => {
      let template = null;
      if(props.user === null && item.login) {
         template = element(item,i)
      }
      if(props.user !== null && !item.login) {
         if(item.link === '/sign-out'){
            template = (
               <div key={i}
                  className={item.type}
                  onClick={() => {
                     firebase.auth().signOut()
                     .then(() => {
                        props.history.push('/')
                     })
                  }}
               >
                  <FontAwesomeIcon icon={item.icon} />
                  <span>{item.text}</span>
               </div>
            )
         } else {
            template = element(item,i)
         }
      }
      return template;
   }

   const showItems = () => {
      return items.map( (item, i) => {
         return item.login !== '' ?
            restricted(item,i)
         :
            element(item,i)
      })
   }

   return(
      <div>
         {showItems()}
      </div>
   )
}

export default withRouter(SideNavItems);
