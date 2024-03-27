import * as fs from 'fs'
import { execSync } from 'child_process'
import * as path from 'path'
import { EXAMPLES_PATH } from '../constants/PathsDefinitions'

const examplesPath = path.posix.normalize(EXAMPLES_PATH)

function getAllExamples(): string[] {
  return fs.readdirSync(examplesPath)
}
export function runCommandInEachExampleProj(cmd: string) {
  let error = false
  const packages = getAllExamples()
  for (const lib of packages) {
    try {
      const pathLib = path.posix.join(examplesPath, lib)
      execSync(`${cmd}`, { cwd: pathLib, stdio: 'inherit' })
    } catch {
      error = true
    }
  }
  if (error) {
    console.error('\nPlease, check the errors above before committing/pushing!\n')
    process.exitCode = 1
  }
}

export function removeLibsCash() {
  let error = false
  const packages = getAllExamples()
  for (const lib of packages) {
    try {
      console.log(`Cleaning libs cash from ${lib}\n`)
      const pathLib = path.posix.join(examplesPath, lib)
      const nodeModules = path.posix.join(pathLib, 'node_modules')
      const packageManagerLock = path.posix.join(pathLib, 'pnpm-lock.yaml')
      if (fs.existsSync(nodeModules)) fs.rmSync(nodeModules, { recursive: true })
      if (fs.existsSync(packageManagerLock)) fs.rmSync(packageManagerLock)
    } catch {
      error = true
    }
  }
  if (error) {
    console.error('\nPlease, check the errors above before committing/pushing!\n')
    process.exitCode = 1
  }
}
