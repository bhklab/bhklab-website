import React, { useEffect, useState, useMemo } from 'react';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
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
import { CustomMarker, Container } from './StyledCollaboration';

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

function CollaborationMapBubble() {
	return (
		<Container>
			<MapChart />
		</Container>
	);
}

export default CollaborationMapBubble;
