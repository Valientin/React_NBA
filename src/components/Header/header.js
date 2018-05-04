import React from 'react';
import style from './header.css';
import { Link } from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAlignLeft from '@fortawesome/fontawesome-free-solid/faAlignLeft';

import SideNav from './SideNav/sideNav';

const Header = (props) => {

   const navBars = () => {
      return(
         <div className={style.bars}>
            <FontAwesomeIcon icon={faAlignLeft}
               size='lg'
               color="#dfdfdf"
               onClick={props.onShowNav}/>
         </div>
      )

   }

   const logo = () => (
      <Link to='/' className={style.logo}>
         <img alt='nba logo' src='/img/nba_logo.png' />
      </Link>
   )
   return(
      <header className={style.header}>
         <SideNav {...props} />
         <div className={style.headerOpt}>
            {navBars()}
            {logo()}
         </div>
      </header>
   )
}

export default Header;
