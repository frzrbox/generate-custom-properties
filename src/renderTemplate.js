export default function renderTemplate(property, values) {
	// Don't change this it keeps the format of the code
	const template = `${property}{
${values}}

`;

	return template;
}
