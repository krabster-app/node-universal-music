import { rm } from 'fs/promises'

export const cleanup = async (filePath: string) => {
  await rm(filePath, { force: true })
}
