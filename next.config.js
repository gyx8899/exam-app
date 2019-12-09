/* eslint-disable */
const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => {}
}

// Where your antd-custom.less file lives
const siteVariables = lessToJS(
		fs.readFileSync(path.resolve(__dirname, './site/styles/antd-custom.less'), 'utf8')
)
const appVariables = lessToJS(
		fs.readFileSync(path.resolve(__dirname, './app/styles/antd-custom.less'), 'utf8')
)
const themeVariables = {
	...appVariables,
	...siteVariables
}

module.exports = withLess({
	lessLoaderOptions: {
		javascriptEnabled: true,
		modifyVars: themeVariables, // make your antd custom effective
	},
	webpack: (config, {isServer}) => {
		if (isServer) {
			const antStyles = /antd\/.*?\/style.*?/
			const origExternals = [...config.externals]
			config.externals = [
				(context, request, callback) => {
					if (request.match(antStyles)) return callback()
					if (typeof origExternals[0] === 'function') {
						origExternals[0](context, request, callback)
					} else {
						callback()
					}
				},
				...(typeof origExternals[0] === 'function' ? [] : origExternals),
			]

			config.module.rules.unshift({
				test: antStyles,
				use: 'null-loader',
			})
		}
		return config
	},
})