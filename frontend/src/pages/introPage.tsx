import * as React from 'react';

import IntroContainer from '../container/IntroContainer';
import CategoryCardContainer from '../container/CategoryCardContainer';

const IntroPage: React.SFC<{}> = () => {
  return (
    <React.Fragment>
      <IntroContainer />
      <CategoryCardContainer />
    </React.Fragment>
  );
};

export default IntroPage;
