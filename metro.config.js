const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

// Find the project and workspace directories
const projectRoot = __dirname

const config = getDefaultConfig(projectRoot)

config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules')]
config.transformer.unstable_allowRequireContext = true
module.exports = config
