import React from 'react';
import GitHubButton from 'react-github-btn';

const Header: React.FunctionComponent = () => {
	return (
		<header>
			<h1>Demo | Leaflet.MousePosition.ts</h1>
			<p>Yet Another Leaflet.js Plugin for displaying Coordinates.</p>
			<GitHubButton
				href="https://github.com/YUUKIToriyama"
				data-size="large"
				data-show-count="true"
				aria-label="Follow @YUUKIToriyama on GitHub"
			>Follow @YUUKIToriyama</GitHubButton>
			<GitHubButton
				href="https://github.com/YUUKIToriyama/Leaflet.MousePosition.ts"
				data-icon="octicon-star"
				data-size="large"
				data-show-count="true"
				aria-label="Star YUUKIToriyama/Leaflet.MousePosition.ts on GitHub"
			>Star</GitHubButton>
		</header>
	)
}
export default Header;