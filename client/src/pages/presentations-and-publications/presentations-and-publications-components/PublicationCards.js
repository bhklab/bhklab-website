/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import { DateTime } from 'luxon';
import colors from '../../../styles/colors';

const { DateTime } = require('luxon');

// presentation cards
function PresentationCard(props) {
	const {
		image, title, event, url, members, date,
	} = props.publication;
	return (
		<Card
			sx={{
				display: 'flex',
				margin: '15px 0 0 0',
				height: '110px',
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
								sx={{ width: 150, objectFit: 'contain', marginTop: '10px' }}
								image={image ? `images/presentations/${image}` : 'images/presentations/presentation-blurry.png'}
								alt={image ? 'an image of first slide' : 'a placeholder image for unavailable'}
							/>
						</a>
					)
					: (
						<CardMedia
							component="img"
							sx={{ width: 150, objectFit: 'contain', marginTop: '10px' }}
							image={image ? `images/presentations/${image}` : 'images/presentations/presentation-blurry.png'}
							alt={image ? 'an image of first slide' : 'a placeholder image for unavailable'}
						/>
					)
			}
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<CardContent sx={{ flex: '1 0 auto' }}>
					<Typography component="div" variant="subtitle1">
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
					{ date
							&& (
								<Typography variant="h7" color="text.secondary" component="div" style={{ fontSize: '12px' }}>
									{DateTime.fromISO(date).toFormat('LLL dd, yyyy')}
								</Typography>
							)}
					{
						members
							&& (
								<Typography variant="h7" color="text.secondary" component="div">
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
		</Card>
	);
}

// publication cards
function PaperCard(props) {
	const {
		image, title, url, authors, members, releaseDate,
	} = props.publication;
	return (
		<Card sx={{
			display: 'flex',
			margin: '15px 0 0 0',
			height: '110px',
			boxShadow: `0 0 4px ${colors.card_shadow_color}`,
		}}
		>
			<div style={{ width: '110px' }}>
				{
					url
						? (
							<a className="link" href={url} target="_blank" rel="noreferrer">
								<CardMedia
									component="img"
									sx={{ width: 110, objectFit: 'cover' }}
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
					<Typography component="div" variant="subtitle1" style={{ fontSize: '16px' }}>
						{
							url
								? (
									<a className="link" href={url} target="_blank" rel="noreferrer">
										{title}
									</a>
								) : { title }
						}

					</Typography>
					{ releaseDate
					&& (
						<Typography variant="h7" color="text.secondary" component="div" style={{ fontSize: '12px' }}>
							{releaseDate}
						</Typography>
					)}
					{
						authors
						&& (
							<div>
								{members.map((item) => <a key={item} href={item.slug}>{item.name}</a>)}
							</div>
						)
					}
					{
						members
						&& (
							<div style={{ color: `${colors.gray_footer}`, fontSize: '12px' }}>
								{authors}
							</div>
						)
					}
				</CardContent>
			</Box>
		</Card>
	);
}

export {
	PresentationCard,
	PaperCard,
};
