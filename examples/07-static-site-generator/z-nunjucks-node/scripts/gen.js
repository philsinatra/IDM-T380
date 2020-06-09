const fs = require('fs');
const mkdirp = require('mkdirp');
const nunjucks = require('nunjucks');
const path = require('path');

const json = '../data/data.json';
const pages = '../build/pages';
const templates = '../src/templates';

const data = path.resolve(__dirname, json);
const pagePath = path.resolve(__dirname, pages);
const templatePath = path.resolve(__dirname, templates);

const obj = JSON.parse(fs.readFileSync(data, 'utf8'));
const env = new nunjucks.Environment(
	new nunjucks.FileSystemLoader(templatePath)
);

const RenderPage = (info) => {
	const str = fs.readFileSync(`${templatePath}/${info.S_template}.njk`, 'utf8');
	const res = env.renderString(str, info);
	mkdirp.sync(pagePath);
	fs.writeFileSync(`${pagePath}/${info.S_id}.html`, res, 'utf8');
};

const Process = () => {
	obj.screens.forEach(element => {
		// console.group('Screen Info:');
		// console.log(`S_id: ${element.S_id}`);
		// console.log(`S_template: ${element.S_template}`);
		// console.log(`S_Title_t: ${element.S_Title_t}`);
		// console.groupEnd();

		RenderPage(element);
	});
};

Process();