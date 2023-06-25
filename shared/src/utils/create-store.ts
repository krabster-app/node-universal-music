import { getBoundStorage } from './use-table/use-table'

const TABLE_STORAGE = {}

export const createStore = getBoundStorage(TABLE_STORAGE)
