const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec

String.prototype.toKebab = function () {
	return Array.prototype.map.call(this, (ch, index) => {
		return index === 0
			? ch.toLowerCase()
			: /[A-Z]/.test(ch)
				? `-${ch.toLowerCase()}`
				: ch
	}).join('')
}

function getOptionsByName (options) {
	const opts = options.split(',')
	let allOptions = ''
	for (let o in opts) {
		let apiMethod = api[opts[o]] 
		if (apiMethod !== undefined) {
			allOptions = allOptions.concat(apiMethod + ',\n\n') 
		} 
	}

	return allOptions.substring(0, allOptions.length - 3) // remove hanging comma
}

function ensureDirectoryExistence(filePath) {
	var dirname = path.dirname(filePath)
	if (fs.existsSync(dirname)) {
		return true
	}
	ensureDirectoryExistence(dirname)
	fs.mkdirSync(dirname)
}

const template = (name) => {
	const t = 
`<template>
	<div class="${name.toKebab()}">
	</div>
</template>

<script>
	export default {
		name: '${name}'
	};
</script>

<style scoped lang="scss">
	@import './${name}.scss';
</style>`

	return t
}

const scssTemplate = (name) => {
	const t =
`.${name.toKebab()} {
}`

	return t
}

const writeToFile = (componentName, filePath, fileName, ext, templateFn, options = null) => {
	let fullPath = `${ filePath }/${ fileName }.${ ext }`

	ensureDirectoryExistence(fullPath)

	const child = exec('touch ' + filePath, (err, stdout, stderr) => {
		if (err) {
			console.log(err)
		}

		fs.writeFile(fullPath, templateFn(componentName, options), (err) => {
			if (err) console.log(err)
		}) 
	})
}

exports.scssTemplate = scssTemplate
exports.template = template
exports.writeToFile = writeToFile