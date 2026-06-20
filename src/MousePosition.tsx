import { Control, Map, LatLng, DomUtil, LeafletEvent, LeafletMouseEvent, ControlOptions, version } from 'leaflet';
import React from 'react';
import ReactDOM from 'react-dom';

import { MousePositionControl, MousePositionControlProps } from './Control';

const ControlBase: React.FunctionComponent<{ map: Map, control: React.FunctionComponent<MousePositionControlProps>, clickToCopy: boolean }> = (props) => {
	const [coords, setCoords] = React.useState(new LatLng(0, 0));
	React.useEffect(() => {
		const moveEvent = version.startsWith('1.') ? 'mousemove' : 'pointermove';
		const onMouseMove = (event: LeafletEvent) => {
			setCoords((event as LeafletMouseEvent).latlng);
		};
		const onClick = (event: LeafletEvent) => {
			const { latlng } = event as LeafletMouseEvent;
			setCoords(latlng);
			props.clickToCopy && navigator.clipboard.writeText(latlng.toString()).then(() => {
				console.log("Copied to Clipboard");
			});
		};
		props.map.on(moveEvent, onMouseMove);
		props.map.on('click', onClick);
		return () => {
			props.map.off(moveEvent, onMouseMove);
			props.map.off('click', onClick);
		};
	}, [props.map, props.clickToCopy]);
	return (
		<props.control latlng={coords} />
	)
}

export interface MousePositionProps extends ControlOptions {
	customComponent?: React.FunctionComponent<MousePositionControlProps>
	clickToCopy?: boolean
}

export class MousePosition extends Control {
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
		if (this._div) {
			ReactDOM.unmountComponentAtNode(this._div);
			this._div = null;
		}
	}
}
