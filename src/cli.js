import arg from 'arg';
import fs from 'fs';
import css from 'css';

function parseArgs(cliArgs) {
	const args = arg({
		'--in': String,
		'--out': String,
		'--type': String,
	});

	return {
		input: args['--in'] || 'properties.config.json',
		output: args['--out'] || 'properties.css',
		type: args['--type'] || 'JSON',
	};
}

function renderTemplate(values) {
	// Don't change this it keeps the format of the code
	const template = `:root{
${values}}`;

	return template;
}

function parseKeyValuePairs(obj, prevKey = null, value) {
	const allKeys = Object.keys(obj);

	allKeys.map((key) => {
		let propString = key;

		if (prevKey) {
			propString = prevKey + `--${key}`;
		}

		// Return css key:value if last nested level
		if (typeof obj[key] !== 'object') {
			value.push(`\--${propString}: ${obj[key]};\n`);

			return value;
		}

		// Invoke to handle nested objects
		parseKeyValuePairs(obj[key], propString, value);
	});
}

export function cli(args) {
	let options = parseArgs(args);
	const { input, output, type } = options;

	const configRawData = fs.readFileSync(input);
	const config = JSON.parse(configRawData);

	let propertyValues = [];

	// Add config properties to the property values
	parseKeyValuePairs(config.properties, null, propertyValues);
	const propertyStrings = propertyValues.join('');

	if (fs.existsSync(output)) {
		const file = fs.readFileSync(output, 'utf-8');
		const cssFile = css.parse(file);

		const rootProperty = cssFile.stylesheet.rules.filter((prop) => {
			if (prop.type === 'rule') {
				return prop.selectors.toString() === ':root';
			}
		});

		if (rootProperty.length === 0) {
			// fs.writeFileSync(css.stringify(cssFile));
			console.log('no root');
		}
	} else {
		fs.writeFileSync(output, renderTemplate(propertyStrings));
	}
}
