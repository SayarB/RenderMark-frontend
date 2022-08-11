const removeImports = require('next-remove-imports')()
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer((phase, { defaultConfig }) => {
  return removeImports({
    ...defaultConfig
  })
})
