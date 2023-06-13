import { useContext, useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaEye, FaSearch } from 'react-icons/fa'
import NumberFormat from 'react-number-format'

import { Layout } from '@components/utils/layout'
import { InfluencersContext } from '@contexts/InfluencersContext'
import { withSSRAdminPerm } from '@utils/withSSRAdminPerm'
import { AlertError } from '@hooks/useAlert'

interface InfluencerInterface {
  id: number
  uuid: string
  name: string
  percentage: number
  totalSales: number
}

export default function ContentCreators() {
  const [search, setSearch] = useState('')

  const {
    useLoading,
    influencers,
    GetInfluencers,
    UpdateInfluencer,
    FilterInfluencers,
    page,
    totalPage,
    nextPage,
    previousPage,
    FromToTotal
  } = useContext(InfluencersContext)

  useEffect(() => {
    GetInfluencers()
  }, [])

  async function handleEdit(id: any, percentage: any) {
    try {
      await UpdateInfluencer(id, percentage)
    } catch (err) {
      AlertError('Ocorreu um erro na requisição!')
    }
  }

  async function handleSearch() {
    try {
      await FilterInfluencers(search)
    } catch (err) {
      AlertError('Ocorreu um erro na requisição!')
    }
  }

  return (
    <Layout title="Criadores de Conteúdo">
      <div className="flex flex-col justify-between space-y-10">
        <div className="items-center flex justify-end w-full">
          <div className="item-center flex w-full lg:w-1/3">
            <input
              defaultValue=""
              type="text"
              name="search"
              onChange={e => setSearch(e.target.value)}
              placeholder="Digite o nome do influenciador?"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            <button
              className="bg-color-info text-xl focus:outline-none px-5"
              onClick={() => handleSearch()}
            >
              <FaSearch />
            </button>
          </div>
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
        ) : influencers && influencers.length >= 1 ? (
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
                          Influencer
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                        >
                          Já foi utilizado?
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                        >
                          Porcentagem
                        </th>
                        <th scope="col" className="p-5 relative">
                          <span className="sr-only">Funções</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-foreground rounded-lg divide-foreground divide-y-8">
                      {influencers.map(
                        (influencer: InfluencerInterface, index: number) => {
                          return (
                            <tr key={index} className="bg-primary">
                              <td className="px-6 py-5 whitespace-nowrap">
                                <div className="items-center flex">
                                  <img
                                    src={
                                      influencer.name.includes('*')
                                        ? `https://minotar.net/avatar/steve.png`
                                        : `https://minotar.net/avatar/${influencer.name}.png`
                                    }
                                    alt="Avatar"
                                    className="rounded-full h-14 object-cover w-14"
                                  />
                                  <div className="ml-5">
                                    <p className="font-lg font-semibold text-color-light">
                                      {influencer.name}
                                    </p>
                                    <p className="text-sm font-light text-color-medium">
                                      {influencer.uuid}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <p className="font-light text-color-medium">
                                  Já foi utilizado
                                  <b className="font-bold text-color-success">
                                    {' '}
                                    {influencer.totalSales}x
                                  </b>
                                </p>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <NumberFormat
                                  suffix={'%'}
                                  className="placeholder-gray-400 bg-transparent text-sm mt-1 outline-none px-4 py-3 text-color-light w-20"
                                  defaultValue={influencer.percentage}
                                  onChange={e =>
                                    handleEdit(influencer.id, e.target.value)
                                  }
                                />
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <div className="items-center flex justify-end space-x-5 w-full">
                                  <a
                                    href={`/content-creators/view?id=${influencer.id}`}
                                    className="text-xl focus:outline-none text-color-info"
                                  >
                                    <FaEye />
                                  </a>
                                </div>
                              </td>
                            </tr>
                          )
                        }
                      )}
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
              Nenhum influencer encontrado!
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
