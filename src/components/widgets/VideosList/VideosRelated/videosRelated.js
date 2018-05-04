import React from 'react';

import VideosListTemplate from '../videosListTemplate';

const VideosRelated = (props) => {
   return(
      <VideosListTemplate
         data={props.data}
         teams={props.teams}
      />
   )
}

export default VideosRelated;
