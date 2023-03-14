import Layout from '../../../Components/Utils/Layout';
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {PaginatedPublications} from "../PublicationComponents/PaginatedPublications";
import {PaperCard} from "../PublicationComponents/PublicationCard";
import Container from '@mui/material/Container';
import {motion} from 'framer-motion';

const customizedContent = (item, index) => {
    return ( <PaperCard index = {index} publication={item}/>);
};


const Papers= () => {
    const [ready, setReady] = useState(false);
    const [publications, setPublications] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0)
        const getPublications = async () => {
            const res = await axios.get('/api/data/publications');
            setPublications(res.data.publications.sort((a,b) => new Date(b.releaseDate) - new Date(a.releaseDate)));
            setReady(true);
        }
        getPublications();
    }, []);

    return(
        <Layout>
            <Container fixed>
                { ready &&
                    <motion.nav
                        className="navbar"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <PaginatedPublications
                            customizedContent={customizedContent}
                            publications= {publications}
                            itemsPerPage={10}
                        />
                    </motion.nav>
                }
            </Container>
        </Layout>
    );
}

export default Papers;
