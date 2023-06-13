import { parseCookies } from 'nookies'
import { FaDollarSign, FaFileInvoiceDollar } from 'react-icons/fa'

import { Layout } from '@components/utils/layout'
import { withSSRAdminPerm } from '@utils/withSSRAdminPerm'
import { api } from '@services/apiClient'
import { useEffect, useState } from 'react'

interface DataProps {
  totalSalesFormatted: string
  monthSalesFormatted: string
  monthPurchases: number
}

export default function Dashboard() {
  const [data, setData] = useState<DataProps | null>(null)

  useEffect(() => {
    const { '@hylex/token': token } = parseCookies()

    api
      .get(`/admin/dashboard/getInfo`, {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then(response => {
        setData(response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <Layout title="Dashboard">
      <>
        <div className="bg-primary py-10">
          <h1 className="text-2xl font-bold text-center text-color-light">
            Painel administrativo do servidor Hylex!
          </h1>
        </div>
        {data ? (
          <div className="itens-center justify-between mt-5 w-full lg:flex lg:space-x-10">
            <div className="items-center bg-primary rounded flex justify-between mt-5 p-5 w-full lg:w-1/3">
              <div className="bg-color-success rounded-full text-2xl p-4 text-white">
                <FaDollarSign />
              </div>
              <div>
                <p className="text-xl font-bold text-right text-color-light">
                  R$ {data.totalSalesFormatted}
                </p>
                <p className="text-sm font-light text-color-medium">
                  Valor (R$) total em vendas
                </p>
              </div>
            </div>
            <div className="items-center bg-primary rounded flex justify-between mt-5 p-5 w-full lg:w-1/3">
              <div className="bg-color-success rounded-full text-2xl p-4 text-white">
                <FaDollarSign />
              </div>
              <div>
                <p className="text-xl font-bold text-right text-color-light">
                  R$ {data.monthSalesFormatted}
                </p>
                <p className="text-sm font-light text-color-medium">
                  Valor (R$) mensal em vendas
                </p>
              </div>
            </div>
            <div className="items-center bg-primary rounded flex justify-between mt-5 p-5 w-full lg:w-1/3">
              <div className="bg-color-info rounded-full text-2xl p-4 text-white">
                <FaFileInvoiceDollar />
              </div>
              <div>
                <p className="text-xl font-bold text-right text-color-light">
                  {data.monthPurchases}
                </p>
                <p className="text-sm font-light text-color-medium">
                  Total de vendas mês
                </p>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    </Layout>
  )
}

export const getServerSideProps = withSSRAdminPerm(async () => {
  return { props: {} }
})
