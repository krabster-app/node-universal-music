import { createStore } from '@sovok/shared/utils/create-store'
import { TrackInfo } from '@sovok/shared/models/search/track'

export const tracksCache = createStore<TrackInfo, 'id'>('tracksCache', 'id')
