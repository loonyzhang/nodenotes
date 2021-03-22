const { watch } = require('gulp')
const esbuild = require('esbuild')
const glob = require('glob')

async function buildTs () {
  const tsFiles = glob.sync('./src/**/*.ts')
  return esbuild.build({
    entryPoints: tsFiles,
    platform: 'node',
    format: 'cjs',
    outdir: './dist',
    logLevel: 'info'
  })
}

exports.default = function () {
  watch('./src/**/*.ts', buildTs)
}
