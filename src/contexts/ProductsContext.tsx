import Router from 'next/router'
import { createContext, useState } from 'react'
import { parseCookies } from 'nookies'

import { api } from '@services/apiClient'
import { AlertError, AlertSuccess } from '@hooks/useAlert'

type Products = {
  id: number
  uuid: string
  name: string
  category: string
  oldPrice: string
  newPrice: string
  highlight: string
  position: string
  images: string[]
}

type ProductsContextType = {
  products: Products[]
  page: number
  totalPage: number
  useLoading: boolean
  FromToTotal: string

  nextPage: (page: number) => void
  previousPage: (page: number) => void
  GetProducts: () => Promise<any>
  GetOneProduct: (uuid: string) => Promise<any>
  NewProduct: (data: any, lead: any, files: any) => Promise<any>
  UpdateProduct: (id: any, data: any, lead: any, files: any) => Promise<any>
  DeleteProduct: (data: any) => Promise<any>
  DeleteProductImg: (id: any, img: string) => Promise<any>
  FilterProducts: (data: any) => Promise<any>
}

export const ProductsContext = createContext({} as ProductsContextType)

export const ProductsProvider: React.FC = ({ children }: any) => {
  const [useLoading, setLoading] = useState(false)
  const [products, setProducts] = useState<Products[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(1)
  const [totalProducts, setTotalProducts] = useState<number>(0)
  const [FromToTotal, setFromToTotal] = useState<string>('')

  function nextPage(page: number) {
    setPage(page)
    GetProductsNext()
  }

  function previousPage(page: number) {
    setPage(page)
    GetProductsPrev()
  }

  async function GetProducts() {
    const { '@hylex/token': token } = parseCookies()

    setLoading(true)

    const response = await api.get(
      `/admin/product/getAll?perPage=${5}&currentPage=${page}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )

    if (response.data.pagination) {
      if (page === 1) {
        setTotalPage(Math.ceil(response.data.pagination.total / 5))
        setTotalProducts(response.data.pagination.total)
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${response.data.pagination.total}`
        )
      } else {
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${totalProducts}`
        )
      }
    }

    setProducts(response.data.data)
    setLoading(false)
  }

  async function GetProductsPrev() {
    const { '@hylex/token': token } = parseCookies()

    const response = await api.get(
      `/admin/product/getAll?perPage=${5}&currentPage=${page - 1}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )

    if (response.data.pagination) {
      if (page - 1 === 1) {
        setTotalPage(Math.ceil(response.data.pagination.total / 5))
        setTotalProducts(response.data.pagination.total)
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${response.data.pagination.total}`
        )
      } else {
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${totalProducts}`
        )
      }
    }

    setProducts(response.data.data)
  }

  async function GetProductsNext() {
    const { '@hylex/token': token } = parseCookies()

    const response = await api.get(
      `/admin/product/getAll?perPage=${5}&currentPage=${page + 1}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )

    if (response.data.pagination) {
      if (page + 1 === 1) {
        setTotalPage(Math.ceil(response.data.pagination.total / 5))
        setTotalProducts(response.data.pagination.total)
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${response.data.pagination.total}`
        )
      } else {
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${totalProducts}`
        )
      }
    }

    setProducts(response.data.data)
  }

  async function GetOneProduct(uuid: string) {
    const { '@hylex/token': token } = parseCookies()

    const response = await api.get(
      `/shopping/getProductsByUUID?productUUID=${uuid}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )

    if (response.data.status === 200) {
      return response.data
    } else {
      Router.push('/products')
    }
  }

  async function NewProduct(data: any, lead: any, files: any) {
    const { '@hylex/token': token } = parseCookies()

    const product = {
      name: data.name,
      description: JSON.stringify(lead),
      category: data.category,
      oldPrice: data.oldPrice.replace('R$', '').replace(' ', ''),
      newPrice: data.newPrice.replace('R$', '').replace(' ', ''),
      nameOnServer: data.nameOnServer,
      colorOnServer: data.colorOnServer,
      highlight: data.highlight,
      expiresTime: data.expiresTime,
      position: data.position
    }

    const response = await api.post('/admin/product/create', product, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

    if (response.data.status === 201) {
      files.forEach((file: any) => {
        const formData = new FormData()
        formData.append('file', file)

        api
          .post(
            `/admin/product/image/upload?productId=${response.data.data}`,
            formData,
            {
              headers: {
                'Content-Type': `multipart/form-data;`,
                Authorization: 'Bearer ' + token
              }
            }
          )
          .then(data => {
            console.log(data.data)
          })
      })
      AlertSuccess(response.data.message)
      Router.push('/products')
    } else {
      AlertError(response.data.message)
    }
  }

  async function UpdateProduct(id: any, data: any, lead: any, files: any) {
    const { '@hylex/token': token } = parseCookies()

    const product = {
      id,
      name: data.name,
      description: JSON.stringify(lead),
      category: data.category,
      oldPrice: data.oldPrice.replace('R$', '').replace(' ', ''),
      newPrice: data.newPrice.replace('R$', '').replace(' ', ''),
      nameOnServer: data.nameOnServer,
      colorOnServer: data.colorOnServer,
      highlight: data.highlight,
      expiresTime: data.expiresTime,
      position: data.position
    }

    const response = await api.post('/admin/product/edit', product, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

    if (response.data.status === 200) {
      files.forEach((file: any) => {
        const formData = new FormData()
        formData.append('file', file)

        api
          .post(`/admin/product/image/upload?productId=${id}`, formData, {
            headers: {
              'Content-Type': `multipart/form-data;`,
              Authorization: 'Bearer ' + token
            }
          })
          .then(data => {
            console.log(data.data)
          })
      })
      AlertSuccess(response.data.message)
      Router.push('/products')
    } else {
      AlertError(response.data.message)
    }
  }

  async function DeleteProduct(data: number) {
    const { '@hylex/token': token } = parseCookies()

    const response = await api.delete(`/admin/product/delete?id=${data}`, {
      headers: { Authorization: 'Bearer ' + token }
    })

    if (response.data.status === 200) AlertSuccess(response.data.message)
    if (response.data.status === 404) AlertError(response.data.message)

    GetProducts()
  }

  async function DeleteProductImg(id: any, img: string) {
    const { '@hylex/token': token } = parseCookies()

    const response = await api.delete(
      `/admin/product/image/remove?productId=${id}&Imagekey=${img}`,
      {
        headers: { Authorization: 'Bearer ' + token }
      }
    )

    if (response.data.status === 200) AlertSuccess(response.data.message)
    if (response.data.status === 404) AlertError(response.data.message)

    return response.data
  }

  async function FilterProducts(data: any) {
    const { '@hylex/token': token } = parseCookies()

    setLoading(true)

    const response = await api.post(
      `/shopping/getProductsByName`,
      { productName: data },
      {
        headers: { Authorization: 'Bearer ' + token }
      }
    )

    if (response.data.status === 200) {
      setProducts(response.data.data)
      setPage(1)
      setTotalPage(1)
      setTotalProducts(response.data.data.length)
      setFromToTotal(`Resultados encontrados: ${response.data.data.length}`)
    }

    setLoading(false)
  }

  return (
    <ProductsContext.Provider
      value={{
        useLoading,
        GetProducts,
        products,
        FromToTotal,
        GetOneProduct,
        NewProduct,
        UpdateProduct,
        DeleteProduct,
        DeleteProductImg,
        FilterProducts,
        page,
        totalPage,
        nextPage,
        previousPage
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
