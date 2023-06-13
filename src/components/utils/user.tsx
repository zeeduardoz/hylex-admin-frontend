import { useContext, Fragment } from 'react'
import { FaChevronDown, FaSignInAlt } from 'react-icons/fa'
import { Menu, Transition } from '@headlessui/react'

import { AuthContext, signOut } from '@contexts/AuthContext'
import { UtilsContext } from '@contexts/UtilsContext'

export function User() {
  const { useUser } = useContext(AuthContext)
  const { useSidebarAdmin } = useContext(UtilsContext)

  return (
    <div
      className={
        useSidebarAdmin ? 'hidden lg:flex items-center' : 'flex items-center'
      }
    >
      <div className="h-12 relative w-12">
        <img
          className="rounded-full shadow-lg h-12 object-cover w-12"
          src={
            useUser?.name.includes('*')
              ? `https://minotar.net/avatar/steve.png`
              : `https://minotar.net/avatar/${useUser?.name}.png`
          }
          alt="Avatar"
        />
      </div>
      <Menu as="div" className="inline-block relative text-left">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="z-1 inline-flex font-semibold justify-center focus:outline-none px-4 py-2 text-white w-full">
                {useUser?.name}
                <FaChevronDown
                  className="h-3 ml-2 mr-1 mt-1 text-white w-3"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="bg-secondary border-hr-color rounded-b-md border border-t-0 shadow-lg divide-gray-100 divide-y -ml-24 mt-6 focus:outline-none p-3 absolute origin-top-left w-48 z-50 lg:mt-8"
              >
                <div className="border-none py-2">
                  <Menu.Item>
                    <a
                      onClick={() => signOut()}
                      className="items-center cursor-pointer flex hover:opacity-75 focus:outline-none px-3 py-2 text-white duration-300 transition"
                    >
                      <FaSignInAlt className="mr-2" /> Deslogar
                    </a>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}
