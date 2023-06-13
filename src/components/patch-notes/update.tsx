import * as Yup from 'yup'
import { useContext, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { AlertError } from '@hooks/useAlert'
import { PatchNotesContext } from '@contexts/PatchNotesContext'

interface PatchNotes {
  id: number
  category: string
  author: string
  description: string
  version: string
  notes: string
}

export function UpdateForm(props: any) {
  const { useLoading, UpdatePatchNote } = useContext(PatchNotesContext)
  const [patchNote] = useState<PatchNotes>(props.props.patchNote)

  const schema = Yup.object().shape({
    category: Yup.string().required('Informe a categoria!'),
    description: Yup.string().required('Informe a descrição!'),
    version: Yup.string().required('Informe a versão!'),
    notes: Yup.string().required('Informe as notas!')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  async function handleUpdate(data: any) {
    try {
      const id = patchNote.id
      await UpdatePatchNote(id, data)
    } catch (err) {
      AlertError('Ocorreu um erro na requisição!')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <h1 className="text-2xl font-bold text-color-light">
        Informações do Patch Note
      </h1>
      <div className="items-start justify-between mt-5 w-full lg:flex lg:space-x-10">
        <div className="w-full lg:w-1/2">
          <div className="mt-3">
            <label htmlFor="category" className="block text-color-medium">
              Categoria
            </label>
            <input
              {...register('category')}
              defaultValue={patchNote.category}
              type="text"
              name="category"
              placeholder="Qual a categoria?"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            {errors.category && (
              <p className="text-sm py-1 text-red-400">
                {errors.category.message}
              </p>
            )}
          </div>
          <div className="mt-3">
            <label htmlFor="description" className="block text-color-medium">
              Descrição
            </label>
            <input
              {...register('description')}
              defaultValue={patchNote.description}
              type="text"
              name="description"
              placeholder="Qual a descrição?"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            {errors.description && (
              <p className="text-sm py-1 text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="mt-3">
            <label htmlFor="description" className="block text-color-medium">
              Versão
            </label>
            <input
              {...register('version')}
              defaultValue={patchNote.version}
              type="text"
              name="version"
              placeholder="Qual a versão?"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            {errors.version && (
              <p className="text-sm py-1 text-red-400">
                {errors.version.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="mt-3">
            <label htmlFor="notes" className="block text-color-medium">
              Notes
            </label>
            <textarea
              {...register('notes')}
              defaultValue={patchNote.notes}
              name="notes"
              rows={10}
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-2 text-color-light w-full"
            />
            {errors.notes && (
              <p className="text-sm py-1 text-red-400">
                {errors.notes.message}
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
          {!useLoading && <span>Atualizar</span>}
        </button>
      </div>
    </form>
  )
}
