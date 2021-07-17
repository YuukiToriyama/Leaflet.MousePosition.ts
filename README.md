# Leaflet.MousePosition.ts

This repo intends to be a modern replacement of [Leaflet.MousePosition](https://github.com/ardhi/Leaflet.MousePosition) plugin

## Usage

```bash
npm i leaflet.mouseposition.ts
```

```typescript
import { MousePosition } from "leaflet.mouseposition.ts";

const mousePosition = newMousePosition({
	position: "topright",
});
mousePosition.addTo(map);
```

## Customize

You can customize appearance of plugin by writting JSX.

![custom element](https://i.imgur.com/cUrHwwC.png)

```typescript
import React from "react";
import {
	MousePosition,
	MousePositionControlProps,
} from "leaflet.mouseposition.ts";

const customElement: React.FunctionComponent<MousePositionControlProps> = (
	props
) => {
	return (
		<table>
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

const mousePosition = new MousePosition({
	position: "topright",
	customElement: customElement,
});
mousePosition.addTo(map);
```

## Demo

Demo page is [here](https://yuukitoriyama.github.io/Leaflet.MousePosition.ts).

```typescript
npm run build:demo
// then, assets are to be built on ./public
```
