import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next'
import { parseCookies, destroyCookie } from 'nookies'
import decode from 'jwt-decode'

export function withSSRAdminPerm<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const { '@hylex/token': token } = parseCookies(ctx)

    if (!token) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false
        }
      }
    } else {
      const user = decode<{ roles: string[] }>(token)

      const accept = ['Master', 'Gerente']
      const valid = accept.some(x => user?.roles.includes(x))

      if (!valid) {
        destroyCookie(undefined, '@hylex/token', {
          path: '/'
        })
        destroyCookie(undefined, '@hylex/refreshToken', {
          path: '/'
        })

        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }

    return await fn(ctx)
  }
}
