import { useContext, useEffect, useState } from 'react'
import { FaGlobe, FaBars, FaTimes } from 'react-icons/fa'
import axios from 'axios'
import copy from 'copy-to-clipboard'

import { AuthContext } from '@contexts/AuthContext'
import { UtilsContext } from '@contexts/UtilsContext'
import { Theme } from '@components/utils/theme'
import { User } from '@components/utils/user'

export function Header() {
  const { useLoading } = useContext(AuthContext)
  const { useSidebarAdmin, updateSidebarAdmin } = useContext(UtilsContext)
  const [useOnline, setOnline] = useState(0)

  useEffect(() => {
    axios.get(`https://api.mcsrvstat.us/2/hylex.net`).then(response => {
      if (response.data.players) {
        setOnline(response.data.players.online)
      } else {
        setOnline(0)
      }
    })
  }, [])

  const copyToClipboard = () => {
    copy('hylex.net')
  }

  return (
    <header className="bg-secondary border-hr-color border-b top-0 py-5 sticky z-10 lg:py-0">
      <div className="container items-center flex justify-between">
        <div className="items-center flex w-1/2">
          {useSidebarAdmin ? (
            <button
              onClick={() => updateSidebarAdmin()}
              className="bg-transparent text-4xl mr-5 hover:opacity-75 focus:outline-none text-white duration-300 transition"
            >
              <FaTimes />
            </button>
          ) : (
            <button
              onClick={() => updateSidebarAdmin()}
              className="bg-transparent text-4xl mr-5 hover:opacity-75 focus:outline-none text-white duration-300 transition"
            >
              <FaBars />
            </button>
          )}
          <div className="group items-center flex flex-col relative">
            <a
              onClick={() => copyToClipboard()}
              className="items-center cursor-pointer hidden text-xl font-thin mr-5 hover:opacity-90 p-10 text-color-success delay-100 transition lg:flex"
            >
              <FaGlobe className="mr-2" /> {useOnline} Jogadores online.
            </a>
            <div className="items-center group-hover:flex hidden flex-col bottom-2 absolute">
              <span className="whitespace-no-wrap bg-black shadow-lg text-xs italic leading-none p-2 relative text-white z-10">
                Clique para copiar!
              </span>
            </div>
          </div>
        </div>
        <div className="items-center flex justify-end w-2/3">
          <Theme />
          {useLoading ? (
            <div className="items-center flex justify-between">
              <div className="animate-pulse bg-blue-300 rounded-full h-10 mr-5 w-10"></div>
              <div className="animate-pulse bg-gray-300 rounded h-5 w-14"></div>
            </div>
          ) : (
            <User />
          )}
        </div>
      </div>
    </header>
  )
}
