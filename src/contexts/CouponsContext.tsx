import Router from 'next/router'
import { createContext, useState } from 'react'
import { parseCookies } from 'nookies'

import { api } from '@services/apiClient'
import { AlertError, AlertSuccess } from '@hooks/useAlert'

type Coupon = {
  uuid: string
  name: string
  percentage: string
  allowedIn: string
  endAt: string
  active: string
}

type OptionsItem = {
  value: string
  label: string
}

type CouponsContextType = {
  coupons: Coupon[]
  page: number
  totalPage: number
  useLoading: boolean
  FromToTotal: string
  options: OptionsItem[]

  nextPage: (page: number) => void
  previousPage: (page: number) => void
  GetCoupons: () => Promise<any>
  GetAllProducts: () => Promise<any>
  NewCoupon: (data: any, allowedIn: any) => Promise<any>
  UpdateCoupon: (uuid: any) => Promise<any>
  DeleteCoupon: (uuid: any) => Promise<any>
}

export const CouponsContext = createContext({} as CouponsContextType)

export const CouponsProvider: React.FC = ({ children }: any) => {
  const [useLoading, setLoading] = useState(false)
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(1)
  const [totalCoupons, setTotalCoupons] = useState<number>(0)
  const [FromToTotal, setFromToTotal] = useState<string>('')
  const [options, setOptions] = useState<OptionsItem[]>([])

  function nextPage(page: number) {
    setPage(page)
    GetCouponsNext()
  }

  function previousPage(page: number) {
    setPage(page)
    GetCouponsPrev()
  }

  async function GetCoupons() {
    const { '@hylex/token': token } = parseCookies()

    setLoading(true)

    const response = await api.get(
      `/admin/coupons/list?perPage=${5}&currentPage=${page}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )

    if (response.data.pagination) {
      if (page === 1) {
        setTotalPage(Math.ceil(response.data.pagination.total / 5))
        setTotalCoupons(response.data.pagination.total)
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${response.data.pagination.total}`
        )
      } else {
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${totalCoupons}`
        )
      }
    }

    setCoupons(response.data.data)
    setLoading(false)
  }

  async function GetCouponsPrev() {
    const { '@hylex/token': token } = parseCookies()

    const response = await api.get(
      `/admin/coupons/list?perPage=${5}&currentPage=${page - 1}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )

    if (response.data.pagination) {
      if (page - 1 === 1) {
        setTotalPage(Math.ceil(response.data.pagination.total / 5))
        setTotalCoupons(response.data.pagination.total)
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${response.data.pagination.total}`
        )
      } else {
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${totalCoupons}`
        )
      }
    }

    setCoupons(response.data.data)
  }

  async function GetCouponsNext() {
    const { '@hylex/token': token } = parseCookies()

    const response = await api.get(
      `/admin/coupons/list?perPage=${5}&currentPage=${page + 1}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )

    if (response.data.pagination) {
      if (page + 1 === 1) {
        setTotalPage(Math.ceil(response.data.pagination.total / 5))
        setTotalCoupons(response.data.pagination.total)
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${response.data.pagination.total}`
        )
      } else {
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${totalCoupons}`
        )
      }
    }

    setCoupons(response.data.data)
  }

  async function NewCoupon(data: any, allowedIn: any) {
    const { '@hylex/token': token } = parseCookies()

    const coupon = {
      name: data.name,
      percentage: parseInt(data.percentage.replace('%', '')),
      stock: parseInt(data.stock),
      allowedIn: allowedIn.length > 0 ? allowedIn.join(' | ') : 'all',
      endAt: data.endAt.replace(' -', '').replaceAll('/', '-')
    }

    const response = await api.post('/admin/coupons/create', coupon, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

    if (response.data.status === 200) {
      AlertSuccess(response.data.message)
      Router.push('/coupons')
    } else {
      AlertError(response.data.message)
    }
  }

  async function UpdateCoupon(uuid: any) {
    const { '@hylex/token': token } = parseCookies()

    const coupon = {
      CouponUUID: uuid
    }

    const response = await api.post('/admin/coupons/edit', coupon, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

    if (response.data.status === 200) {
      AlertSuccess(response.data.message)
      GetCoupons()
    } else {
      AlertError(response.data.message)
    }
  }

  async function DeleteCoupon(uuid: string) {
    const { '@hylex/token': token } = parseCookies()

    const response = await api.delete(
      `/admin/coupons/delete?CouponUUID=${uuid}`,
      {
        headers: { Authorization: 'Bearer ' + token }
      }
    )

    if (response.data.status === 200) AlertSuccess(response.data.message)
    if (response.data.status === 404) AlertError(response.data.message)

    GetCoupons()
  }

  async function GetAllProducts() {
    const { '@hylex/token': token } = parseCookies()

    const response = await api.get(`/admin/product/getAll`, {
      headers: { Authorization: 'Bearer ' + token }
    })

    if (response.data.status === 200) {
      const data: any = []

      response.data.data.forEach((i: any) => {
        data.push({ value: i.id, label: i.name })
      })

      setOptions(data)
    }
  }

  return (
    <CouponsContext.Provider
      value={{
        useLoading,
        GetCoupons,
        GetAllProducts,
        coupons,
        options,
        FromToTotal,
        NewCoupon,
        UpdateCoupon,
        DeleteCoupon,
        page,
        totalPage,
        nextPage,
        previousPage
      }}
    >
      {children}
    </CouponsContext.Provider>
  )
}
