import { useContext, useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa'

import { Layout } from '@components/utils/layout'
import { Modal } from '@components/orders'
import { OrdersContext } from '@contexts/OrdersContext'
import { withSSRAdminPerm } from '@utils/withSSRAdminPerm'
import { AlertError } from '@hooks/useAlert'

export interface Purchases {
  id: number
  uuid: string
  user: string
  items: []
  paymentType: string
  status: string
  gateway: string
  totalAmount: number
  totalDiscounts: number
  subTotal: number
  orderId: number
  influencer: number
  discountCoupon: string
  approvedAt: Date
  createdAt: Date
}

export default function Orders() {
  const [search, setSearch] = useState('')
  const {
    useLoading,
    orders,
    GetOrders,
    page,
    totalPage,
    nextPage,
    previousPage,
    FromToTotal,
    FilterOrders
  } = useContext(OrdersContext)

  useEffect(() => {
    GetOrders()
  }, [])

  async function handleSearch() {
    try {
      await FilterOrders(search)
    } catch (err) {
      AlertError('Ocorreu um erro na requisição!')
    }
  }
  return (
    <Layout title="Vendas">
      <div className="flex flex-col justify-between space-y-10">
        <div className="items-center flex justify-end w-full">
          <div className="item-center flex w-full lg:w-1/3">
            <input
              defaultValue=""
              type="text"
              name="search"
              onChange={e => setSearch(e.target.value)}
              placeholder="Digite o nome do comprador?"
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
        ) : orders && orders.length >= 1 ? (
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
                          Transação
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                        >
                          Gateway
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                        >
                          Valor
                        </th>
                        <th scope="col" className="p-5 relative">
                          <span className="sr-only">Funções</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-foreground rounded-lg divide-foreground divide-y-8">
                      {orders.map((order: Purchases, index: number) => {
                        return (
                          <tr key={index} className="bg-primary">
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="items-center flex">
                                <img
                                  src={
                                    order.user.includes('*')
                                      ? `https://minotar.net/avatar/steve.png`
                                      : `https://minotar.net/avatar/${order.user}.png`
                                  }
                                  alt="Avatar Image"
                                  className="rounded-full h-14 object-cover w-14"
                                />
                                <div className="ml-5">
                                  <p className="font-lg font-semibold text-color-light">
                                    {order.user}
                                  </p>
                                  <p className="text-sm font-light text-color-medium">
                                    {order.uuid}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <p className="text-sm font-light text-color-light">
                                {order.gateway}
                              </p>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <p className="text-sm font-light text-color-light">
                                {order.status}
                              </p>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <p className="text-lg font-light text-color-success">
                                R$ {order.totalAmount}
                              </p>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <Modal order={order} />
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
              Nenhuma transação encontrada!
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
