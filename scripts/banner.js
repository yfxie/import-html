const prependFile = require('prepend-file');
const pkg = require(`${process.cwd()}/package.json`);

const { name, version, homepage, license, author } = pkg;
const template = `/*!
* 
*   ${name} v${version}
*   ${homepage}
* 
*   (c) ${new Date().getFullYear()} ${author}
*   Licensed under the ${license} license
* 
*/`;

prependFile.sync(`${process.cwd()}/import-html.min.js`, template);
process.exit(0);