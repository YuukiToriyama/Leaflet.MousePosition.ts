import React from 'react';
import leaflet from 'leaflet';

const MousePositionBar: React.FunctionComponent<{ latlng: leaflet.LatLng }> = (props) => {
	const latlng = props.latlng.wrap();
	return (
		<React.Fragment>
			<small>{latlng.lat} {latlng.lng}</small>
		</React.Fragment>
	)
}
export default MousePositionBar;