const writtenCssFiles: string[] = [];

function writeStylesheet(regex: RegExp) {
	const cssNames: string[] = window[ "webpackCssFiles" ];

	cssNames.filter(name => {
		if (regex.exec(name) && writtenCssFiles.indexOf(name) < 0) {
			writtenCssFiles.push(name);
			document.write(`<link rel='stylesheet' type="text/css" href='${name}'>`);
		}
	});
}

const styles = require("../breakdown/static/scss/theme-default.scss");
writeStylesheet(/^theme-default.*.css/);
