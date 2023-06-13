import { useContext, useEffect } from 'react'
import {
  FaChevronLeft,
  FaEdit,
  FaTrashAlt,
  FaChevronRight,
  FaStar
} from 'react-icons/fa'

import { Layout } from '@components/utils/layout'
import { NewsContext } from '@contexts/NewsContext'
import { AlertError } from '@hooks/useAlert'
import { withSSRAdminPerm } from '@utils/withSSRAdminPerm'

interface NewsInterface {
  title: string
  uuid: string
  description: string
  highlight: string
  author: string
  createdAt: Date
  updatedAt: Date
}

export default function News() {
  const {
    useLoading,
    news,
    DeleteNews,
    GetNews,
    page,
    totalPage,
    nextPage,
    previousPage,
    FromToTotal
  } = useContext(NewsContext)

  useEffect(() => {
    GetNews()
  }, [])

  async function handleDelete(uuid: string) {
    try {
      await DeleteNews(uuid)
    } catch (err) {
      AlertError('Ocorreu um erro na requisição!')
    }
  }
  return (
    <Layout title="Notícias">
      <div className="flex flex-col justify-between space-y-10">
        <div className="items-center flex justify-between w-full">
          <a
            className="bg-color-info rounded font-bold hover:opacity-75 px-8 py-3 text-center text-white w-full lg:w-1/4"
            href="/news/new"
          >
            Nova Notícia
          </a>
        </div>

        {useLoading ? (
          <div className="flex flex-col mt-2 space-y-2">
            <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
            <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
            <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
            <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
            <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
            <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
            <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
          </div>
        ) : news && news.length >= 1 ? (
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden sm:rounded-lg">
                  <table className="divide-foreground divide-y-8 min-w-full">
                    <thead className="bg-primary">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                        >
                          Author
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                        >
                          Notícia
                        </th>
                        <th scope="col" className="p-5 relative">
                          <span className="sr-only">Funções</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-foreground rounded-lg divide-foreground divide-y-8">
                      {news.map((n: NewsInterface, index: number) => {
                        return (
                          <tr key={index} className="bg-primary">
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="items-center flex">
                                <img
                                  src={
                                    n.author.includes('*')
                                      ? `https://minotar.net/avatar/steve.png`
                                      : `https://minotar.net/avatar/${n.author}.png`
                                  }
                                  alt="Coupon"
                                  className="rounded-full h-14 object-cover w-14"
                                />
                                <div className="ml-5">
                                  <p className="font-lg font-semibold text-color-light">
                                    {n.author}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <p className="font-lg font-semibold text-color-light">
                                {n.title}
                              </p>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="items-center flex justify-end space-x-5 w-full">
                                {n.highlight === '1' ? (
                                  <FaStar className="text-2xl mr-5 text-yellow-300" />
                                ) : (
                                  <FaStar className="text-2xl mr-5 text-gray-400" />
                                )}
                                <a
                                  href={`/news/update?uuid=${n.uuid}`}
                                  className="text-xl focus:outline-none text-color-info"
                                >
                                  <FaEdit />
                                </a>
                                <button
                                  onClick={() => handleDelete(n.uuid)}
                                  className="text-xl focus:outline-none text-color-danger"
                                >
                                  <FaTrashAlt />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="items-center flex justify-center mt-5 space-x-10 lg:justify-end">
              <div className="text-sm font-light text-color-medium">
                <p>Página atual: {page}</p>
                <p>{FromToTotal}</p>
              </div>
              <div className="items-center flex justify-end">
                {page === 1 ? (
                  page === totalPage ? (
                    <>
                      <button
                        className="shadown-md bg-primary rounded-l-md focus:outline-none p-3 text-white"
                        disabled
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        disabled
                        className="shadown-md bg-primary rounded-r-md focus:outline-none p-3 text-white"
                      >
                        <FaChevronRight />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="shadown-md bg-primary rounded-l-md focus:outline-none p-3 text-white"
                        disabled
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        onClick={() => nextPage(page + 1)}
                        className="shadown-md bg-primary rounded-r-md focus:outline-none p-3 text-white"
                      >
                        <FaChevronRight />
                      </button>
                    </>
                  )
                ) : page === totalPage ? (
                  <>
                    <button
                      onClick={() => previousPage(page - 1)}
                      className="shadown-md bg-primary rounded-l-md focus:outline-none p-3 text-white"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      className="shadown-md bg-primary rounded-r-md focus:outline-none p-3 text-white"
                      disabled
                    >
                      <FaChevronRight />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => previousPage(page - 1)}
                      className="shadown-md bg-primary rounded-l-md focus:outline-none p-3 text-white"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={() => nextPage(page + 1)}
                      className="shadown-md bg-primary rounded-r-md focus:outline-none p-3 text-white"
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="items-center bg-primary rounded flex justify-center px-8 py-5 w-full">
            <p className="font-light text-color-medium">
              Nenhuma notícia cadastrada!
            </p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSSRAdminPerm(async () => {
  return { props: {} }
})
