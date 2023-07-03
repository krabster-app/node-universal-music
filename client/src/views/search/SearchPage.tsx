import useInput from '@sovok/client/utils/hooks/useInput.ts'
import { useDebounce } from '@sovok/client/utils/hooks/useDebounce.ts'
import { trpc } from '@sovok/client/trpc.ts'
import { exists } from '@sovok/shared'
import { FC, useMemo } from 'react'
import { UiLoader } from '@sovok/client/components/ui/UiLoader.tsx'
import { SearchResult } from '@client/components/search/SearchResult.tsx'
import { usePlayer } from '@client/components/player/global/usePlayer.ts'
import { TrackInfo } from '@sovok/shared/models/search/track.ts'

const NoResults: FC<{ searchValue: string }> = ({ searchValue }) => (
  <p className='text-center w-full'>
    По запросу "{searchValue}" ничего не найдено!
  </p>
)

enum SearchState {
  NotStarted,
  Loading,
  NoResult,
  DataAvailable,
}

export const SearchPage = () => {
  const { bind, value: searchValueRaw } = useInput()
  const searchValue = useDebounce(searchValueRaw, 700)
  const player = usePlayer()

  const { data, isLoading } = trpc.search.useSWR(
    {
      query: searchValue,
    },
    {
      isDisabled: searchValue.length <= 3,
      fallbackData: [] as TrackInfo[],
      revalidateOnFocus: false,
    },
  )

  const searchState = useMemo<SearchState>(() => {
    console.log(isLoading, data)
    if (searchValue.length <= 3) {
      console.log('NOT STARTED')
      return SearchState.NotStarted
    }
    if (isLoading) {
      console.log('LOADING')
      return SearchState.Loading
    }
    if (!isLoading && exists(data) && data.length > 0) {
      if (data.length > 0) {
        console.log('DATA AVAILABLE')
        return SearchState.DataAvailable
      } else {
        console.log('NO RESULTS')
        return SearchState.NoResult
      }
    }
    return SearchState.NoResult
  }, [isLoading, data, searchValue])

  return (
    <div className='w-full h-full flex flex-col items-center space-y-4'>
      <input
        type='text'
        placeholder='Поиск...'
        {...bind}
        className='input input-bordered w-full input-primary'
      />
      <div className='w-full h-full flex flex-col space-y-3'>
        {searchState === SearchState.Loading ? (
          <div className='w-full h-full flex flex-col justify-center items-center'>
            <UiLoader className='w-12 h-12 text-white' />
          </div>
        ) : searchState === SearchState.DataAvailable ? (
          <div className='flex flex-col space-y-1.5'>
            {data?.map(v => (
              <SearchResult
                {...v}
                key={v.id}
                onClick={() => player.requestPlay(v.id)}
              />
            ))}
          </div>
        ) : (
          <div className='w-full h-full flex flex-col justify-center items-center'>
            {searchState === SearchState.NoResult ? (
              <NoResults searchValue={searchValue} />
            ) : (
              <p>Начните поиск!</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
