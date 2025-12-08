/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import { DateTime } from 'luxon';
import colors from '../../../styles/colors';
import { StyledCard, StyledAuthors, StyledTitle, StyledEvent, StyledLocation, StyledDate } from './CardStyles';

// const { DateTime } = require('luxon');

// presentation cards
function PresentationCard(props) {
	const { image, title, event, url, members, date, location } = props.publication;
	return (
		<StyledCard
			sx={{
				display: 'flex',
				margin: '15px 0 0 0',
				boxShadow: `0 0 4px ${colors.card_shadow_color}`,
			}}
			className="presentation-card-container"
		>
			{url ? (
				<a className="link" href={url} target="_blank" rel="noreferrer">
					<CardMedia
						component="img"
						sx={{ width: 150, objectFit: 'contain', marginTop: '10px' }}
						image={
							image
								? `https://storage.googleapis.com/caboodle-images/presentations/${image}`
								: 'https://storage.googleapis.com/caboodle-images/presentations/presentation-blurry.png'
						}
						alt={image ? 'an image of first slide' : 'a placeholder image for unavailable'}
					/>
				</a>
			) : (
				<CardMedia
					component="img"
					sx={{ width: 150, objectFit: 'contain', marginTop: '10px' }}
					image={
						image
							? `https://storage.googleapis.com/caboodle-images/presentations/${image}`
							: 'https://storage.googleapis.com/caboodle-images/presentations/presentation-blurry.png'
					}
					alt={image ? 'an image of first slide' : 'a placeholder image for unavailable'}
				/>
			)}
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<CardContent sx={{ flex: '1 0 auto' }}>
					<StyledTitle>
						<a className="link StyledTitle" href={url} target="_blank" rel="noreferrer">
							{title || `Event: ${event || ''}`}
						</a>
					</StyledTitle>
					<StyledEvent>{event}</StyledEvent>
					{location && <StyledLocation>{location}</StyledLocation>}
					{date && (
						<StyledDate>
							{/* {DateTime.fromISO(date).toFormat('LLL dd, yyyy')} */}
							{date.slice(0, -14)}
						</StyledDate>
					)}
					{members && (
						<Typography variant="h7" component="div">
							{members.map((item) => (
								<a key={item} href={item.name === 'Benjamin Haibe-Kains' ? '/people' : `people/${item.slug}`}>
									{item.name}
								</a>
							))}
						</Typography>
					)}
				</CardContent>
			</Box>
		</StyledCard>
	);
}

// publication cards
function PaperCard(props) {
	const { image, title, url, authors, date, publisher, doi } = props.publication;
	return (
		<StyledCard
			sx={{
				display: 'flex',
				margin: '15px 0 0 0',
				boxShadow: `0 0 4px ${colors.card_shadow_color}`,
				padding: 0,
			}}
		>
			<div style={{ width: '125px', height: '125px' }}>
				{url ? (
					<a className="link" href={url} target="_blank" rel="noreferrer">
						<CardMedia
							component="img"
							sx={{
								width: 125,
								objectFit: 'cover',
							}}
							image={
								image
									? `https://storage.googleapis.com/caboodle-images/publication/${image}`
									: 'https://storage.googleapis.com/caboodle-images/publication/publication-blurry.png'
							}
							alt={image ? "an image of publisher's cover" : 'a placeholder image for unavailable publisher cover'}
						/>
					</a>
				) : (
					<CardMedia
						component="img"
						sx={{
							width: 125,
							objectFit: 'cover',
						}}
						image={
							image
								? `https://storage.googleapis.com/caboodle-images/publication/${image}`
								: 'https://storage.googleapis.com/caboodle-images/publication/publication-blurry.png'
						}
						alt={image ? "an image of publisher's cover" : 'a placeholder image for unavailable publisher cover'}
					/>
				)}
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1px', padding: '6px', width: '100%' }}>
				<StyledTitle>
					<a className="link" href={url} target="_blank" rel="noreferrer">
						{title}
					</a>
					{doi && (
						<a
							href={`https://www.pmscience.ca/publication/${encodeURIComponent(doi)}`}
							target="_blank"
							rel="noreferrer"
						>
							<img
								src="/images/logo/science-portal-logo.svg"
								alt="science portal"
								style={{ width: '20px', height: '20px' }}
							/>
						</a>
					)}
				</StyledTitle>
				<StyledEvent>{publisher && <div>{publisher}</div>}</StyledEvent>
				{authors && <StyledAuthors>{authors}</StyledAuthors>}
				{date && <StyledDate>{date.slice(0, -14)}</StyledDate>}
			</div>
		</StyledCard>
	);
}
function PreprintCard(props) {
	const { image, title, authors, date, doi, publisher } = props.publication;
	return (
		<StyledCard
			sx={{
				display: 'flex',
				margin: '15px 0 0 0',
				boxShadow: `0 0 4px ${colors.card_shadow_color}`,
			}}
		>
			<div style={{ width: '125px', height: '125px' }}>
				<CardMedia
					component="img"
					sx={{ width: 125, objectFit: 'cover', border: '1' }}
					image={
						image
							? `https://storage.googleapis.com/caboodle-images/publication/${image}`
							: 'https://storage.googleapis.com/caboodle-images/publication/publication-blurry.png'
					}
					alt={image ? "an image of publisher's cover" : 'a placeholder image for unavailable publisher cover'}
				/>
			</div>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<CardContent sx={{ flex: '1 0 auto' }}>
					<StyledTitle>
						<a className="link" href={`https://doi.org/${doi}`} target="_blank" rel="noreferrer">
							{title}
						</a>
					</StyledTitle>
					{publisher && <StyledEvent>{publisher}</StyledEvent>}
					{authors && <StyledAuthors>{authors}</StyledAuthors>}
					{date && <StyledDate>{date}</StyledDate>}
				</CardContent>
			</Box>
		</StyledCard>
	);
}

export { PresentationCard, PaperCard, PreprintCard };
