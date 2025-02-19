import {
  epilog,
  askUserToChooseANapDescriptorFromCauldron,
  tryCatchWrap,
} from '../lib'
import { start } from 'ern-orchestrator'
import _ from 'lodash'
import { PackagePath, AppVersionDescriptor } from 'ern-core'
import { Argv } from 'yargs'

export const command = 'start'
export const desc = 'Start a composite MiniApp'

export const builder = (argv: Argv) => {
  return argv
    .option('activityName', {
      alias: 'a',
      describe: 'Android Activity to launch',
      type: 'string',
    })
    .option('baseComposite', {
      describe: 'Base Composite',
      type: 'string',
    })
    .coerce('baseComposite', d => PackagePath.fromString(d))
    .option('bundleId', {
      alias: 'b',
      describe: 'iOS Bundle Identifier',
      type: 'string',
    })
    .option('descriptor', {
      alias: 'd',
      describe: 'Full native application selector',
      type: 'string',
    })
    .coerce('descriptor', d => AppVersionDescriptor.fromString(d))
    .option('extraJsDependencies', {
      alias: 'e',
      describe:
        'Additional JavaScript dependencies to add to the composite JavaScript bundle',
      type: 'array',
    })
    .coerce('extraJsDependencies', d => d.map(PackagePath.fromString))
    .option('jsApiImpls', {
      describe: 'A list of one or more JS API Implementation(s)',
      type: 'array',
    })
    .coerce('jsApiImpls', d => d.map(PackagePath.fromString))
    .option('flavor', {
      describe: 'Custom binary flavor',
    })
    .option('miniapps', {
      alias: 'm',
      describe: 'A list of one or more MiniApp(s)',
      type: 'array',
    })
    .coerce('miniapps', d => d.map(PackagePath.fromString))
    .option('packageName', {
      alias: 'p',
      describe: 'Android application package name',
      type: 'string',
    })
    .option('watchNodeModules', {
      alias: 'w',
      describe:
        'A list of one or more directory name from node_modules that should be watched for changes',
      type: 'array',
    })
    .option('disableBinaryStore', {
      describe:
        'Disable automatic retrieval of the binary from the Binary Store',
      type: 'boolean',
    })
    .option('host', {
      describe: 'Host/IP to use for the local packager',
      type: 'string',
    })
    .option('port', {
      default: '8081',
      describe: 'Port to use for the local package',
      type: 'string',
    })
    .group(['packageName', 'activityName'], 'Android binary specific options:')
    .group(['bundleId'], 'iOS binary specific options:')
    .group(['disableBinaryStore', 'flavor'], 'Binary store specific options:')
    .epilog(epilog(exports))
}

export const commandHandler = async ({
  activityName,
  baseComposite,
  bundleId,
  descriptor,
  extraJsDependencies = [],
  flavor,
  host,
  jsApiImpls,
  miniapps,
  packageName,
  port,
  watchNodeModules,
  disableBinaryStore,
}: {
  activityName?: string
  baseComposite?: PackagePath
  bundleId?: string
  descriptor?: AppVersionDescriptor
  extraJsDependencies?: PackagePath[]
  flavor?: string
  host?: string
  jsApiImpls?: PackagePath[]
  miniapps?: PackagePath[]
  packageName?: string
  port?: string
  watchNodeModules?: string[]
  disableBinaryStore?: boolean
} = {}) => {
  if (!miniapps && !descriptor) {
    descriptor = await askUserToChooseANapDescriptorFromCauldron()
  }

  await start({
    activityName,
    baseComposite,
    bundleId,
    descriptor,
    disableBinaryStore,
    extraJsDependencies,
    flavor,
    host,
    jsApiImpls,
    miniapps,
    packageName,
    port,
    watchNodeModules,
  })
}

export const handler = tryCatchWrap(commandHandler)
