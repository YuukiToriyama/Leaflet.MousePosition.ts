import leaflet from 'leaflet';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { MousePositionControl, MousePositionControlProps } from './Control';

export interface MousePositionProps extends leaflet.ControlOptions {
	customComponent?: React.FunctionComponent<MousePositionControlProps>
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
		return this._div;
	}
	onRemove = () => {
		console.log("Bye");
	}
	update = (latlng: leaflet.LatLng) => {
		if (this._div !== null) {
			this._div.innerHTML = ReactDOMServer.renderToString(React.createElement(this.control, { latlng: latlng }));
		}
	}
}

declare let L: any;
L.MousePosition = MousePosition;