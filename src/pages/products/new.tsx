import { Layout } from '@components/utils/layout'
import { withSSRAdminPermFull } from '@utils/withSSRAdminPermFull'
import { NewForm } from '@components/products/new'

export default function NewProduct() {
  return (
    <Layout title="Cadastrar">
      <div className="flex flex-col justify-between space-y-14">
        <div className="items-center flex justify-between w-full">
          <a
            className="bg-color-info rounded font-bold hover:opacity-75 px-8 py-3 text-center text-white w-full lg:w-auto"
            href="/products"
          >
            ← &nbsp;&nbsp; Voltar
          </a>
        </div>
        <NewForm />
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSSRAdminPermFull(async () => {
  return { props: {} }
})
