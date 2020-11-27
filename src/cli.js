import fs from 'fs';
import css from 'css';
import parseArgs from './parseArgs';
import renderTemplate from './renderTemplate';
import parseKeyValuePairs from './parseKeyValuePairs';

export function cli(args) {
	let options = parseArgs(args);
	const { input, output } = options;

	const configRawData = fs.readFileSync(input);
	const config = JSON.parse(configRawData);

	if (fs.existsSync(output)) {
		const file = fs.readFileSync(output, 'utf-8');
		const cssFile = css.parse(file);

		const configProps = Object.entries(config);

		configProps.map((prop) => {
			let values = [];
			let propName;

			if (prop[0] === 'root') {
				propName = ':root';
			} else {
				propName = '.' + prop[0];
			}

			parseKeyValuePairs(prop[1], null, values);

			const cssProp = renderTemplate(propName, values.join(''));

			const propertyExists = cssFile.stylesheet.rules.filter((prop) => {
				if (prop.type === propName) {
					return prop;
				}
			});

			if (propertyExists.length === 0) {
				fs.writeFileSync(output, cssProp);
			} else {
				const propIndex = cssFile.stylesheet.rules.findIndex((prop) => {
					if (prop.type === 'rule') {
						return prop.selectors.toString() === propName;
					}
				});

				cssFile.stylesheet.rules.splice(propIndex, 1);

				fs.writeFileSync(output, cssProp);
			}
		});
	} else {
		// Write the :root property
		// fs.writeFileSync(output, rootProperty);
	}
}
