import leaflet from 'leaflet';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import MousePositionBar from './Control';

export class MousePosition extends leaflet.Control {
	_div: HTMLElement | null;
	constructor(options?: leaflet.ControlOptions) {
		super(options);
		this._div = null;
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
			this._div.innerHTML = ReactDOMServer.renderToString(<MousePositionBar latlng={latlng} />);
		}
	}
}

declare let L: any;
L.MousePosition = MousePosition;