import { createContext, useState } from 'react'
import { parseCookies } from 'nookies'

import { api } from '@services/apiClient'
import { AlertError, AlertSuccess } from '@hooks/useAlert'

type Influencers = {
  id: number
  uuid: string
  name: string
  percentage: number
  totalSales: number
}

type InfluencersContextType = {
  influencers: Influencers[]
  page: number
  totalPage: number
  useLoading: boolean
  FromToTotal: string

  nextPage: (page: number) => void
  previousPage: (page: number) => void
  GetInfluencers: () => Promise<any>
  FilterInfluencers: (data: any) => Promise<any>
  UpdateInfluencer: (id: any, percentage: any) => Promise<any>
}

export const InfluencersContext = createContext({} as InfluencersContextType)

export const InfluencersProvider: React.FC = ({ children }: any) => {
  const [useLoading, setLoading] = useState(false)
  const [influencers, setInfluencers] = useState<Influencers[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(1)
  const [totalInfluencers, setTotalInfluencers] = useState<number>(0)
  const [FromToTotal, setFromToTotal] = useState<string>('')

  function nextPage(page: number) {
    setPage(page)
    GetInfluencersNext()
  }

  function previousPage(page: number) {
    setPage(page)
    GetInfluencersPrev()
  }

  async function GetInfluencers() {
    const { '@hylex/token': token } = parseCookies()

    setLoading(true)

    const response = await api.get(
      `/admin/influencers/list?perPage=${5}&currentPage=${page}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )

    if (response.data.pagination) {
      if (page === 1) {
        setTotalPage(Math.ceil(response.data.pagination.total / 5))
        setTotalInfluencers(response.data.pagination.total)
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${response.data.pagination.total}`
        )
      } else {
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${totalInfluencers}`
        )
      }
    }

    setInfluencers(response.data.data)
    setLoading(false)
  }

  async function GetInfluencersNext() {
    const { '@hylex/token': token } = parseCookies()

    const response = await api.get(
      `/admin/influencers/list?perPage=${5}&currentPage=${page + 1}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )

    if (response.data.pagination) {
      if (page + 1 === 1) {
        setTotalPage(Math.ceil(response.data.pagination.total / 5))
        setTotalInfluencers(response.data.pagination.total)
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${response.data.pagination.total}`
        )
      } else {
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${totalInfluencers}`
        )
      }
    }

    setInfluencers(response.data.data)
  }

  async function GetInfluencersPrev() {
    const { '@hylex/token': token } = parseCookies()

    const response = await api.get(
      `/admin/influencers/list?perPage=${5}&currentPage=${page - 1}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )

    if (response.data.pagination) {
      if (page - 1 === 1) {
        setTotalPage(Math.ceil(response.data.pagination.total / 5))
        setTotalInfluencers(response.data.pagination.total)
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${response.data.pagination.total}`
        )
      } else {
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${totalInfluencers}`
        )
      }
    }

    setInfluencers(response.data.data)
  }

  async function FilterInfluencers(data: any) {
    const { '@hylex/token': token } = parseCookies()

    setLoading(true)

    const response = await api.get(
      `/admin/influencers/getByName?name=${data}`,
      {
        headers: { Authorization: 'Bearer ' + token }
      }
    )

    if (response.data.status === 200) {
      setInfluencers(response.data.data)
      setPage(1)
      setTotalPage(1)
      setTotalInfluencers(response.data.data.length)
      setFromToTotal(`Resultados encontrados: ${response.data.data.length}`)
    }

    setLoading(false)
  }

  async function UpdateInfluencer(id: any, percentage: any) {
    const { '@hylex/token': token } = parseCookies()

    const influencer = {
      creatorId: id,
      percentage: parseInt(percentage.replace('%', ''))
    }

    const response = await api.post('/admin/influencers/modify', influencer, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

    if (response.data.status === 200) {
      AlertSuccess(response.data.message)
    } else {
      AlertError(response.data.message)
    }
  }

  return (
    <InfluencersContext.Provider
      value={{
        useLoading,
        FromToTotal,
        influencers,
        GetInfluencers,
        FilterInfluencers,
        UpdateInfluencer,
        page,
        totalPage,
        nextPage,
        previousPage
      }}
    >
      {children}
    </InfluencersContext.Provider>
  )
}
