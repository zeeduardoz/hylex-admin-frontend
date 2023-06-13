import * as Yup from 'yup'
import NumberFormat from 'react-number-format'
import { useState, useContext } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import {
  FaPlus,
  FaTrashAlt,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa'

import { AlertError } from '@hooks/useAlert'
import { ProductsContext } from '@contexts/ProductsContext'

export function NewForm() {
  const { useLoading, NewProduct } = useContext(ProductsContext)
  const [files, setFiles] = useState<any>([])
  const [todo, setTodo] = useState<any>([])
  const [desc, setDesc] = useState('')
  const [condition, setCondition] = useState('')

  const schema = Yup.object().shape({
    name: Yup.string().required('Informe o nome!'),
    category: Yup.string().required('Informe a categoria!'),
    oldPrice: Yup.string().required('Informe o preço!'),
    newPrice: Yup.string().required('Informe o preço!'),
    highlight: Yup.string().required('Informe o destaque!'),
    colorOnServer: Yup.string().required('Informe a cor no servidor!'),
    nameOnServer: Yup.string().required('Informe o nome no servidor!')
  })

  const initialValues = {
    name: '',
    category: '',
    newPrice: '0',
    oldPrice: '0',
    nameOnServer: '',
    colorOnServer: '',
    highlight: '',
    commandOnServer: '',
    position: '',
    expiresTime: ''
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  const handleFileInput = (e: any) => {
    const list = [...files, ...e.target.files]
    setFiles(list)
  }

  function handleRemoveFile(name: string) {
    setFiles(files.filter((file: any) => file.name !== name))
  }

  function handleTodoAdd() {
    const item = {
      desc,
      condition
    }

    if (!item.desc || item.desc.length >= 4 || item.condition !== '') {
      const list = [...todo, item]
      setTodo(list)
    }
  }

  function handleTodoRemove(id: any) {
    setTodo(todo.filter((item: any, index: number) => index !== id))
  }

  async function handleNew(data: any) {
    try {
      await NewProduct(data, todo, files)
    } catch (err) {
      AlertError('Ocorreu um erro na requisição!')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleNew)}>
      <h1 className="text-2xl font-bold text-color-light">
        Informações do Produto
      </h1>
      <div className="items-start justify-between mt-5 w-full lg:flex lg:space-x-10">
        <div className="w-full lg:w-1/2">
          <div className="mt-3">
            <label htmlFor="name" className="block text-color-medium">
              Nome do Produto
            </label>
            <input
              {...register('name')}
              defaultValue={initialValues.name}
              type="text"
              name="name"
              placeholder="Qual nome do Produto?"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            {errors.name && (
              <p className="text-sm py-1 text-red-400">{errors.name.message}</p>
            )}
          </div>
          <div className="mt-3">
            <label className="block text-color-medium">Categoria</label>
            <select
              {...register('category')}
              name="category"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            >
              <option value="" defaultChecked>
                Selecione a categoria
              </option>
              <option value="1" className="text-color-medium">
                Vips
              </option>
              <option className="text-color-medium" value="2">
                Cash
              </option>
              <option className="text-color-medium" value="3">
                Passe de Batalha
              </option>
              <option className="text-color-medium" value="6">
                Haven
              </option>
              <option className="text-color-medium" value="7">
                Companheiros
              </option>
              <option className="text-color-medium" value="8">
                Pacotes
              </option>
              <option className="text-color-medium" value="9">
                Nenhuma categoria
              </option>
            </select>
            {errors.category && (
              <p className="text-sm py-1 text-red-400">
                {errors.category.message}
              </p>
            )}
          </div>
          <div className="mt-3">
            <label className="block text-color-medium">Destaque</label>
            <select
              {...register('highlight')}
              name="highlight"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            >
              <option value="" defaultChecked>
                Selecione o destaque
              </option>
              <option value="1" className="text-color-medium">
                Com destaque
              </option>
              <option className="text-color-medium" value="0">
                Sem destaque
              </option>
            </select>
            {errors.highlight && (
              <p className="text-sm py-1 text-red-400">
                {errors.highlight.message}
              </p>
            )}
          </div>
          <div className="mt-3">
            <label className="block text-color-medium">Preço cortado</label>
            <NumberFormat
              {...register('oldPrice')}
              value={initialValues.oldPrice}
              thousandSeparator={true}
              prefix={'R$ '}
              name="oldPrice"
              placeholder="Preço cortado do Produto?"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            {errors.oldPrice && (
              <p className="text-sm py-1 text-red-400">
                {errors.oldPrice.message}
              </p>
            )}
          </div>
          <div className="mt-3">
            <label className="block text-color-medium">Preço atual</label>
            <NumberFormat
              {...register('newPrice')}
              value={initialValues.newPrice}
              thousandSeparator={true}
              prefix={'R$ '}
              name="newPrice"
              placeholder="Preço atual do Produto?"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            {errors.newPrice && (
              <p className="text-sm py-1 text-red-400">
                {errors.newPrice.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="mt-3">
            <label htmlFor="nameOnServer" className="block text-color-medium">
              Nome no Servidor
            </label>
            <input
              {...register('nameOnServer')}
              defaultValue={initialValues.nameOnServer}
              type="text"
              name="nameOnServer"
              placeholder="Qual nome do produto no Servidor?"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            {errors.nameOnServer && (
              <p className="text-sm py-1 text-red-400">
                {errors.nameOnServer.message}
              </p>
            )}
          </div>
          <div className="mt-3">
            <label htmlFor="colorOnServer" className="block text-color-medium">
              Cor no Servidor
            </label>
            <input
              {...register('colorOnServer')}
              defaultValue={initialValues.colorOnServer}
              type="text"
              name="colorOnServer"
              placeholder="Qual a cor do produto no Servidor?"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            {errors.colorOnServer && (
              <p className="text-sm py-1 text-red-400">
                {errors.colorOnServer.message}
              </p>
            )}
          </div>
          <div className="mt-3">
            <label
              htmlFor="commandOnServer"
              className="block text-color-medium"
            >
              Comando no Servidor
            </label>
            <input
              {...register('commandOnServer')}
              defaultValue={initialValues.commandOnServer}
              type="text"
              name="commandOnServer"
              placeholder="Qual comando do produto no Servidor?"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="position" className="block text-color-medium">
              Posição do Produto
            </label>
            <input
              {...register('position')}
              defaultValue={initialValues.position}
              type="text"
              name="position"
              placeholder="Qual a posição de Ordenação?"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="expiresTime" className="block text-color-medium">
              Tempo de Expiração
            </label>
            <input
              {...register('expiresTime')}
              defaultValue={initialValues.expiresTime}
              type="text"
              name="expiresTime"
              placeholder="Qual o tempo de expiração do Produto?"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mt-14 text-color-light">
        Vantagens do Produto
      </h1>
      <div className="items-start justify-between mt-5 w-full lg:flex lg:space-x-10">
        <div className="flex mt-4 w-full lg:w-1/2">
          <input
            defaultValue=""
            type="text"
            name="lead-desc"
            id="lead-desc"
            placeholder="Qual a vantagem?"
            onChange={e => setDesc(e.target.value)}
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          />
          <select
            id="lead-condition"
            name="lead-condition"
            onChange={e => setCondition(e.target.value)}
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
          >
            <option value="" defaultChecked>
              Selecione a condição
            </option>
            <option value="1" className="text-color-medium">
              Possui
            </option>
            <option className="text-color-medium" value="0">
              Não Possui
            </option>
          </select>
          <a
            onClick={handleTodoAdd}
            className="border-color-success border-b-2 hover:opacity-75 px-6 py-3 text-color-success"
          >
            <FaPlus />
          </a>
        </div>
        <div className="grid mt-4 w-full lg:grid-cols-2 lg:w-1/2">
          {todo ? (
            Array.from(todo).map((item: any, index) => {
              return (
                <div
                  className="items-center bg-primary rounded flex justify-between m-2 p-3 space-x-3"
                  key={index}
                >
                  {item.condition === '1' ? (
                    <FaCheckCircle className="text-color-success" />
                  ) : (
                    <FaTimesCircle className="text-color-medium" />
                  )}
                  <p className="text-sm text-color-medium w-3/4">{item.desc}</p>
                  <button
                    onClick={() => handleTodoRemove(index)}
                    className="hover:opacity-75 focus:outline-none text-color-danger"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              )
            })
          ) : (
            <></>
          )}
        </div>
      </div>
      <h1 className="text-2xl font-bold mt-14 text-color-light">
        Imagens do Produto
      </h1>
      <div className="border-color-medium rounded-md border-dashed border mt-5 relative">
        <input
          type="file"
          multiple
          onChange={handleFileInput}
          className="cursor-pointer block h-full opacity-0 p-5 relative w-full z-50"
        />
        <div className="left-0 right-0 top-0 m-auto p-10 absolute text-center">
          <p className="text-color-medium">
            Arraste e solte os arquivos aqui para dentro ou clique para
            selecionar!
          </p>
        </div>
        <div className="items-center flex justify-center w-full">
          <div className="p-10">
            <p className="font-semibold text-color-light">
              Arquivos selecionados: {files.length}
            </p>
            {files ? (
              Array.from(files).map((file: any) => {
                return (
                  <div
                    className="text-sm font-light my-2 text-color-medium"
                    key={file.name}
                  >
                    {file.name}
                    <button
                      className="ml-3 hover:opacity-75 focus:outline-none text-color-danger"
                      onClick={() => handleRemoveFile(file.name)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                )
              })
            ) : (
              <></>
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
