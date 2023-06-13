import Router from 'next/router'
import { parseCookies } from 'nookies'

import { Layout } from '@components/utils/layout'
import { withSSRAdminPermFull } from '@utils/withSSRAdminPermFull'
import { UpdateForm } from '@components/products/update'
import { api } from '@services/apiClient'

export default function UpdateProduct(props: any) {
  return (
    <Layout title="Atualizar">
      <div className="flex flex-col justify-between space-y-14">
        <div className="items-center flex justify-between w-full">
          <a
            className="bg-color-info rounded font-bold hover:opacity-75 px-8 py-3 text-center text-white w-full lg:w-auto"
            href="/products"
          >
            ← &nbsp;&nbsp; Voltar
          </a>
        </div>
        <UpdateForm props={props} />
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSSRAdminPermFull(async ctx => {
  if (ctx.query.uuid === null) Router.push('/products')

  const { '@hylex/token': token } = parseCookies(ctx)

  const response = await api.get(
    `/shopping/getProductsByUUID?productUUID=${ctx.query.uuid}`,
    { headers: { Authorization: 'Bearer ' + token } }
  )

  return {
    props: {
      product: response.data.data,
      images: response.data.data.images,
      todo: JSON.parse(response.data.data.description)
    }
  }
})
