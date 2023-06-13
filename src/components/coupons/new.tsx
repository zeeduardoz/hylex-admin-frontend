import * as Yup from 'yup'
import NumberFormat from 'react-number-format'
import { useState, useContext, useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { FaTrashAlt } from 'react-icons/fa'

import { AlertError } from '@hooks/useAlert'
import { CouponsContext } from '@contexts/CouponsContext'

export function NewForm() {
  const { useLoading, NewCoupon, GetAllProducts, options } =
    useContext(CouponsContext)

  const [allowedIn, setAllowedIn] = useState<any[]>([])

  useEffect(() => {
    GetAllProducts()
  }, [])

  const schema = Yup.object().shape({
    name: Yup.string().required('Informe o nome!'),
    percentage: Yup.string().required('Informe a porcentagem!'),
    endAt: Yup.string().required('Informe a data e hora')
  })

  const initialValues = {
    name: '',
    percentage: '',
    stock: '',
    allowedIn: '',
    endAt: ''
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  function addAllowedIn(value: any) {
    if (value === 'all') {
      setAllowedIn([])
    } else {
      setAllowedIn([...allowedIn, value])
    }
  }

  function removeAllowedIn(id: string) {
    setAllowedIn(allowedIn.filter(i => i !== `${id}`))
  }

  async function handleNew(data: any) {
    try {
      await NewCoupon(data, allowedIn)
    } catch (err) {
      AlertError('Ocorreu um erro na requisição!')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleNew)}>
      <h1 className="text-2xl font-bold text-color-light">
        Informações do Cupom
      </h1>
      <div className="items-start justify-between mt-5 w-full lg:flex lg:space-x-10">
        <div className="w-full lg:w-1/2">
          <div className="mt-3">
            <label htmlFor="name" className="block text-color-medium">
              Nome do Cupom
            </label>
            <input
              {...register('name')}
              defaultValue={initialValues.name}
              type="text"
              name="name"
              placeholder="Qual nome do cupom?"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            {errors.name && (
              <p className="text-sm py-1 text-red-400">{errors.name.message}</p>
            )}
          </div>
          <div className="mt-3">
            <label className="block text-color-medium">Porcentagem</label>
            <NumberFormat
              {...register('percentage')}
              value={initialValues.percentage}
              thousandSeparator={true}
              suffix={'%'}
              name="percentage"
              placeholder="Qual a porcentagem do cupom?"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            {errors.percentage && (
              <p className="text-sm py-1 text-red-400">
                {errors.percentage.message}
              </p>
            )}
          </div>
          <div className="mt-3">
            <label className="block text-color-medium">Data de expiração</label>
            <NumberFormat
              {...register('endAt')}
              value={initialValues.endAt}
              name="endAt"
              format="####/##/## - ##:##:##"
              mask="_"
              placeholder="Quando o cupom ira expirar?"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            {errors.endAt && (
              <p className="text-sm py-1 text-red-400">
                {errors.endAt.message}
              </p>
            )}
          </div>
          <div className="mt-3">
            <label className="block text-color-medium">Estoque</label>
            <NumberFormat
              {...register('stock')}
              value={initialValues.stock}
              thousandSeparator={true}
              name="stock"
              placeholder="Quantos cupons em estoque?"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            {errors.stock && (
              <p className="text-sm py-1 text-red-400">
                {errors.stock.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="mt-3">
            <label className="block text-color-medium">Habilitado em</label>
            <select
              {...register('allowedIn')}
              name="allowedIn"
              onChange={e => addAllowedIn(e.target.value)}
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            >
              <option value="all">Todos os Produtos</option>
              {options.map(c => {
                if (allowedIn.includes(`${c.value}`)) {
                  return (
                    <option
                      key={c.value}
                      className="text-gray-300"
                      value={c.value}
                      disabled
                    >
                      {c.label}
                    </option>
                  )
                } else {
                  return (
                    <option
                      key={c.value}
                      className="text-color-medium"
                      value={c.value}
                    >
                      {c.label}
                    </option>
                  )
                }
              })}
            </select>
            {errors.category && (
              <p className="text-sm py-1 text-red-400">
                {errors.category.message}
              </p>
            )}
          </div>
          <div className="mt-3">
            {allowedIn.length > 0 ? (
              options.map((i: any) => {
                if (allowedIn.includes(`${i.value}`)) {
                  return (
                    <p className="items-center bg-primary flex justify-between mt-1 px-4 py-2 text-color-medium">
                      {i.label}{' '}
                      <FaTrashAlt
                        className="cursor-pointer text-color-danger"
                        onClick={() => removeAllowedIn(i.value)}
                      />
                    </p>
                  )
                } else {
                  return <></>
                }
              })
            ) : (
              <p className="items-center bg-primary flex justify-between mt-1 px-4 py-2 text-color-medium">
                Todos os Produtos
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="items-center flex justify-end mt-10">
        <button
          type="submit"
          className="items-center bg-color-success hover:bg-opacity-90 rounded shadow-md inline-flex text-lg font-bold justify-center focus:outline-none px-4 py-3 text-white duration-150 transition ease-in-out w-full lg:w-1/4"
          disabled={useLoading}
        >
          {useLoading && (
            <svg
              className="animate-spin h-5 -ml-1 mr-3 text-white w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {useLoading && <span>Aguarde</span>}
          {!useLoading && <span>Cadastrar</span>}
        </button>
      </div>
    </form>
  )
}
