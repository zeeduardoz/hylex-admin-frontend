import { useContext, useEffect, useState } from 'react'
import {
  FaChevronLeft,
  FaEdit,
  FaTrashAlt,
  FaChevronRight,
  FaSearch
} from 'react-icons/fa'

import { Layout } from '@components/utils/layout'
import { ProductsContext } from '@contexts/ProductsContext'
import { withSSRAdminPermFull } from '@utils/withSSRAdminPermFull'
import { AlertError } from '@hooks/useAlert'

interface ProductInterface {
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

export default function Products() {
  const [search, setSearch] = useState('')
  const {
    useLoading,
    products,
    DeleteProduct,
    GetProducts,
    page,
    totalPage,
    nextPage,
    previousPage,
    FromToTotal,
    FilterProducts
  } = useContext(ProductsContext)

  useEffect(() => {
    GetProducts()
  }, [])

  async function handleDelete(id: number) {
    try {
      await DeleteProduct(id)
    } catch (err) {
      AlertError('Ocorreu um erro na requisição!')
    }
  }

  async function handleSearch() {
    try {
      await FilterProducts(search)
    } catch (err) {
      AlertError('Ocorreu um erro na requisição!')
    }
  }

  return (
    <Layout title="Produtos">
      <div className="flex flex-col justify-between space-y-10">
        <div className="items-center flex justify-between w-full">
          <a
            className="bg-color-info rounded font-bold hover:opacity-75 px-8 py-3 text-center text-white w-full lg:w-1/4"
            href="/products/new"
          >
            Novo Produto
          </a>
          <div className="item-center flex w-full lg:w-1/3">
            <input
              defaultValue=""
              type="text"
              name="search"
              onChange={e => setSearch(e.target.value)}
              placeholder="Digite o nome do produto?"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            <button
              className="bg-color-info text-xl focus:outline-none px-5"
              onClick={() => handleSearch()}
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {useLoading ? (
          <div className="flex flex-col mt-2 space-y-2">
            <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
            <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
            <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
            <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
            <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
            <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
            <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
          </div>
        ) : products && products.length >= 1 ? (
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden sm:rounded-lg">
                  <table className="divide-foreground divide-y-8 min-w-full">
                    <thead className="bg-primary">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                        >
                          Produto
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                        >
                          Preço Antigo
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                        >
                          Preço Atual
                        </th>
                        <th scope="col" className="p-5 relative">
                          <span className="sr-only">Funções</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-foreground rounded-lg divide-foreground divide-y-8">
                      {products.map(
                        (product: ProductInterface, index: number) => {
                          return (
                            <tr key={index} className="bg-primary">
                              <td className="px-6 py-5 whitespace-nowrap">
                                <div className="items-center flex">
                                  <img
                                    src={product.images[0]}
                                    alt="Product IMG"
                                    className="h-16 object-cover w-16"
                                  />
                                  <div className="ml-5">
                                    <p className="font-semibold text-color-light">
                                      {product.name}
                                    </p>
                                    <p className="text-sm font-light -mt-1 text-color-medium">
                                      Categoria: {product.category}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <p className="text-lg font-light text-color-warning line-through">
                                  R$ {product.oldPrice}
                                </p>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <p className="text-lg font-light text-color-success">
                                  R$ {product.newPrice}
                                </p>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <div className="items-center flex justify-end space-x-5 w-full">
                                  <a
                                    href={`/products/update?uuid=${product.uuid}`}
                                    className="text-xl focus:outline-none text-color-info"
                                  >
                                    <FaEdit />
                                  </a>
                                  <button
                                    onClick={() => handleDelete(product.id)}
                                    className="text-xl focus:outline-none text-color-danger"
                                  >
                                    <FaTrashAlt />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="items-center flex justify-center mt-5 space-x-10 lg:justify-end">
              <div className="text-sm font-light text-color-medium">
                <p>Página atual: {page}</p>
                <p>{FromToTotal}</p>
              </div>
              <div className="items-center flex justify-end">
                {page === 1 ? (
                  page === totalPage ? (
                    <>
                      <button
                        className="shadown-md bg-primary rounded-l-md focus:outline-none p-3 text-white"
                        disabled
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        disabled
                        className="shadown-md bg-primary rounded-r-md focus:outline-none p-3 text-white"
                      >
                        <FaChevronRight />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="shadown-md bg-primary rounded-l-md focus:outline-none p-3 text-white"
                        disabled
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        onClick={() => nextPage(page + 1)}
                        className="shadown-md bg-primary rounded-r-md focus:outline-none p-3 text-white"
                      >
                        <FaChevronRight />
                      </button>
                    </>
                  )
                ) : page === totalPage ? (
                  <>
                    <button
                      onClick={() => previousPage(page - 1)}
                      className="shadown-md bg-primary rounded-l-md focus:outline-none p-3 text-white"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      className="shadown-md bg-primary rounded-r-md focus:outline-none p-3 text-white"
                      disabled
                    >
                      <FaChevronRight />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => previousPage(page - 1)}
                      className="shadown-md bg-primary rounded-l-md focus:outline-none p-3 text-white"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={() => nextPage(page + 1)}
                      className="shadown-md bg-primary rounded-r-md focus:outline-none p-3 text-white"
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="items-center bg-primary rounded flex justify-center px-8 py-5 w-full">
            <p className="font-light text-color-medium">
              Nenhum produto Cadastrado!
            </p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSSRAdminPermFull(async () => {
  return { props: {} }
})
