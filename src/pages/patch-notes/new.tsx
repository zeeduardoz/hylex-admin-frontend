import { Layout } from '@components/utils/layout'
import { withSSRAdminPerm } from '@utils/withSSRAdminPerm'
import { NewForm } from '@components/patch-notes/new'

export default function NewPatchNote() {
  return (
    <Layout title="Cadastrar">
      <div className="flex flex-col justify-between space-y-14">
        <div className="items-center flex justify-between w-full">
          <a
            className="bg-color-info rounded font-bold hover:opacity-75 px-8 py-3 text-center text-white w-full lg:w-auto"
            href="/patch-notes"
          >
            ← &nbsp;&nbsp; Voltar
          </a>
        </div>
        <NewForm />
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSSRAdminPerm(async () => {
  return { props: {} }
})
