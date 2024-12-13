#!/usr/bin/env node

import * as path from 'path'
import { join } from 'path'
import * as fs from 'fs'
import { readdirSync, renameSync } from 'fs'
import { fileURLToPath } from 'url'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { BulkRename } from './utils.js'


// const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
// const __dirname = path.dirname(__filename)// get the name of the directory

const __dirname = path.resolve();
// console.log(__dirname)
const pathName = __dirname + "/"


const argv = yargs(hideBin(process.argv))
  .scriptName('bulkrn')
  .help()
  .alias('h', 'help')
  .showHelpOnFail(true)
  .demandCommand().recommendCommands().strict()
  .command({
    command: "rn",
    describe: "Renames files using their start or end, useful for changing extensions",
    builder: {
      p: {
        describe: "path",
        demandOption: false,
        type: "string"
      }
    },
    handler: function (argv) {
      BulkRename(pathName, argv)
    }
  })
  .argv


