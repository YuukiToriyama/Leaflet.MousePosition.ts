# Leaflet.MousePosition.ts

Customizable coordinate viewer written in TypeScript

## Abstract

With this plugin you can easily display the latitude/longitude where your mouse pointer is.  
Because written in TypeScript, this plugin goes well modern projects such as React Vue and etc.
Not only TS users, but also for JS users `.d.ts` file will make you happy to write codes.

## Usage

### Installation

Compiled codes are available on [npmjs.com](https://www.npmjs.com/package/leaflet.mouseposition.ts)

```bash
npm i leaflet.mouseposition.ts
```

### Basic Use

First, please import a class `MousePosition`, then create an instance of this with giving some options.
Adding it to the map, you can see new panel on your leaflet.

```typescript
import { MousePosition } from "leaflet.mouseposition.ts";

const mousePosition = new MousePosition({
	position: "topright",
});
mousePosition.addTo(map);
```

### Options

```typescript
{
	position: 'topleft' | 'topright' | 'bottomleft' | 'bottomright',
	customElement?: React.FunctionComponent<MousePositionControlProps>,
	clickToCopy?: boolean
}
```

- position
  - You can choose which corner you want to display.
- customElement(optional)
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

## Author

ToriChan(YUUKIToriyama)
