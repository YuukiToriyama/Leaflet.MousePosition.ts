import leaflet from 'leaflet';
import React from 'react';
import ReactDOM from 'react-dom';

import { MousePositionControl, MousePositionControlProps } from './Control';

const ControlBase: React.FunctionComponent<{ map: leaflet.Map, control: React.FunctionComponent<MousePositionControlProps>, clickToCopy: boolean }> = (props) => {
	const [coords, setCoords] = React.useState(new leaflet.LatLng(0, 0));
	props.map.on({
		mousemove: (event) => {
			setCoords(event.latlng);
		},
		click: (event) => {
			setCoords(event.latlng);
			props.clickToCopy && navigator.clipboard.writeText(event.latlng.toString()).then(() => {
				console.log("Copied to Clipboard");
			});
		}
	});
	return (
		<props.control latlng={coords} />
	)
}

export interface MousePositionProps extends leaflet.ControlOptions {
	customComponent?: React.FunctionComponent<MousePositionControlProps>
	clickToCopy?: boolean
}

export class MousePosition extends leaflet.Control {
	_div: HTMLElement | null;
	control: React.FunctionComponent<MousePositionControlProps>;
	clickToCopy: boolean
	constructor(options?: MousePositionProps) {
		super(options);
		this._div = null;
		this.control = options?.customComponent || MousePositionControl;
		this.clickToCopy = options?.clickToCopy || false;
	}

	onAdd = (map: leaflet.Map) => {
		this._div = leaflet.DomUtil.create("div", "custom-panel leaflet-bar");
		ReactDOM.render(
			<ControlBase map={map} control={this.control} clickToCopy={this.clickToCopy} />,
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