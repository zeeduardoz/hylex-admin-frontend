import { parseCookies } from 'nookies'

import { api } from '@services/apiClient'

export async function oneUtil(data: any) {
  const { '@hylex/token': token } = parseCookies()

  const response = await api.post(
    '/shopping/utils/editImage/one',
    {
      imageLink: data.imageOne
    },
    { headers: { Authorization: 'Bearer ' + token } }
  )

  if (response.data.status === 200) {
    await api.post(
      '/shopping/utils/editImageLink/one',
      {
        linkContent: data.linkOne
      },
      { headers: { Authorization: 'Bearer ' + token } }
    )
  }

  return response.data
}

export async function twoUtil(data: any) {
  const { '@hylex/token': token } = parseCookies()

  const response = await api.post(
    '/shopping/utils/editImage/two',
    {
      imageLink: data.imageTwo
    },
    { headers: { Authorization: 'Bearer ' + token } }
  )

  if (response.data.status === 200) {
    await api.post(
      '/shopping/utils/editImageLink/two',
      {
        linkContent: data.linkTwo
      },
      { headers: { Authorization: 'Bearer ' + token } }
    )
  }

  return response.data
}

export async function threeUtil(data: any) {
  const { '@hylex/token': token } = parseCookies()

  const response = await api.post(
    '/shopping/utils/editImage/three',
    {
      imageLink: data.imageThree
    },
    { headers: { Authorization: 'Bearer ' + token } }
  )

  if (response.data.status === 200) {
    await api.post(
      '/shopping/utils/editImageLink/three',
      {
        linkContent: data.linkThree
      },
      { headers: { Authorization: 'Bearer ' + token } }
    )
  }

  return response.data
}

export async function editHeader(data: any) {
  const { '@hylex/token': token } = parseCookies()

  const response = await api.post(
    '/shopping/utils/editHeader',
    {
      headerContent: data.headerContent
    },
    { headers: { Authorization: 'Bearer ' + token } }
  )

  return response.data
}
