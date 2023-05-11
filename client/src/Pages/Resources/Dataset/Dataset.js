/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import parse from 'html-react-parser';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import Layout from '../../../Components/Utils/Layout';
import StyledHeading from '../../../styles/StyledHeading';
import colors from '../../../styles/colors';

const StyledContainer = styled.div`
	color: ${colors.primary_text_color};
	margin-bottom: 80px;

	.text {
		margin: 20px 0;
	}

	td {
		color: ${colors.primary_text_color} !important;
	}
`;

const accessions = (items) => (
	items.map((item) => (
		<div className="content" key={item.name}>
			<a href={item.link} target="_blank" rel="noreferrer">{item.name}</a>
			<br />
		</div>
	))
);

function Dataset() {
	const [ready, setReady] = useState(false);
	const [datasets, setDataset] = useState({});
	const history = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
		const getDataset = async () => {
			const res = await axios.get('/api/data/datasets');
			setDataset(res.data.datasets);
		};
		getDataset().then(() => { setReady(true); });
	}, []);

	useEffect(() => (() => {
		if (history.action === 'POP' && history.location.pathname === '/') {
			history.replace({
				pathname: '/',
				state: {
				},
			});
		}
	}), [history]);

	return (
		<Layout>
			<StyledContainer>
				<StyledHeading>
					Datasets
				</StyledHeading>
				<Container>
					<div className="text">
						Data generated/curated as part of our research are shared via public repositories
						such as NCBI Gene Expression Omnibus or data packages.
						The lab maintains the following datasets:
					</div>
				</Container>
				<Container>
					{
						ready
						&& (
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 650 }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>Accession</TableCell>
											<TableCell align="left">Title</TableCell>
											<TableCell align="right">#</TableCell>
											<TableCell align="right">Release</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{
											datasets.map((row) => (
												<TableRow
													key={row._id}
													sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
												>
													<TableCell component="th" scope="row">
														{accessions(row.accession)}
													</TableCell>
													<TableCell align="left">{parse(row.title)}</TableCell>
													<TableCell align="right">{row.samples}</TableCell>
													<TableCell align="right">{row.release}</TableCell>
												</TableRow>
											))
										}
									</TableBody>
								</Table>
							</TableContainer>
						)
					}
				</Container>
			</StyledContainer>
		</Layout>
	);
}

export default Dataset;
