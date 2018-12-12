const utils = require('./utils')

const createComponent = (filePath, argv = {}) => {
  try {
    if (!filePath) throw 'Please provide a component name, e.g. ComponentName or components/ComponentName'
    const componentName = filePath.split('/').slice(-1)[0].split('.')[0]
    utils.writeToFile(componentName, filePath, 'index', 'vue', utils.template, argv.options ? utils.getOptionsByName(argv.options) : {})
    utils.writeToFile(componentName, filePath, componentName, 'scss', utils.scssTemplate)
  } catch (error) {
    console.error(error)
  }
}

module.exports = createComponent