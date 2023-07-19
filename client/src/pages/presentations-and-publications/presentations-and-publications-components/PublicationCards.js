/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import { DateTime } from 'luxon';
import colors from '../../../styles/colors';
import { StyledCard, StyledAuthors } from './CardStyles';

const { DateTime } = require('luxon');

// presentation cards
function PresentationCard(props) {
	const {
		image, title, event, url, members, date, location,
	} = props.publication;
	return (
		<StyledCard
			sx={{
				display: 'flex',
				margin: '15px 0 0 0',
				height: '125px',
				boxShadow: `0 0 4px ${colors.card_shadow_color}`,
			}}
			className="presentation-card-container"
		>
			{
				url
					? (
						<a className="link" href={url} target="_blank" rel="noreferrer">
							<CardMedia
								component="img"
								sx={{ width: 175, objectFit: 'contain', marginTop: '10px' }}
								image={image ? `images/presentations/${image}` : 'images/presentations/presentation-blurry.png'}
								alt={image ? 'an image of first slide' : 'a placeholder image for unavailable'}
							/>
						</a>
					)
					: (
						<CardMedia
							component="img"
							sx={{ width: 175, objectFit: 'contain', marginTop: '10px' }}
							image={image ? `images/presentations/${image}` : 'images/presentations/presentation-blurry.png'}
							alt={image ? 'an image of first slide' : 'a placeholder image for unavailable'}
						/>
					)
			}
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<CardContent sx={{ flex: '1 0 auto' }}>
					<Typography component="div" variant="subtitle1" style={{ color: `${colors.primary_text_color}`, fontSize: '16px', 'line-height': '1.25' }}>
						{
							url
								? (
									<a className="link" href={url} target="_blank" rel="noreferrer">
										{title || `Event: ${event || ''}`}
									</a>
								)
								: (title || `Event: ${event || ''}`)
						}
					</Typography>
					<Typography component="div" variant="subtitle2" style={{ color: `${colors.primary_text_color}` }}>
						{event}
					</Typography>
					{
						location
							&& (
								<Typography component="div" style={{ color: `${colors.primary_text_color}`, fontSize: '12px' }}>
									{location}
								</Typography>
							)
					}
					{
						date
							&& (
								<Typography variant="h7" color="text.secondary" component="div" style={{ color: `${colors.primary_text_light}`, fontSize: '12px', margin: '2px 0' }}>
									{DateTime.fromISO(date).toFormat('LLL dd, yyyy')}
								</Typography>
							)
					}
					{
						members
							&& (
								<Typography variant="h7" component="div">
									{members.map((item) => (
										<a
											key={item}
											href={item.name === 'Benjamin Haibe-Kains'
												? '/people' : `people/${item.slug}`}
										>
											{item.name}
										</a>
									))}
								</Typography>
							)
					}
				</CardContent>
			</Box>
		</StyledCard>
	);
}

// publication cards
function PaperCard(props) {
	const {
		image, title, url, authors, members, releaseDate, publisher,
	} = props.publication;
	return (
		<StyledCard sx={{
			display: 'flex',
			margin: '15px 0 0 0',
			height: '125px',
			boxShadow: `0 0 4px ${colors.card_shadow_color}`,
		}}
		>
			<div style={{ width: '125px' }}>
				{
					url
						? (
							<a className="link" href={url} target="_blank" rel="noreferrer">
								<CardMedia
									component="img"
									sx={{
										width: 125,
										objectFit: 'cover',
									}}
									image={image ? `images/publication/${image}` : 'images/publication/publication-blurry.png'}
									alt={image ? 'an image of publisher\'s cover' : 'a placeholder image for unavailable publisher cover'}
								/>
							</a>
						) : (
							<CardMedia
								component="img"
								sx={{ width: 110, objectFit: 'cover' }}
								image={image ? `images/publication/${image}` : 'images/publication/publication-blurry.png'}
								alt={image ? 'an image of publisher\'s cover' : 'a placeholder image for unavailable publisher cover'}
							/>
						)
				}
			</div>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<CardContent sx={{ flex: '1 0 auto' }}>
					<Typography component="div" variant="subtitle1" style={{ fontSize: '16px', 'line-height': '1.25' }}>
						{
							url
								? (
									<a className="link" href={url} target="_blank" rel="noreferrer">
										{title}
									</a>
								) : { title }
						}

					</Typography>
					<Typography
						component="div"
						variant="subtitle2"
						style={{
							color: `${colors.secondary_text_color}`,
							'line-height': '1.25',
						}}
					>
						{
							publisher
							&& (
								<div>
									{publisher}
								</div>
							)
						}
					</Typography>
					{
						members
						&& (
							<StyledAuthors style={{ color: `${colors.primary_text_color}`, fontSize: '12px' }}>
								{authors}
							</StyledAuthors>
						)
					}
					{ releaseDate
					&& (
						<Typography variant="h7" component="div" style={{ color: `${colors.primary_text_light}`, fontSize: '12px', marginTop: '3px' }}>
							{releaseDate}
						</Typography>
					)}
				</CardContent>
			</Box>
		</StyledCard>
	);
}
function PreprintCard(props) {
	const {
		image, title, authors, date, doi, publisher,
	} = props.publication;
	return (
		<StyledCard sx={{
			display: 'flex',
			margin: '15px 0 0 0',
			height: '125px',
			boxShadow: `0 0 4px ${colors.card_shadow_color}`,
		}}
		>
			<div style={{ width: '125px' }}>
				<CardMedia
					component="img"
					sx={{ width: 125, objectFit: 'cover', border: '1' }}
					image={image ? `images/publication/${image}` : 'images/publication/publication-blurry.png'}
					alt={image ? 'an image of publisher\'s cover' : 'a placeholder image for unavailable publisher cover'}
				/>
			</div>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<CardContent sx={{ flex: '1 0 auto' }}>
					<Typography component="div" variant="subtitle1" style={{ fontSize: '16px', lineHeight: '1.25', color: colors.link_color }}>
						<a className="link" href={`https://doi.org/${doi}`} target="_blank" rel="noreferrer">
							{title}
						</a>

					</Typography>
					{
						publisher
						&& (
							<Typography
								component="div"
								variant="subtitle2"
								style={{
									color: `${colors.secondary_text_color}`,
									'line-height': '1.25',
								}}
							>
								{publisher}
							</Typography>
						)
					}
					{
						authors
						&& (
							<StyledAuthors style={{ color: `${colors.gray_footer}`, fontSize: '12px' }}>
								{authors}
							</StyledAuthors>
						)
					}
					{
						date
						&& (
							<Typography variant="h7" component="div" style={{ color: `${colors.primary_text_light}`, fontSize: '12px', margin: '4px 0' }}>
								{date}
							</Typography>
						)
					}
				</CardContent>
			</Box>
		</StyledCard>
	);
}

export {
	PresentationCard,
	PaperCard,
	PreprintCard,
};
