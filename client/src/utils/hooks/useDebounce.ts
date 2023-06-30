import { useEffect, useState } from 'react'

export const useDebounce = <T extends any>(
  value: T,
  timeout: number = 500,
): T => {
  const [_value, _setValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => _setValue(value), timeout)
    return () => clearTimeout(timer)
  }, [value])

  return _value
}
