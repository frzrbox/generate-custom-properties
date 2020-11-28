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
	});

	if (outputFileExists) {
		const file = fs.readFileSync(output, 'utf-8');
		const cssFile = css.parse(file);
		const updatedDesignTokens = css.parse(outputFileContents);

		// Only update rules in the configuration file
		// all other declarations in the css file will be ignored
		const updatedRules = Object.assign(
			cssFile.stylesheet.rules,
			updatedDesignTokens.stylesheet.rules
		);

		cssFile.stylesheet.rules = updatedRules;

		fs.writeFileSync(output, css.stringify(cssFile));
	} else {
		fs.writeFileSync(output, outputFileContents);
	}
}
