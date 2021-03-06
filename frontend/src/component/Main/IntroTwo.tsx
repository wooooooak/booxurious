import * as React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';

import { Rate } from 'antd';

import { device } from '../../styled/device';
import { Comment } from 'styled-icons/fa-regular/Comment';
import { Heart } from 'styled-icons/octicons/Heart';

interface Datum {
	source: string;
	caption: string;
	title: string;
	subTitle: string;
	postAuthor: string;
	commentCount: number;
	like: number;
	rate: number;
}

// Array of images with captions
const datas: Datum[] = [
	{
		source:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTpdH_ZhpoJM5TeBekJW0C5ZPokH-v9lC0PyzLzBRwRj_k3p-e',
		caption: '1',
		title: '보통의 존재',
		subTitle: '책을 읽고 나서',
		postAuthor: 'wooooooak',
		commentCount: 5,
		like: 3,
		rate: 3
	},
	{
		source:
			'http://www.changbi.com/wp-content/uploads/2014/06/20140616_173111-e1402907483198.jpg',
		caption: '2',
		title: '알로하',
		subTitle: '알로하를 읽고 나서',
		postAuthor: 'miss go',
		commentCount: 2,
		like: 2,
		rate: 5
	},
	{
		source:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2nH0VpFWxVDMxM159YDHHsfeG5fyhK5iqybqYsHbC9gk-GdT5',
		caption: '3',
		title: '모든 순간이 너였다',
		subTitle: '모든 순간이 너였다를 읽고 나서',
		postAuthor: 'miss go',
		commentCount: 8,
		like: 13,
		rate: 5
	},
	{
		source:
			'http://www.iusm.co.kr/news/photo/201801/785331_359093_1115.jpg ',
		caption: '4',
		title: '기쁨의 정원',
		subTitle: '기쁘다!',
		postAuthor: 'miss lee',
		commentCount: 51,
		like: 55,
		rate: 4
	},
	{
		source:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdOEvHrMASlrU9-ZmbuObwrkq01WHfqudCoWmMkGFHcN94C_1t',
		caption: '5',
		title: '인생 수업',
		subTitle: '수업이 왜 이렇게 많아?',
		postAuthor: 'hello',
		commentCount: 2,
		like: 3,
		rate: 4
	},
	{
		source:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtGxBpZOl_hdzrc-IyPTbXKyh3jhxGu1MXHI1-WuKRGsa-dxQU',
		caption: '6',
		title: '창문 넘어 도망치 100세 노인',
		subTitle: '힘도 좋다',
		postAuthor: 'formula',
		commentCount: 11,
		like: 6,
		rate: 2
	},
	{
		source:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLc5cJS2RbAAiWI_ZODVBX-vNvncOnUGfVYWPDPD2Kt2llWlpDkA',
		caption: '7',
		title: '저녁이 깊다',
		subTitle: '응.',
		postAuthor: 'auto red',
		commentCount: 7,
		like: 22,
		rate: 3
	},
	{
		source:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5oy1p6ldyYT31p9UOYAHukjKDNMETRHUie_VvrHYkCNMHRzez',
		caption: '8',
		title: '도쿄',
		subTitle: '이건 사진이 왜이래',
		postAuthor: 'elecoder',
		commentCount: 16,
		like: 50,
		rate: 1
	},
	{
		source:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPRULNOtaQasCtflK1EbhJhdJI9sXE_ZBdUwqPewvebi2q2Mzv7Q',
		caption: '9',
		title: '홍차가 더 좋아지는 시간',
		subTitle: '홍차 좋지',
		postAuthor: 'elebooks manager',
		commentCount: 24,
		like: 66,
		rate: 5
	}
];

interface IProps {}

interface IState {}

const IntroTwoContrainer = styled.div`
	width: 100vw;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	background-color: #f2f5f7;
	/* height: 100vh; */

	@media ${device.desktop} {
		width: 100vw;
	}
	@media ${device.desktopL} {
		width: 80vw;
		margin: 0 auto;
	}
`;

const Card = styled.div`
	width: 450px;
	height: 270px;
	background-color: white;
	margin: 30px 10px;
	display: flex;
	flex-direction: column;
`;

interface IImg {
	imgSource: string;
}

const TopArea = styled.div`
	margin-bottom: auto;
	display: flex;
	flex-direction: row;
`;

const TextAreaInTopArea = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0px 20px;
	width: 60%;
`;

const Img = styledTS<IImg>(styled.div)`
  height: 230px;
  width: 170px;
  margin-top: -35px;
  margin-left: 20px;
  box-shadow: 2px 2px 30px gray;
  border-radius: 2px;
  background-image: ${(props) => `url(${props.imgSource})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transition: all 0.2s 0s ease-in-out; 
  &:hover{
    transform: translateY(-10px);
  }
`;

const AuthorName = styled.div`
	font-size: 0.9em;
	font-weight: bold;
	margin-top: 10px;
`;

const BottomArea = styled.div`
	/* background-color: #f8f4f3; */
	background: #ee9ca7; /* fallback for old browsers */
	background: -webkit-linear-gradient(
		to right,
		#ffdde1,
		#ee9ca7
	); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(
		to right,
		#ffdde1,
		#ee9ca7
	); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	height: 45px;
	width: 100%;
	margin-top: auto;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
`;

const StyledComment = Comment.extend`margin-right: 5px;`;
const StyledHeart = Heart.extend`margin-right: 5px;`;
const CountNumber = styled.span`
	margin-left: -3px;
	margin-right: 10px;
`;

const Title = styled.h2`margin-top: 1.2em;`;
const SubTitle = styled.div`margin-bottom: 1.3em;`;
const H1 = styled.h1`
	@import url('https://fonts.googleapis.com/css?family=Crete+Round');
	font-family: 'Crete Round', serif;
	font-size: 3.5em;
	margin-bottom: 90px;
`;

class IntroTwo extends React.Component<IProps, IState> {
	mapDatasToList = () => {
		return datas.map((data, index) => {
			return (
				<Card key={index}>
					<TopArea>
						<Img imgSource={data.source} />
						<TextAreaInTopArea>
							<Title>{data.title}</Title>
							<SubTitle>{data.subTitle}</SubTitle>
							<Rate disabled={true} defaultValue={data.rate} />
							<AuthorName>by {data.postAuthor}</AuthorName>
						</TextAreaInTopArea>
					</TopArea>
					<BottomArea>
						<StyledComment size={15} />
						<CountNumber>{data.commentCount}</CountNumber>
						<StyledHeart size={17} />
						<CountNumber>{data.like}</CountNumber>
					</BottomArea>
				</Card>
			);
		});
	};
	render() {
		return (
			<div style={{ textAlign: 'center' }}>
				<H1> Popular Book Reports </H1>
				<IntroTwoContrainer>{this.mapDatasToList()}</IntroTwoContrainer>
				<div style={{ textAlign: 'center' }}>see more book reports</div>
			</div>
		);
	}
}

export default IntroTwo;
