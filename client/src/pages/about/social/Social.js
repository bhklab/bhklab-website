import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, StyledSocial } from './SocialStyles';
import Layout from '../../../Components/utils/Layout';

// TODO: Not sure if it this component is used anywhere! need to ask Parinaz!

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
