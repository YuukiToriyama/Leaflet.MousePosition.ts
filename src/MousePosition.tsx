import L, {
    Map,
    LatLng,
    DomUtil,
    LeafletMouseEvent,
    ControlOptions,
} from 'leaflet';
import React from 'react';
import ReactDOM from 'react-dom';

import { MousePositionControl, MousePositionControlProps } from './Control';

const ControlBase: React.FunctionComponent<{ map: Map, control: React.FunctionComponent<MousePositionControlProps>, clickToCopy: boolean }> = (props) => {
	const [coords, setCoords] = React.useState(new LatLng(0, 0));
	props.map.on({
		mousemove: (event: LeafletMouseEvent) => {
			setCoords(event.latlng);
		},
		click: (event: LeafletMouseEvent) => {
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

export interface MousePositionProps extends ControlOptions {
	customComponent?: React.FunctionComponent<MousePositionControlProps>
	clickToCopy?: boolean
}

export class MousePosition extends L.Control {
	_div: HTMLElement | null;
	control: React.FunctionComponent<MousePositionControlProps>;
	clickToCopy: boolean
	constructor(options?: MousePositionProps) {
		super(options);
		this._div = null;
		this.control = options?.customComponent || MousePositionControl;
		this.clickToCopy = options?.clickToCopy || false;
	}

 onAdd = (map: Map) => {
		this._div = DomUtil.create("div", "custom-panel leaflet-bar");
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

(L as any).MousePosition = MousePosition;