import Layout from '../../../Components/Utils/Layout';
import StyledPosition from "./PositionCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";

const JoinUs = () => {
    const [ready, setReady] = useState(false);
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        const fetchPositions = async () => {
            const { data } = await axios.get("/api/data/positions");
            setPositions(data.positions);
            console.log(data.positions)
            setReady(true);
        };
        fetchPositions();
    }, []);

    return (
        <Layout>
            <Container>
                {ready &&
                    positions.map((position, index) => (
                        <StyledPosition key={index} position={position} />
                    ))
                }
            </Container>
        </Layout>
    );
};

export default JoinUs;
