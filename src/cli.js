const fs = require('fs');

function renderTemplate(values) {
	const template = `
    :root{
        ${values}
    }
    `;

	return template;
}

export function cli(args) {
	console.log(args);
	fs.writeFileSync('properties.css', renderTemplate('--color-red: red'));
}
