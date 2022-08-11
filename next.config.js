const removeImports = require('next-remove-imports')()
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = (phase, { defaultConfig }) => {
  return withBundleAnalyzer(
    removeImports({
      ...defaultConfig
    })
  )
}
