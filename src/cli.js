import arg from 'arg';
import fs from 'fs';
import { type } from 'os';

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
	const template = `
    :root{
        ${values}
    }
    `;

	return template;
}

function parseKeyValuePairs(object, prevKey = null) {
	const allKeys = Object.keys(object);

	function convertToCustomProperty(obj, keys) {
		const allValues = [];
		keys.map((key) => {
			let propString = key;

			if (prevKey) {
				propString = prevKey + `-${key}`;
			}

			// Return css key:value if last nested level
			if (typeof obj[key] !== 'object') {
				console.log(`--${propString}: ${obj[key]};`);
				return `--${propString}: ${obj[key]};`;
			}

			// Invoke to handle nested objects
			parseKeyValuePairs(obj[key], propString);
		});
	}

	const values = convertToCustomProperty(object, allKeys);

	console.log(values);
}

export function cli(args) {
	let options = parseArgs(args);
	const { input, output, type } = options;

	const configRawData = fs.readFileSync(input);
	const config = JSON.parse(configRawData);

	parseKeyValuePairs(config.properties);

	fs.writeFileSync(output, renderTemplate('--color-red: red'));
}
