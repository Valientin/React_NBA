import React from 'react';

import NewsSlider from '../../../widgets/NewsSlider/slider';
import NewsList from '../../../widgets/NewsList/newsList';

const NewsMain = () => {
   return(
      <div>
         <NewsSlider
            type="featured"
            settings={{dots: false}}
            start={0}
            end={2}
         />
         <NewsList
            type="cardMain"
            loadmore={true}
            start={0}
            amount={6}
         />
      </div>
   )
}

export default NewsMain;
