import arg from 'arg';

export function parseArgs(cliArgs) {
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
