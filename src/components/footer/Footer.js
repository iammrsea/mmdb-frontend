import React from 'react';

import { Container } from 'components';
import { GridRow, GridItem } from 'components/grid';

const Footer = () => {
	return (
		<footer className="page-footer indigo darken-4 white-text">
			<Container>
				<GridRow>
					<GridItem sm={4} smOffset={2} md={3} mdOffset={3}>
						<h5>About</h5>
						<ul className="white-text">
							<li>
								<a className="white-text" href="#!">
									Blog
								</a>
							</li>
						</ul>
					</GridItem>
					<GridItem sm={4} smOffset={2} md={3} mdOffset={3}>
						<h5>Contact</h5>
						<ul>
							<li>
								<a className="white-text" href="#!">
									Github
								</a>
							</li>
						</ul>
					</GridItem>
				</GridRow>

				<GridRow>
					<GridItem sm={12}>
						<div className="footer-copyright center-align">
							<Container>© {new Date().getFullYear()} mmdb.com</Container>
						</div>
					</GridItem>
				</GridRow>
			</Container>
		</footer>
	);
};

export default Footer;
