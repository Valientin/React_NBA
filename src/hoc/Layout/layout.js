import React from 'react';

import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

import style from '../../css/style.css';

class Layout extends React.Component {
   state = {
      showNav: false
   }

   toggleSideNav = (action) => {
      this.setState({
         showNav: action
      })
   }

   render(){
      return(
         <div className={style.mainWrapper}>
            <Header
               user={this.props.user}
               showNav={this.state.showNav}
               onHideNav={() => this.toggleSideNav(false)}
               onShowNav={() => this.toggleSideNav(true)}
            />
            {this.props.children}
            <Footer />
         </div>
      )
   }
}

export default Layout;
