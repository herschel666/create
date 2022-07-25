#!/usr/bin/env node
import { cp } from 'node:fs/promises'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { success, failure } from './console.mjs'

const args = process.argv.slice(2, process.argv.length)
const path = args[0]

;(async function main () {
  try {
    // ensure the path arg was passed
    if (!path) {
      throw Error('Missing path.')
    }

    const here = dirname(fileURLToPath(import.meta.url))
    const src = join(here, 'vendor')
    const dest = join(process.cwd(), path)

    if (existsSync(dest)) {
      throw Error('Path already exists.')
    }

    // copy the starter project to the given path
    await cp(src, dest, { recursive: true })

    success({ path, dest })
  }
  catch (e) {
    failure({ path, message: e.message })
    process.exit(1)
  }
})();
