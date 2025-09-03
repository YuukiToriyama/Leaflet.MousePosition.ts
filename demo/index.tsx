import React from 'react';
import ReactDOM from 'react-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MousePosition, MousePositionControlProps } from '../src';
import Header from './Header';

const config = {
	basemap: {
		name: "OpenStreetMap's Standard tile layer",
		tile: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
		credit: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	},
	center: {
		lng: 135.7484472,
		lat: 35.039672
	},
	zoom: 13,
	mapStyle: {
		width: "100%",
		height: "90vh"
	}
}
const customControl: React.FunctionComponent<MousePositionControlProps> = (props) => {
	const tableStyle: React.CSSProperties = {
		fontSize: "large",
		background: "rgba(255,255,255,0.5)"
	}
	return (
		<table style={tableStyle}>
			<tr>
				<td>Latitude</td>
				<td>{props.latlng.lat}</td>
			</tr>
			<tr>
				<td>Longitude</td>
				<td>{props.latlng.lng}</td>
			</tr>
		</table>
	);
};
const App: React.FunctionComponent = () => {
	const mapRef = React.useRef<HTMLDivElement>(null);
	let map: L.Map;
	let mousePositionControl: MousePosition;
	React.useEffect(() => {
		map = L.map(mapRef.current!, {
			center: config.center,
			zoom: config.zoom
		});
		L.tileLayer(config.basemap.tile, {
			attribution: config.basemap.credit,
			id: config.basemap.name,
			detectRetina: true
		}).addTo(map);
		mousePositionControl = new MousePosition({
			position: "bottomright",
			customComponent: customControl,
			clickToCopy: true
		}).addTo(map);
	}, []);
	return (
		<React.Fragment>
			<Header />
			<main>
				<div ref={mapRef} style={config.mapStyle}></div>
			</main>
			<footer></footer>
		</React.Fragment>
	)
}

ReactDOM.render(<App />, document.querySelector('body'));