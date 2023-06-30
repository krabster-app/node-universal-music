import useInput from '@sovok/client/utils/hooks/useInput.ts'
import { useDebounce } from '@sovok/client/utils/hooks/useDebounce.ts'
import { trpc } from '@sovok/client/trpc.ts'
import { exists } from '@sovok/shared'
import { useEffect } from 'react'

export const SearchPage = () => {
  const { bind, value: searchValueRaw } = useInput()
  const searchValue = useDebounce(searchValueRaw, 500)

  const { data, isLoading, isError, refetch } = trpc.search.useQuery(
    {
      query: searchValue,
    },
    {
      enabled: false,
      staleTime: 200,
    },
  )

  useEffect(() => {
    if (searchValue.length > 3) {
      refetch()
    }
  }, [searchValue])

  return (
    <div className='w-full h-full flex flex-col'>
      <input
        type='text'
        placeholder='Поиск...'
        {...bind}
        className='input input-bordered w-full max-w-xs'
      />
      {searchValue}
      {isLoading ? 'loading' : exists(data) ? JSON.stringify(data) : 'undef'}
    </div>
  )
}
