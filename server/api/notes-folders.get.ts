import { readdir } from 'node:fs/promises'
import { join, relative } from 'node:path'

async function collectFolders(root: string, current: string, out: string[]) {
  const entries = await readdir(current, { withFileTypes: true })

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    if (entry.name.startsWith('.')) continue
    const abs = join(current, entry.name)
    const rel = relative(root, abs).replace(/\\/g, '/')
    out.push(`notes/${rel}`)
    await collectFolders(root, abs, out)
  }
}

export default defineEventHandler(async () => {
  const notesRoot = join(process.cwd(), 'content', 'notes')
  const folders: string[] = ['notes']

  try {
    await collectFolders(notesRoot, notesRoot, folders)
    return folders.sort((a, b) => a.localeCompare(b))
  } catch {
    return folders
  }
})
