import Router from 'next/router'
import { createContext, useState } from 'react'
import { parseCookies } from 'nookies'

import { api } from '@services/apiClient'
import { AlertError, AlertSuccess } from '@hooks/useAlert'

type New = {
  title: string
  uuid: string
  description: string
  highlight: string
  author: string
  createdAt: Date
  updatedAt: Date
}

type NewsContextType = {
  news: New[]
  page: number
  totalPage: number
  useLoading: boolean
  FromToTotal: string

  nextPage: (page: number) => void
  previousPage: (page: number) => void
  GetNews: () => Promise<any>
  NewNews: (data: any, description: any) => Promise<any>
  UpdateNews: (uuid: any, data: any, description: any) => Promise<any>
  DeleteNews: (uuid: any) => Promise<any>
}

export const NewsContext = createContext({} as NewsContextType)

export const NewsProvider: React.FC = ({ children }: any) => {
  const [useLoading, setLoading] = useState(false)
  const [news, setNews] = useState<New[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(1)
  const [totalNews, setTotalNews] = useState<number>(0)
  const [FromToTotal, setFromToTotal] = useState<string>('')

  function nextPage(page: number) {
    setPage(page)
    GetNewsNext()
  }

  function previousPage(page: number) {
    setPage(page)
    GetNewsPrev()
  }

  async function GetNews() {
    const { '@hylex/token': token } = parseCookies()

    setLoading(true)

    const response = await api.get(
      `/admin/news/list?perPage=${5}&currentPage=${page}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )

    if (response.data.pagination) {
      if (page === 1) {
        setTotalPage(Math.ceil(response.data.pagination.total / 5))
        setTotalNews(response.data.pagination.total)
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${response.data.pagination.total}`
        )
      } else {
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${totalNews}`
        )
      }
    }

    setNews(response.data.data)
    setLoading(false)
  }

  async function GetNewsPrev() {
    const { '@hylex/token': token } = parseCookies()

    const response = await api.get(
      `/admin/news/list?perPage=${5}&currentPage=${page - 1}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )

    if (response.data.pagination) {
      if (page - 1 === 1) {
        setTotalPage(Math.ceil(response.data.pagination.total / 5))
        setTotalNews(response.data.pagination.total)
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${response.data.pagination.total}`
        )
      } else {
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${totalNews}`
        )
      }
    }

    setNews(response.data.data)
    setLoading(false)
  }

  async function GetNewsNext() {
    const { '@hylex/token': token } = parseCookies()

    setLoading(true)

    const response = await api.get(
      `/admin/news/list?perPage=${5}&currentPage=${page + 1}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )

    if (response.data.pagination) {
      if (page + 1 === 1) {
        setTotalPage(Math.ceil(response.data.pagination.total / 5))
        setTotalNews(response.data.pagination.total)
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${response.data.pagination.total}`
        )
      } else {
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${totalNews}`
        )
      }
    }

    setNews(response.data.data)
  }

  async function NewNews(data: any, description: any) {
    const { '@hylex/token': token } = parseCookies()

    const news = {
      title: data.title,
      description,
      highlight: data.highlight
    }

    const response = await api.post('/admin/news/create', news, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

    if (response.data.status === 201) {
      AlertSuccess(response.data.message)
      Router.push('/news')
    } else {
      AlertError(response.data.message)
    }
  }

  async function UpdateNews(uuid: any, data: any, description: any) {
    const { '@hylex/token': token } = parseCookies()

    const news = {
      noticeUUID: uuid,
      title: data.title,
      description,
      highlight: data.highlight
    }

    const response = await api.post('/admin/news/edit', news, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

    if (response.data.status === 200) {
      AlertSuccess(response.data.message)
      Router.push('/news')
    } else {
      AlertError(response.data.message)
    }
  }

  async function DeleteNews(uuid: string) {
    const { '@hylex/token': token } = parseCookies()

    const response = await api.delete(`/admin/news/delete?noticeUUID=${uuid}`, {
      headers: { Authorization: 'Bearer ' + token }
    })

    if (response.data.status === 200) AlertSuccess(response.data.message)
    if (response.data.status === 404) AlertError(response.data.message)

    GetNews()
  }

  return (
    <NewsContext.Provider
      value={{
        useLoading,
        GetNews,
        news,
        FromToTotal,
        NewNews,
        UpdateNews,
        DeleteNews,
        page,
        totalPage,
        nextPage,
        previousPage
      }}
    >
      {children}
    </NewsContext.Provider>
  )
}
