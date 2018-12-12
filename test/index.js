'use strict'

const chai = require('chai')
chai.use(require('chai-fs'))
const { assert, expect } = chai
const fs = require('fs-extra')
const utils = require('../utils')
const createComponent = require('../create-component')

const tempDir = `tmp${[...Array(10)].map(i=>(~~(Math.random()*36)).toString(36)).join('')}`
let componentName = 'ComponentName'
let componentPath = `${ tempDir }/${ componentName }`

describe('Scaffold', function () {
  before(function() {
	createComponent(componentPath)
  })

  after(function() {
    fs.removeSync(tempDir)
  })

  it('should create a directory with the component name', function () {
    assert.isDirectory(componentPath)
  })

  it('should create a vue file called index.js', function () {
  	assert.isFile(`${ componentPath }/index.vue`)
  })

  it('should create a style file with component name', function () {
  	assert.isFile(`${ componentPath }/${ componentName }.scss`)
  })
})

describe('Vue template', function () {
  it('should have a containing element with correct class name', function () {
  	let vue = utils.template(componentName)
    expect(vue).to.have.string('class="component-name"')
  })
})

describe('Style template', function () {
  it('should contain a kebab-case class name', function () {
  	let scss = utils.scssTemplate(componentName)
    expect(scss).to.have.string('.component-name')
  })
})