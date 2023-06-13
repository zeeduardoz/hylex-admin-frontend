import { parseCookies } from 'nookies'

import { api } from '@services/apiClient'

export async function editRules(data: any) {
  const { '@hylex/token': token } = parseCookies()

  const response = await api.post(
    '/shopping/utils/saveRules',
    {
      rulesContent: data
    },
    { headers: { Authorization: 'Bearer ' + token } }
  )

  return response.data
}

export async function editTerms(data: any) {
  const { '@hylex/token': token } = parseCookies()

  const response = await api.post(
    '/shopping/utils/saveTerms',
    {
      termsContent: data
    },
    { headers: { Authorization: 'Bearer ' + token } }
  )

  return response.data
}
