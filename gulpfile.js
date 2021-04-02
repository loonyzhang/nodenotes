const { watch } = require('gulp')
const esbuild = require('esbuild')
const glob = require('glob')

async function buildTs () {
  const tsFiles = glob.sync('./src/**/*.ts')
  return esbuild.build({
    entryPoints: tsFiles,
    platform: 'node',
    target: 'node12',
    format: 'cjs',
    outdir: './dist',
    logLevel: 'info',
    charset: 'utf8'
  })
}

exports.default = function () {
  watch('./src/**/*.ts', buildTs)
}
exports.build = buildTs
