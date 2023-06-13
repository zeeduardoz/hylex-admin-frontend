import { useContext, useEffect } from 'react'
import {
  FaChevronLeft,
  FaChevronRight,
  FaTrashAlt,
  FaPowerOff
} from 'react-icons/fa'

import { Layout } from '@components/utils/layout'
import { CouponsContext } from '@contexts/CouponsContext'
import { withSSRAdminPermFull } from '@utils/withSSRAdminPermFull'
import { AlertError } from '@hooks/useAlert'

interface CouponInterface {
  uuid: string
  name: string
  percentage: string
  allowedIn: string
  endAt: string
  active: string
}

export default function Coupons() {
  const {
    useLoading,
    coupons,
    GetCoupons,
    UpdateCoupon,
    DeleteCoupon,
    page,
    totalPage,
    nextPage,
    previousPage,
    FromToTotal
  } = useContext(CouponsContext)

  useEffect(() => {
    GetCoupons()
  }, [])

  async function handleDelete(uuid: any) {
    try {
      await DeleteCoupon(uuid)
    } catch (err) {
      console.log(err)
      AlertError('Ocorreu um erro na requisição!')
    }
  }

  async function handleEdit(uuid: any) {
    try {
      await UpdateCoupon(uuid)
    } catch (err) {
      AlertError('Ocorreu um erro na requisição!')
    }
  }

  return (
    <Layout title="Cupons">
      <div className="flex flex-col justify-between space-y-10">
        <div className="items-center flex justify-between w-full">
          <a
            className="bg-color-info rounded font-bold hover:opacity-75 px-8 py-3 text-center text-white w-full lg:w-1/4"
            href="/coupons/new"
          >
            Novo Cupom
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
        ) : coupons && coupons.length >= 1 ? (
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
                          Cupom
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                        >
                          Desconto
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                        >
                          Habilitado
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                        >
                          Expira
                        </th>
                        <th scope="col" className="p-5 relative">
                          <span className="sr-only">Funções</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-foreground rounded-lg divide-foreground divide-y-8">
                      {coupons.map((coupon: CouponInterface, index: number) => {
                        return (
                          <tr key={index} className="bg-primary">
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="items-center flex">
                                <img
                                  src={`https://i.imgur.com/plJfwTA.png`}
                                  alt="Coupon"
                                  className="rounded-full h-14 object-cover w-14"
                                />
                                <div className="ml-5">
                                  <p className="font-lg font-semibold text-color-light">
                                    {coupon.name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <p className="font-light text-color-success w-full">
                                {coupon.percentage}%
                              </p>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <p className="font-light text-color-medium w-full">
                                {coupon.allowedIn === 'all'
                                  ? 'Todos'
                                  : coupon.allowedIn}
                              </p>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <p className="font-light text-color-medium w-full">
                                {coupon.endAt === '' || coupon.endAt === null
                                  ? 'Sem data e hora'
                                  : coupon.endAt}
                              </p>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="items-center flex justify-end space-x-5 w-full">
                                <button
                                  onClick={() => handleEdit(coupon.uuid)}
                                  className={
                                    coupon.active === '1'
                                      ? 'text-xl focus:outline-none text-color-success'
                                      : 'text-xl focus:outline-none text-color-medium'
                                  }
                                >
                                  <FaPowerOff />
                                </button>
                                <button
                                  onClick={() => handleDelete(coupon.uuid)}
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
              Nenhum cupom encontrado!
            </p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSSRAdminPermFull(async () => {
  return { props: {} }
})
