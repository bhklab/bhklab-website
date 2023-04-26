import Layout from '../../../Components/Utils/Layout';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'primeicons/primeicons.css';
import {PaginatedPublications} from '../PublicationComponents/PaginatedPublications';
import {PresentationCard} from '../PublicationComponents/PublicationCard';
import Container from '@mui/material/Container';
import {motion} from 'framer-motion';
const customizedContent = (item, index) => {
	return ( <PresentationCard key = {index} publication={item}/>);
};


const Presentation= () => {
	const [ready, setReady] = useState(false);
	const [presentations, setPresentation] = useState({});

	useEffect(() => {
		window.scrollTo(0, 0);
		const getPresentation = async () => {
			const res = await axios.get('/api/data/presentations');
			setPresentation(res.data.presentations.sort((a,b) => new Date(b.date) - new Date(a.date)));
			setReady(true);
		};
		getPresentation();
	}, []);

	return(
		<Layout>
			<Container fixed>
				{   ready &&
				<motion.nav
					className="navbar"
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<PaginatedPublications
						customizedContent={customizedContent}
						publications= {presentations}
						itemsPerPage={10}
					/>
				</motion.nav>
				}
			</Container>
		</Layout>
	);
};

export default Presentation;
