import * as React from 'react';
import styled from 'styled-components';

import MenuContainer from '../container/MenuContainer';
import PlanContainer from '../container/PlanContainer';

export const Div = styled.div`padding-top: 70px;`;

const PlanPage: React.SFC<{}> = () => {
	return (
		<React.Fragment>
			<MenuContainer titleColor="black">책 읽기 프로젝트</MenuContainer>
			<Div>
				<PlanContainer />
			</Div>
		</React.Fragment>
	);
};

export default PlanPage;
