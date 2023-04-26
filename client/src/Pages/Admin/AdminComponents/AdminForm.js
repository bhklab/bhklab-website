import React, {useEffect, useState} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import DeleteButton from '../../../Components/Utils/DeleteButton';
import EditButton from '../../../Components/Utils/EditButton';
import AddButton from '../../../Components/Utils/AddButton';


function TablePaginationActions(props) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (e) => {onPageChange(e, 0);};

	const handleBackButtonClick = (e) => {onPageChange(e, page - 1);};

	const handleNextButtonClick = (e) => {onPageChange(e, page + 1);};

	const handleLastPageButtonClick = (e) => {
		onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	);
}


const AdminPage = () => {
	const [entities, setEntities] = useState([]);
	const [selectedCollection, setSelectedCollection] = useState('');
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(25);

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - entities.length) : 0;

	const handleChangePage = ( e  , newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (e) => {
		setRowsPerPage(parseInt(e.target.value, 10));
		setPage(0);
	};

	useEffect(() => {
		// Fetch entities from MongoDB collection and set them to state
		const fetchData = async () => {
			try{
				const response = await fetch(`/api/data/${selectedCollection.toLowerCase()}`);
				const data = await response.json();
				setEntities(data[`${selectedCollection.toLowerCase()}`]);
			} catch {
				console.log('Error');
			}
		};
		fetchData();
	}, [selectedCollection]);

	const handleAddClick = () => {
		// Handle edit button click for entity with given id
		console.log('Edit clicked for entity');
	};

	const handleEditClick = (id) => {
		// Handle edit button click for entity with given id
		console.log(`Edit clicked for entity with id ${id}`);
	};

	const handleDeleteClick = (id) => {
		// Handle delete button click for entity with given id
		console.log(`Delete clicked for entity with id ${id}`);
	};

	const handleCollectionChange = (event, value) => {

		setSelectedCollection(value);
	};

	return (
		<div style={{marginTop: '30px'}}>
			<Autocomplete
				disablePortal
				options={['Publications', 'Presentations', 'Datasets', 'Members', 'Positions']}
				// options={['Datasets', 'Publications']}
				value={selectedCollection}
				onChange={handleCollectionChange}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Select Collection"
						sx={{ width: '200px' }} // Add this style to adjust the width of the Autocomplete
					/>
				)}
			/>

			{selectedCollection && (
				<div>
					<h1>{selectedCollection}</h1>
					<TableContainer component={Paper}>
						<IconButton onClick={() => handleAddClick()}>
							<AddButton/>
						</IconButton>
						<Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>Options</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{(rowsPerPage > 0
									? entities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									: entities
								).map((row, index) => (
									<TableRow key={index}>
										<TableCell component="th" scope="row">
											{row.title || row.name}
										</TableCell>
										<TableCell style={{ width: 160 }} align="right">

										</TableCell>
										<TableCell style={{ width: 160 }} align="right">
											<IconButton onClick={() => handleEditClick(row._id)}>
												<EditButton item={row}/>
											</IconButton>
											<IconButton onClick={() => handleDeleteClick(row._id)}>
												<DeleteButton id={row._id} collection={selectedCollection.toLowerCase()}/>
											</IconButton>
										</TableCell>
									</TableRow>
								))}
								{emptyRows > 0 && (
									<TableRow style={{ height: 53 * emptyRows }}>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
										colSpan={3}
										count={entities.length}
										rowsPerPage={rowsPerPage}
										page={page}
										SelectProps={{
											inputProps: {
												'aria-label': 'rows per page',
											},
											native: true,
										}}
										onPageChange={handleChangePage}
										onRowsPerPageChange={handleChangeRowsPerPage}
										ActionsComponent={TablePaginationActions}
									/>
								</TableRow>
							</TableFooter>
						</Table>
					</TableContainer>
				</div>
			)}
		</div>
	);
};

export default AdminPage;
