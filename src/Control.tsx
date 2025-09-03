import React from 'react';
import { LatLng } from 'leaflet';

export interface MousePositionControlProps {
	latlng: LatLng
}

export const MousePositionControl: React.FunctionComponent<MousePositionControlProps> = (props) => {
	const latlng = props.latlng.wrap();
	return (
		<React.Fragment>
			<small>{latlng.lat} {latlng.lng}</small>
		</React.Fragment>
	)
}