import { useEffect, useState } from 'react'
import Router from 'next/router'
import { parseCookies } from 'nookies'

import { Layout } from '@components/utils/layout'
import { api } from '@services/apiClient'
import { withSSRAdminPerm } from '@utils/withSSRAdminPerm'
import { AlertError } from '@hooks/useAlert'

interface SalesInfo {
  month: string
  earns: {
    amount: string
    totalSales: string
    totalSalesValue: string
    percentage: number
  }
}

export default function ContentCreators(props: any) {
  const [useLoading, setLoading] = useState(true)
  const [data, setData] = useState<SalesInfo[]>([])

  useEffect(() => {
    setLoading(true)
    const { '@hylex/token': token } = parseCookies()

    api
      .get(`/admin/influencers/getSalesInfo?creatorId=${props.id}`, {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then(response => {
        setData(response.data.data)
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      })
      .catch(err => {
        console.log(err)
        AlertError('Ocorreu um erro na requisição!')
      })
  }, [])

  return (
    <Layout title="Criador de Conteúdo">
      <div className="flex flex-col justify-between space-y-10">
        <div className="items-center flex justify-between w-full">
          <a
            className="bg-color-info rounded font-bold hover:opacity-75 px-8 py-3 text-center text-white w-full lg:w-auto"
            href="/content-creators"
          >
            ← &nbsp;&nbsp; Voltar
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
        ) : data && data.length >= 1 ? (
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
                          Mês/Ano
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                        >
                          Quantidade de vendas
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                        >
                          Valor completo
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                        >
                          Valor total
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                        >
                          Porcentagem
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-foreground rounded-lg divide-foreground divide-y-8">
                      {data.map((item: SalesInfo, index: number) => {
                        return (
                          <tr key={index} className="bg-primary">
                            <td className="px-6 py-5 whitespace-nowrap">
                              <p className="text-lg text-color-light">
                                {item.month}
                              </p>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <p className="text-lg text-color-info">
                                {item.earns.totalSales}x utilizadas
                              </p>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <p className="text-lg text-color-success">
                                R$ {item.earns.totalSalesValue}
                              </p>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <p className="text-lg text-color-success">
                                R$ {item.earns.amount}
                              </p>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <p className="text-lg text-color-light">
                                {item.earns.percentage}%
                              </p>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="items-center bg-primary rounded flex justify-center px-8 py-5 w-full">
            <p className="font-light text-color-medium">
              Nenhum histórico encontrado!
            </p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSSRAdminPerm(async ctx => {
  if (ctx.query.id === null) Router.push('/contect-creators')

  return { props: { id: ctx.query.id } }
})
