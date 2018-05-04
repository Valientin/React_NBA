import React from 'react';
import { Link } from 'react-router-dom';
import { CURRENT_YEAR } from '../../config';

import style from './footer.css';

const Footer = () => {
   return(
      <div className={style.footer}>
         <Link to="/" className={style.logo}>
            <img alt='nba logo' src='/img/nba_logo.png' />
         </Link>
         <h4 className={style.right}> @NBA {CURRENT_YEAR} All rights reserved</h4>
      </div>
   )
}

export default Footer;
