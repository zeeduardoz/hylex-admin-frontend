import Router from 'next/router'
import { createContext, useState } from 'react'
import { parseCookies } from 'nookies'

import { api } from '@services/apiClient'
import { AlertError, AlertSuccess } from '@hooks/useAlert'

type PatchNote = {
  id: number
  category: string
  description: string
  author: string
  version: string
  notes: string
}

type PatchNotesContextType = {
  patchNotes: PatchNote[]
  page: number
  totalPage: number
  useLoading: boolean
  FromToTotal: string

  nextPage: (page: number) => void
  previousPage: (page: number) => void
  GetPatchNotes: () => Promise<any>
  NewPatchNote: (data: any) => Promise<any>
  UpdatePatchNote: (id: any, data: any) => Promise<any>
  DeletePatchNote: (data: any) => Promise<any>
}

export const PatchNotesContext = createContext({} as PatchNotesContextType)

export const PatchNotesProvider: React.FC = ({ children }: any) => {
  const [useLoading, setLoading] = useState(false)
  const [patchNotes, setPatchNotes] = useState<PatchNote[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(1)
  const [totalPatchNotes, setTotalPatchNotes] = useState<number>(0)
  const [FromToTotal, setFromToTotal] = useState<string>('')

  function nextPage(page: number) {
    setPage(page)
    GetPatchNotesNext()
  }

  function previousPage(page: number) {
    setPage(page)
    GetPatchNotesPrev()
  }

  async function GetPatchNotes() {
    const { '@hylex/token': token } = parseCookies()

    setLoading(true)

    const response = await api.get(
      `/admin/pathNotes/list?perPage=${5}&currentPage=${page}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )

    if (response.data.pagination) {
      if (page === 1) {
        setTotalPage(Math.ceil(response.data.pagination.total / 5))
        setTotalPatchNotes(response.data.pagination.total)
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${response.data.pagination.total}`
        )
      } else {
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${totalPatchNotes}`
        )
      }
    }

    setPatchNotes(response.data.data)
    setLoading(false)
  }

  async function GetPatchNotesPrev() {
    const { '@hylex/token': token } = parseCookies()

    const response = await api.get(
      `/admin/pathNotes/list?perPage=${5}&currentPage=${page - 1}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )

    if (response.data.pagination) {
      if (page - 1 === 1) {
        setTotalPage(Math.ceil(response.data.pagination.total / 5))
        setTotalPatchNotes(response.data.pagination.total)
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${response.data.pagination.total}`
        )
      } else {
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${totalPatchNotes}`
        )
      }
    }

    setPatchNotes(response.data.data)
  }

  async function GetPatchNotesNext() {
    const { '@hylex/token': token } = parseCookies()

    const response = await api.get(
      `/admin/pathNotes/list?perPage=${5}&currentPage=${page + 1}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )

    if (response.data.pagination) {
      if (page + 1 === 1) {
        setTotalPage(Math.ceil(response.data.pagination.total / 5))
        setTotalPatchNotes(response.data.pagination.total)
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${response.data.pagination.total}`
        )
      } else {
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${totalPatchNotes}`
        )
      }
    }

    setPatchNotes(response.data.data)
  }

  async function NewPatchNote(data: any) {
    const { '@hylex/token': token } = parseCookies()

    const patchNote = {
      category: data.category,
      description: data.description,
      author: data.author,
      version: data.version,
      notes: data.notes
    }

    const response = await api.post('/admin/pathNotes/create', patchNote, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

    if (response.data.status === 200) {
      AlertSuccess(response.data.message)
      Router.push('/patch-notes')
    } else {
      AlertError(response.data.message)
    }
  }

  async function UpdatePatchNote(id: any, data: any) {
    const { '@hylex/token': token } = parseCookies()

    const patchNote = {
      id,
      category: data.category,
      description: data.description,
      version: data.version,
      notes: data.notes
    }

    const response = await api.post('/admin/pathNotes/edit', patchNote, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

    if (response.data.status === 200) {
      AlertSuccess(response.data.message)
      Router.push('/patch-notes')
    } else {
      AlertError(response.data.message)
    }
  }

  async function DeletePatchNote(data: number) {
    const { '@hylex/token': token } = parseCookies()

    const response = await api.delete(`/admin/pathNotes/delete?id=${data}`, {
      headers: { Authorization: 'Bearer ' + token }
    })

    if (response.data.status === 200) AlertSuccess(response.data.message)
    if (response.data.status === 404) AlertError(response.data.message)

    GetPatchNotes()
  }

  return (
    <PatchNotesContext.Provider
      value={{
        useLoading,
        GetPatchNotes,
        patchNotes,
        FromToTotal,
        NewPatchNote,
        UpdatePatchNote,
        DeletePatchNote,
        page,
        totalPage,
        nextPage,
        previousPage
      }}
    >
      {children}
    </PatchNotesContext.Provider>
  )
}
