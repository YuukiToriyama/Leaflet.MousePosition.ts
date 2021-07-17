import leaflet from 'leaflet';
import React from 'react';
import ReactDOM from 'react-dom';

import { MousePositionControl, MousePositionControlProps } from './Control';

export interface MousePositionProps extends leaflet.ControlOptions {
	customComponent?: React.FunctionComponent<MousePositionControlProps>
}

const ControlBase: React.FunctionComponent<{ map: leaflet.Map, control: React.FunctionComponent<MousePositionControlProps> }> = (props) => {
	const [coords, setCoords] = React.useState(new leaflet.LatLng(0, 0));
	props.map.on({
		mousemove: (event) => {
			setCoords(event.latlng);
		}
	});
	return (
		<props.control latlng={coords} />
	)
}

export class MousePosition extends leaflet.Control {
	_div: HTMLElement | null;
	control: React.FunctionComponent<MousePositionControlProps>;
	constructor(options?: MousePositionProps) {
		super(options);
		this._div = null;
		this.control = options?.customComponent || MousePositionControl;
	}

	onAdd = (map: leaflet.Map) => {
		this._div = leaflet.DomUtil.create("div", "custom-panel leaflet-bar");
		ReactDOM.render(
			<ControlBase map={map} control={this.control} />,
			this._div
		)
		return this._div;
	}
	onRemove = () => {
		console.log("Bye");
	}
}

declare let L: any;
L.MousePosition = MousePosition;