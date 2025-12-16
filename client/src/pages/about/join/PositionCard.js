import IconButton from '@mui/material/IconButton';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import React, { useContext, useState } from 'react';
import { Markup } from 'interweave';
// import DeleteButton from '../../../Components/Utils/DeleteButton';
import AuthContext from '../../../hooks/Contexts';
import AdminTool from '../../../components/utils/AdminTools';
import StyledPositionCard from './StyledPositionCard';

function StyledContent({ title, content }) {
	return (
		<>
			{/* eslint-disable react/jsx-one-expression-per-line */}
			<div className="subtitle">{title}:</div>
			{/* eslint-disable react/jsx-one-expression-per-line */}
			<Markup content={content} />
		</>
	);
}

/**
 * A Component for showing information of each available position in the lab
 * (ex. PhD position, Undergrad student, ect.)
 * */
function StyledPosition({ position }) {
	const { admin } = useContext(AuthContext);
	const { _id, title, description, responsibilities, reqQualifications, prefQualifications, apply } = position;
	const [display, setDisplay] = useState(false);
	return (
		<StyledPositionCard>
			{admin && <AdminTool id={_id} collection="positions" item={position} />}
			<div className="title">{title}</div>
			<Markup content={description} />
			{display && (
				<>
					{responsibilities && <StyledContent title="Responsibilities" content={responsibilities} />}
					{reqQualifications && <StyledContent title="Required qualifications" content={reqQualifications} />}
					{prefQualifications && <StyledContent title="Preferred qualifications" content={prefQualifications} />}
					{apply && <StyledContent title="How to apply" content={apply} />}
				</>
			)}
			{(responsibilities || reqQualifications || prefQualifications || apply) && (
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<IconButton onClick={() => setDisplay(!display)} aria-label="show more">
						{display ? <ExpandLess /> : <ExpandMore />}
					</IconButton>
				</div>
			)}
		</StyledPositionCard>
	);
}

export default StyledPosition;
