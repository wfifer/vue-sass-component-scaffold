#! /usr/bin/env node
const minimist = require('minimist')
const createComponent = require('./create-component')

try {
	if (!process.argv[2]) throw 'Please provide a component name, e.g. ComponentName or components/ComponentName'
	const argv = minimist(process.argv.slice(2))
	const filePath = process.argv.slice(2)[0].replace(/\/$/, '')
	createComponent(filePath, argv)
} catch (error) {
	console.error(error)
}
