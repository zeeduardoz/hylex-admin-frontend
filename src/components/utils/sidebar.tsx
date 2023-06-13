import { useContext } from 'react'
import Link from 'next/link'
import { Transition } from '@headlessui/react'
import {
  FaPercent,
  FaGifts,
  FaScroll,
  FaBook,
  FaChartPie,
  FaFileInvoiceDollar,
  FaNewspaper,
  FaHandshake,
  FaArrowLeft,
  FaCogs
} from 'react-icons/fa'

import { AuthContext } from '@contexts/AuthContext'

export function Sidebar(props: any) {
  const { useFullPerm } = useContext(AuthContext)

  return (
    <Transition
      show={props.show}
      className="scrollbar-none bg-secondary border-hr-color border-r h-screen overflow-y-auto overscroll-y-auto px-10 py-5 2xl:w-1/4 w-11/12 lg:w-1/3"
    >
      <Transition.Child
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className="bg-secondary flex flex-col">
          <a
            href="https://hylex.net"
            target="_blank"
            className="items-center flex flex-col"
          >
            <img src="/logo.png" alt="Logo" width="100" />
          </a>
          <div className="mt-16 2xl:mt-24">
            <p className="text-lg font-bold text-color-info">Superior</p>
            <ul className="p-3">
              <Link href="/">
                <a className="items-center flex text-sm font-light my-2 hover:opacity-75 text-gray-400 w-full lg:text-base">
                  <FaChartPie className="mr-2" /> Dashboard
                </a>
              </Link>
              <Link href={useFullPerm ? '/config' : '/'}>
                <a
                  className={
                    useFullPerm
                      ? 'items-center flex font-light text-sm lg:text-base my-2 hover:opacity-75 text-gray-400 w-full'
                      : 'items-center flex font-light text-sm lg:text-base my-2 cursor-not-allowed opacity-40 text-gray-400 w-full'
                  }
                >
                  <FaCogs className="mr-2" /> Configurações
                </a>
              </Link>
              <Link href="/orders">
                <a className="items-center flex text-sm font-light my-2 hover:opacity-75 text-gray-400 w-full lg:text-base">
                  <FaFileInvoiceDollar className="mr-2" /> Vendas
                </a>
              </Link>
              <Link href={useFullPerm ? '/products' : '/'}>
                <a
                  className={
                    useFullPerm
                      ? 'items-center flex font-light text-sm lg:text-base my-2 hover:opacity-75 text-gray-400 w-full'
                      : 'items-center flex font-light text-sm lg:text-base my-2 cursor-not-allowed opacity-40 text-gray-400 w-full'
                  }
                >
                  <FaGifts className="mr-2" /> Produtos
                </a>
              </Link>
              <Link href={useFullPerm ? '/coupons' : '/'}>
                <a
                  className={
                    useFullPerm
                      ? 'items-center flex font-light  text-sm lg:text-base my-2 hover:opacity-75 text-gray-400 w-full'
                      : 'items-center flex font-light text-sm lg:text-base my-2 cursor-not-allowed opacity-40 text-gray-400 w-full'
                  }
                >
                  <FaPercent className="mr-2" /> Cupons
                </a>
              </Link>
            </ul>
          </div>
          <div className="mt-10">
            <p className="text-lg font-bold text-color-info">
              Painel de Controle
            </p>
            <ul className="p-3">
              <Link href="/news">
                <a className="items-center flex text-sm font-light my-2 hover:opacity-75 text-gray-400 w-full lg:text-base">
                  <FaNewspaper className="mr-2" /> Notícias
                </a>
              </Link>
              <Link href="/guidelines">
                <a className="items-center flex text-sm font-light my-2 hover:opacity-75 text-gray-400 w-full lg:text-base">
                  <FaScroll className="mr-2" /> Diretrizes
                </a>
              </Link>
              <Link href="/patch-notes">
                <a className="items-center flex text-sm font-light my-2 hover:opacity-75 text-gray-400 w-full lg:text-base">
                  <FaBook className="mr-2" /> Patch Notes
                </a>
              </Link>
              <Link href="/content-creators ">
                <a className="items-center flex text-sm font-light my-2 hover:opacity-75 text-gray-400 w-full lg:text-base">
                  <FaHandshake className="mr-2" /> Criadores de Conteúdo
                </a>
              </Link>
            </ul>
          </div>
          <div className="mt-10">
            <ul className="p-3">
              <a
                href="https://hylex.net"
                target="_blank"
                className="items-center flex text-sm font-light my-2 hover:opacity-75 text-white w-full lg:text-base"
              >
                <FaArrowLeft className="mr-2" /> Voltar para o site principal
              </a>
              <a
                href="https://loja.hylex.net"
                target="_blank"
                className="items-center flex text-sm font-light my-2 hover:opacity-75 text-white w-full lg:text-base"
              >
                <FaArrowLeft className="mr-2" /> Voltar para a loja
              </a>
            </ul>
          </div>
        </div>
      </Transition.Child>
    </Transition>
  )
}
