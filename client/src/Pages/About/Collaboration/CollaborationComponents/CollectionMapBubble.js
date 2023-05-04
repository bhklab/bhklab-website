import React, { useEffect, useState, useMemo } from 'react';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import styled from 'styled-components';
import {
	ComposableMap,
	Geographies,
	Geography,
	Marker,
} from 'react-simple-maps';
import { csv } from 'd3-fetch';
import { scaleLog } from 'd3-scale';
import sortBy from 'lodash/sortBy';
import colors from '../../../../styles/colors';

function CustomMarker({ size, color }) {
	return (
		<svg
			viewBox="0 0 24 24"
			width={size}
			height={size}
			style={{
				fill: color,
				stroke: '#FFF',
				strokeWidth: 1,
				transform: 'translate(-30px, -30px)',
			}}
		>
			<path d="M12 2c-4.41 0-8 3.59-8 8 0 3.86 6.75 13.12 7.41 14.35.19.25.47.39.76.39s.57-.14.76-.39C13.25 23.12 20 13.86 20 10c0-4.41-3.59-8-8-8zm0 11.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
		</svg>
	);
}

const geoUrl =	'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

function MapChart() {
	const [data, setData] = useState([]);
	const [ready, setReady] = useState(false);
	const [maxValue, setMaxValue] = useState(0);
	useEffect(() => {
		const initialize = () => {
			csv('/data.csv').then((countries) => {
				const sortedCountries = sortBy(countries, (o) => -o.collaboration);
				setMaxValue(sortedCountries[0].collaboration);
				setData(sortedCountries);
				setReady(true);
			});
		};
		initialize();
	}, []);

	const popScale = useMemo(
		() => scaleLog().domain([1, maxValue]).range([6, 28]),
		[maxValue],
	);

	return (
		ready
		&& (
			<ComposableMap projectionConfig={{ rotate: [-10, 0, 0] }}>
				<Geographies geography={geoUrl}>
					{({ geographies }) => geographies.map((geo) => (
						<Geography key={geo.rsmKey} geography={geo} fill={colors.map_gray_land} />
					))}
				</Geographies>
				{
					data.map(({
						country, lat, lng, collaboration,
					}) => (

						(country !== 'Toronto')
							? (
								<Marker key={country} coordinates={[lng, lat]}>
									<circle fill={colors.map_marker} stroke="#FFF" strokeWidth={1.5} r={popScale(collaboration)} />
								</Marker>
							) : (
								<Marker key="landmark" coordinates={[lng - 10, 55]}>
									<CustomMarker size={25} color={colors.map_location} />
								</Marker>
							)
					))
				}
			</ComposableMap>
		)
	);
}

const Container = styled.div`
  body {
	margin: 0;
  }

  svg {
	display: inline-block;
	vertical-align: middle;
  }

  path {
	fill: ${colors.map_lands};
  }
`;

function CollaborationMapBubble() {
	return (
		<Container>
			<MapChart />
		</Container>
	);
}

export default CollaborationMapBubble;
