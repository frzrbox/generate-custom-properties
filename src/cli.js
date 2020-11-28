import fs from 'fs';
import css from 'css';
import { parseArgs, renderTemplate, parseKeyValuePairs } from './util';

export function cli(args) {
	let options = parseArgs(args);
	const { input, output } = options;

	const configRawData = fs.readFileSync(input);
	const config = JSON.parse(configRawData);

	const outputFileExists = fs.existsSync(output);

	const configProps = Object.entries(config);

	let outputFileContents = '';

	configProps.map((prop) => {
		let values = [];
		let propName;

		// Add : prefix to root or turn into a class
		if (prop[0] === 'root') {
			propName = ':root';
		} else if (prop[0].includes(':')) {
			const splitProp = prop[0].split(':');
			propName = `[data-${splitProp[0]}="${splitProp[1]}"]`;
		} else {
			propName = '.' + prop[0];
		}

		parseKeyValuePairs(prop[1], null, values);

		outputFileContents += renderTemplate(propName, values.join(''));

		if (outputFileExists) {
			const file = fs.readFileSync(output, 'utf-8');
			const cssFile = css.parse(file);

			const propertyExists = cssFile.stylesheet.rules.filter((prop) => {
				if (prop.type === propName) {
					return prop;
				}
			});

			if (propertyExists.length === 0) {
				fs.writeFileSync(output, outputFileContents);
			} else {
				const propIndex = cssFile.stylesheet.rules.findIndex((prop) => {
					if (prop.type === 'rule') {
						return prop.selectors.toString() === propName;
					}
				});

				cssFile.stylesheet.rules.splice(propIndex, 1);

				fs.writeFileSync(output, outputFileContents);
			}
		} else {
			fs.writeFileSync(output, outputFileContents);
		}
	});
}
