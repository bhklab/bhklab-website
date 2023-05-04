import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Layout from '../../../Components/Utils/Layout';

const StyledSocial = styled.div`
	width: 80%;
	.subject {
		color: red;
		display: flex;
		align-items: center;
		height: 60px;
		font-size: 14px;
		font-weight: normal;
		margin-top: 30px;
	}
	.date{
		color: darkred;
		display: flex;
		align-items: center;
		height: 30px;
		font-size: 12px;
		font-weight: normal;
	}
	.content {
		font-size: 15px;
		line-height: 25px;
		font-weight: normal;
		width: 75%;
		color: mediumvioletred;
	}
	.divider {
		margin-bottom: 30px;
		padding-top: 10px;
	}
`;

const Container = styled.div`
  width: 80%;
  margin: 0px 20px;
  display: flex;
  flex-direction: column;
`;

// const customizedSocial = (item,index, divider) => {
//     return (
//         <StyledSocial key = {index}>
//             <div className='subject'>{item.image}</div>
//             <div className='content'>{ item.date}</div>
//         </StyledSocial>
//     );
// }

const images = (socials) => {
	const imageList = [];
	// socials.forEach(item => item.)
	return imageList;
};

function Social() {
	const [ready, setReady] = useState(false);
	const [socials, setSocial] = useState({});
	const history = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
		const getSocial = async () => {
			const res = await axios.get('/api/data/socials');
			setSocial(res.data.socials);
		};
		getSocial();
	}, []);

	useEffect(() => (() => {
		if (history.action === 'POP' && history.location.pathname === '/') {
			console.log('history');
			history.replace({
				pathname: '/',
				state: {
				},
			});
		}
	}), [history]);

	return (
		<Layout>
			<Container>
				<StyledSocial className="individual">
					{
						socials.length
						// <ImageGallery items={images} />
							? ''
						// <>
						//     {socials.sort((a,b)=> b.date - a.date).map((item,i) =>
						//             (customizedSocial(item, i, (i !==socials.length-1))))}
						// </>
							: 'Loading'
					}
				</StyledSocial>
			</Container>
		</Layout>
	);
}

export default Social;
