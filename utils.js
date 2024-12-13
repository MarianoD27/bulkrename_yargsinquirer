import * as path from 'path'
import { join } from 'path'
import * as fs from 'fs'
import { readdirSync, renameSync } from 'fs'
import { fileURLToPath } from 'url'

import { select, Separator, input } from '@inquirer/prompts'
import * as colors from "colors"


export async function BulkRename(pathName, argv) {
  // file name part we are looking for, and what we are making to change it to in the future.
  const method = await select({
    message: "Select one of the two methods",
    choices: [
      { name: 'At the START of the files', value: "sta", description: "Changes how to files start" },
      { name: 'At the END of the files', value: "end", description: "Changes how to files end" }
    ]
  })
  const current = await input({ message: "Value to replace" })
  const future = await input({ message: "New string" })


  console.log(`\nThe path is ${pathName}`.blue)
  const files = readdirSync(pathName)

  var times = 0

  if (method == 'end') {
    files
      .forEach(file => {
        if (file.endsWith(current)) {

          const filePath = join(pathName, file)
          const newFilePath = join(pathName, file.replace(current, future))
          renameSync(filePath, newFilePath)
          // console.log(newFilePath, file)
          console.log("File Renamed".green)
          times = times + 1
        }
        else if (fs.statSync(pathName + file).isDirectory()) {
          var folder1 = readdirSync(pathName + file);
          folder1.forEach(file1 => {
            if (file1.endsWith(current)) {
              const filePath = join(pathName + file, file1)
              const newFilePath = join(pathName + file, file1.replace(current, future))
              renameSync(filePath, newFilePath)
              // console.log(newFilePath, file1)
              console.log("File renamed inside a folder".green)
              times = times + 1
            }
          })
        }
      })
  }
  if (method == 'sta') {
    files
      .forEach(file => {
        if (file.startsWith(current)) {

          const newFilePath = join(pathName, file.replace(current, future))
          const filePath = join(pathName, file)
          renameSync(filePath, newFilePath)
          // console.log(newFilePath, file)
          console.log("File Renamed".green)
          times = times + 1
        }

        else if (fs.statSync(pathName + file).isDirectory()) {
          var folder1 = readdirSync(pathName + file);
          folder1.forEach(file1 => {
            if (file1.startsWith(current)) {
              const filePath = join(pathName + file, file1)
              const newFilePath = join(pathName + file, file1.replace(current, future))
              renameSync(filePath, newFilePath)
              // console.log(newFilePath, file1)
              console.log("File renamed inside a folder".green)
              times = times + 1
            }
          })
        }
      })
  }
  console.log(`\nFiles Changed: ${times}\n`.yellow)

}