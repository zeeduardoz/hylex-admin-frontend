import { useTheme } from 'next-themes'
import { useContext, useEffect, useState } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

import { UtilsContext } from '@contexts/UtilsContext'

export function Theme() {
  const { useSidebarAdmin } = useContext(UtilsContext)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (theme === 'null') setTheme('dark')
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <a
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={
        useSidebarAdmin
          ? 'cursor-pointer hidden lg:block filter text-3xl mr-10 hover:opacity-75 px-10 text-yellow-200 delay-100 transition'
          : 'cursor-pointer filter text-3xl mr-10 hover:opacity-75 px-10 text-yellow-200 delay-100 transition'
      }
    >
      {theme === 'light' ? (
        <FaSun />
      ) : theme === 'null' ? (
        <FaSun />
      ) : (
        <FaMoon />
      )}
    </a>
  )
}
