# Leaflet.MousePosition.ts

[![npm version](https://badge.fury.io/js/leaflet.mouseposition.ts.svg)](https://badge.fury.io/js/leaflet.mouseposition.ts)
[![Leaflet 1.x](https://img.shields.io/badge/Leaflet-1.x-green)](https://leafletjs.com)
[![Leaflet 2.0](https://img.shields.io/badge/Leaflet-2.0--alpha-blue)](https://leafletjs.com)

Customizable coordinate viewer written in TypeScript

## Abstract

With this plugin you can easily display the latitude/longitude where your mouse pointer is.  
Because written in TypeScript, this plugin goes well modern projects such as React Vue and etc.
Not only TS users, but also for JS users `.d.ts` file will make you happy to write codes.

## Usage

### Installation

#### With npm

Compiled codes are available on [npmjs.com](https://www.npmjs.com/package/leaflet.mouseposition.ts)

```bash
npm i leaflet.mouseposition.ts
```

#### From CDN

Demo page is [here](https://yuukitoriyama.github.io/leaflet-plugins/Leaflet.MousePosition.ts/)!

```html
<html>
	<head>
		<!-- please load leaflet.js and leaflet.css -->
		<link
			rel="stylesheet"
			href="https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.min.css"
		/>
		<script src="https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.min.js"></script>
		<!-- after loading leaflet.js please load this library -->
		<script src="https://unpkg.com/leaflet.mouseposition.ts/dist/bundle.js"></script>
	</head>
	<body>
		<div id="myMap"></div>
	</body>
</html>
```

> **Note for CDN users**: As of v0.2.0, `L.MousePosition` global registration has been removed (see [Breaking Changes](#breaking-changes)). Please use the npm package instead.

### Basic Use

First, please import a class `MousePosition`, then create an instance of this with giving some options.
Adding it to the map, you can see new panel on your leaflet.

#### Leaflet 2.0 (recommended)

```typescript
import { Map as LeafletMap, TileLayer } from "leaflet";
import { MousePosition } from "leaflet.mouseposition.ts";

const map = new LeafletMap("myMap", { center: [35.0, 135.7], zoom: 13 });
new TileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

const mousePosition = new MousePosition({ position: "topright" });
mousePosition.addTo(map);
```

#### Leaflet 1.x

```typescript
import L from "leaflet";
import { MousePosition } from "leaflet.mouseposition.ts";

const map = L.map("myMap", { center: [35.0, 135.7], zoom: 13 });
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

const mousePosition = new MousePosition({ position: "topright" });
mousePosition.addTo(map);
```

### Options

```typescript
{
	position: 'topleft' | 'topright' | 'bottomleft' | 'bottomright',
	customComponent?: React.FunctionComponent<MousePositionControlProps>,
	clickToCopy?: boolean
}
```

- position
  - You can choose which corner you want to display.
- customComponent(optional)
  - You can custmize how this plugin looks by writting a React component.
  - For more details, look at [`demo/index.tsx`](./demo/index.tsx) .
- clickToCopy(optional)
  - 🚧Experimental🚧
  - If `clickToCopy` is `true`, when user click somewhere on the map, the coordinate information will be copied to the user's clipboard.
  - Default value is `false`.

## Customization

You can customize appearance of plugin by writting JSX.

![custom element](https://i.imgur.com/cUrHwwC.png)

```typescript
import React from "react";
import {
	MousePosition,
	MousePositionControlProps,
} from "leaflet.mouseposition.ts";

const customComponent: React.FunctionComponent<MousePositionControlProps> = (
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
	customComponent: customComponent,
});
mousePosition.addTo(map);
```

## Breaking Changes

### v0.2.0

- **`L.MousePosition` global registration removed**: The plugin no longer registers itself on the global `L` object. If you were using `new L.MousePosition()`, please migrate to the named import pattern shown above.

## Demo

Demo page is [here](https://yuukitoriyama.github.io/Leaflet.MousePosition.ts).

```typescript
npm run build:demo
// then, assets are to be built on ./public
```

## Author

ToriChan(YUUKIToriyama)
