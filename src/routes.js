import React from 'react';
import { Switch } from 'react-router-dom';

import Layout from './hoc/Layout/layout';
import Home from './components/Home/home';
import NewsArticle from './components/Articles/News/Post/indexArticle';
import VideosArticle from './components/Articles/Videos/Video/indexVideos';
import NewsMain from './components/Articles/News/Main/indexMainNews';
import VideosMain from './components/Articles/Videos/Main/indexMainVideos';
import SignIn from './components/SignIn/signIn';
import Dashboard from './components/Dashboard/dashboard';

import PrivateRoutes from './components/AuthRoute/privateRoute';
import PublicRoutes from './components/AuthRoute/publicRoute';

const Routes = (props) => {
   return(
      <Switch>
         <Layout user={props.user}>
            <PublicRoutes {...props} restricted={false} path='/' exact component={Home} />
            <PublicRoutes {...props} restricted={false} path='/news' exact component={NewsMain} />
            <PublicRoutes {...props} restricted={false} path='/videos' exact component={VideosMain} />
            <PublicRoutes {...props} restricted={false} path='/articles/:id' exact component={NewsArticle} />
            <PublicRoutes {...props} restricted={false} path='/videos/:id' exact component={VideosArticle} />
            <PublicRoutes {...props} restricted={true} path='/sign-in' exact component={SignIn} />
            <PrivateRoutes {...props} path='/dashboard' exact component={Dashboard} />
         </Layout>
      </Switch>
   )
}

export default Routes;
