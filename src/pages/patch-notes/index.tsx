import { useContext, useEffect } from 'react'
import {
  FaChevronLeft,
  FaChevronRight,
  FaTrashAlt,
  FaEdit
} from 'react-icons/fa'

import { Layout } from '@components/utils/layout'
import { PatchNotesContext } from '@contexts/PatchNotesContext'
import { withSSRAdminPerm } from '@utils/withSSRAdminPerm'
import { AlertError } from '@hooks/useAlert'

interface PatchNoteInterface {
  id: number
  category: string
  description: string
  author: string
  version: string
  notes: string
}

export default function PatchNotes() {
  const {
    useLoading,
    patchNotes,
    GetPatchNotes,
    DeletePatchNote,
    page,
    totalPage,
    nextPage,
    previousPage,
    FromToTotal
  } = useContext(PatchNotesContext)

  useEffect(() => {
    GetPatchNotes()
  }, [])

  async function handleDelete(uuid: any) {
    try {
      await DeletePatchNote(uuid)
    } catch (err) {
      AlertError('Ocorreu um erro na requisição!')
    }
  }

  return (
    <Layout title="Patch Notes">
      <div className="flex flex-col justify-between space-y-10">
        <div className="items-center flex justify-between w-full">
          <a
            className="bg-color-info rounded font-bold hover:opacity-75 px-8 py-3 text-center text-white w-full lg:w-1/4"
            href="/patch-notes/new"
          >
            Novo Note
          </a>
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
        ) : patchNotes && patchNotes.length >= 1 ? (
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
                          Author
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                        >
                          Categoria (Versão)
                        </th>
                        <th scope="col" className="p-5 relative">
                          <span className="sr-only">Funções</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-foreground rounded-lg divide-foreground divide-y-8">
                      {patchNotes.map(
                        (patchNote: PatchNoteInterface, index: number) => {
                          return (
                            <tr key={index} className="bg-primary">
                              <td className="px-6 py-5 whitespace-nowrap">
                                <div className="items-center flex">
                                  <img
                                    src={
                                      patchNote.author.includes('*')
                                        ? `https://minotar.net/avatar/steve.png`
                                        : `https://minotar.net/avatar/${patchNote.author}.png`
                                    }
                                    alt="Coupon"
                                    className="rounded-full h-16 object-cover w-16"
                                  />
                                  <div className="ml-5">
                                    <p className="font-lg font-semibold text-color-light">
                                      {patchNote.author}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <p className="text-sm font-bold text-color-medium">
                                  {patchNote.category}{' '}
                                  <small className="font-light">
                                    ({patchNote.version})
                                  </small>
                                </p>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <div className="items-center flex justify-end space-x-5 w-full">
                                  <a
                                    href={`/patch-notes/update?id=${patchNote.id}`}
                                    className="text-xl focus:outline-none text-color-info"
                                  >
                                    <FaEdit />
                                  </a>
                                  <button
                                    onClick={() => handleDelete(patchNote.id)}
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
              Nenhuma note encontrada!
            </p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSSRAdminPerm(async () => {
  return { props: {} }
})
