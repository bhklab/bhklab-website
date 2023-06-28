import { IconButton } from '@mui/material';
import React from 'react';
import DeleteButton from './Buttons/DeleteButton';
import EditButton from './Buttons/EditButton';

function AdminTool(props) {
	const { id, collection, item } = props;
	return (
		<div style={{ display: 'flex', color: 'gray', justifyContent: 'end' }}>
			<IconButton>
				<EditButton id={id} collection={collection} item={item} />
			</IconButton>
			<IconButton sx={{ marginLeft: '10px' }}>
				<DeleteButton id={id} collection={collection} />
			</IconButton>
		</div>
	);
}

export default AdminTool;
