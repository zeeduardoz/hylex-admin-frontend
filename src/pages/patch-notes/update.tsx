import Router from 'next/router'
import { parseCookies } from 'nookies'

import { Layout } from '@components/utils/layout'
import { withSSRAdminPerm } from '@utils/withSSRAdminPerm'
import { UpdateForm } from '@components/patch-notes/update'
import { api } from '@services/apiClient'

export default function UpdatePatchNote(props: any) {
  return (
    <Layout title="Atualizar">
      <div className="flex flex-col justify-between space-y-14">
        <div className="items-center flex justify-between w-full">
          <a
            className="bg-color-info rounded font-bold hover:opacity-75 px-8 py-3 text-center text-white w-full lg:w-auto"
            href="/patch-notes"
          >
            ← &nbsp;&nbsp; Voltar
          </a>
        </div>
        <UpdateForm props={props} />
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSSRAdminPerm(async ctx => {
  if (ctx.query.id === null) Router.push('/patch-notes')

  const { '@hylex/token': token } = parseCookies(ctx)

  const response = await api.get(
    `/admin/pathNotes/getById?id=${ctx.query.id}`,
    {
      headers: { Authorization: 'Bearer ' + token }
    }
  )

  return {
    props: {
      patchNote: response.data.data
    }
  }
})
