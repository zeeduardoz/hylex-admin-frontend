import { useForm } from 'react-hook-form'

import { Layout } from '@components/utils/layout'
import { AlertError, AlertWarn, AlertSuccess } from '@hooks/useAlert'
import { withSSRAdminPermFull } from '@utils/withSSRAdminPermFull'
import { oneUtil, twoUtil, threeUtil, editHeader } from '@hooks/useConfig'
import { api } from '@services/apiClient'
import { useEffect, useState } from 'react'

type UtilsInfo = {
  storeHeaderLine: string
  storeImageOne: string
  storeLinkImageOne: string
  storeImageTwo: string
  storeLinkImageTwo: string
  storeImageThree: string
  storeLinkImageThree: string
}

export default function Config() {
  const [useInfo, setInfo] = useState<UtilsInfo>()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    api.get(`/shopping/utils/getInfo`).then(response => {
      setInfo(response.data.data)
    })
  }, [])

  const updateUtilsOne = (data: any) => {
    try {
      oneUtil(data).then(response => {
        if (response.status === 200) {
          AlertSuccess(response.message)
        } else {
          AlertWarn(response.message)
        }
      })
    } catch (err) {
      console.log(err)
      AlertError('Ocorreu um erro na requisição!')
    }
  }

  const updateUtilsTwo = (data: any) => {
    try {
      twoUtil(data).then(response => {
        if (response.status === 200) {
          AlertSuccess(response.message)
        } else {
          AlertWarn(response.message)
        }
      })
    } catch (err) {
      console.log(err)
      AlertError('Ocorreu um erro na requisição!')
    }
  }

  const updateUtilsThree = (data: any) => {
    try {
      threeUtil(data).then(response => {
        if (response.status === 200) {
          AlertSuccess(response.message)
        } else {
          AlertWarn(response.message)
        }
      })
    } catch (err) {
      console.log(err)
      AlertError('Ocorreu um erro na requisição!')
    }
  }

  const updateUtilsHeader = (data: any) => {
    try {
      editHeader(data).then(response => {
        if (response.status === 200) {
          AlertSuccess(response.message)
        } else {
          AlertWarn(response.message)
        }
      })
    } catch (err) {
      console.log(err)
      AlertError('Ocorreu um erro na requisição!')
    }
  }

  return (
    <Layout title="Configurações">
      <div className="grid lg:grid-cols-2">
        <div className="bg-primary rounded-md m-2 p-8">
          <h1 className="text-xl font-bold text-color-light">
            #Header Loja Content
          </h1>
          <form onSubmit={handleSubmit(updateUtilsHeader)}>
            <div className="mt-3">
              <input
                defaultValue={useInfo?.storeHeaderLine}
                {...register('headerContent', { required: true })}
                className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
              />

              {errors.headerContent?.type === 'required' && (
                <p className="text-sm py-1 text-red-400">
                  Este campo e requerido!
                </p>
              )}
            </div>
            <button className="items-center bg-color-success hover:bg-opacity-90 rounded shadow-md inline-flex float-right text-lg font-bold justify-center mt-5 focus:outline-none px-4 py-3 text-white duration-150 transition ease-in-out w-full lg:w-1/4">
              Atualizar
            </button>
          </form>
        </div>
        <div className="bg-primary rounded-md m-2 p-8">
          <h1 className="text-xl font-bold text-color-light">
            #1 Loja Content
          </h1>
          <form onSubmit={handleSubmit(updateUtilsOne)}>
            <div className="mt-3">
              <input
                defaultValue={useInfo?.storeImageOne}
                {...register('imageOne', { required: true })}
                className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
              />

              {errors.imageOne?.type === 'required' && (
                <p className="text-sm py-1 text-red-400">
                  Este campo e requerido!
                </p>
              )}
            </div>
            <div className="mt-3">
              <input
                defaultValue={useInfo?.storeLinkImageOne}
                {...register('linkOne', { required: true })}
                className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
              />

              {errors.linkOne?.type === 'required' && (
                <p className="text-sm py-1 text-red-400">
                  Este campo e requerido!
                </p>
              )}
            </div>
            <button className="items-center bg-color-success hover:bg-opacity-90 rounded shadow-md inline-flex float-right text-lg font-bold justify-center mt-5 focus:outline-none px-4 py-3 text-white duration-150 transition ease-in-out w-full lg:w-1/4">
              Atualizar
            </button>
          </form>
        </div>
        <div className="bg-primary rounded-md m-2 p-8">
          <h1 className="text-xl font-bold text-color-light">
            #2 Loja Content
          </h1>
          <form onSubmit={handleSubmit(updateUtilsTwo)}>
            <div className="mt-3">
              <input
                defaultValue={useInfo?.storeImageTwo}
                {...register('imageTwo', { required: true })}
                className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
              />

              {errors.imageTwo?.type === 'required' && (
                <p className="text-sm py-1 text-red-400">
                  Este campo e requerido!
                </p>
              )}
            </div>
            <div className="mt-3">
              <input
                defaultValue={useInfo?.storeLinkImageTwo}
                {...register('linkTwo', { required: true })}
                className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
              />

              {errors.linkTwo?.type === 'required' && (
                <p className="text-sm py-1 text-red-400">
                  Este campo e requerido!
                </p>
              )}
            </div>
            <button className="items-center bg-color-success hover:bg-opacity-90 rounded shadow-md inline-flex float-right text-lg font-bold justify-center mt-5 focus:outline-none px-4 py-3 text-white duration-150 transition ease-in-out w-full lg:w-1/4">
              Atualizar
            </button>
          </form>
        </div>
        <div className="bg-primary rounded-md m-2 p-8">
          <h1 className="text-xl font-bold text-color-light">
            #3 Loja Content
          </h1>
          <form onSubmit={handleSubmit(updateUtilsThree)}>
            <div className="mt-3">
              <input
                defaultValue={useInfo?.storeImageThree}
                {...register('imageThree', { required: true })}
                className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
              />

              {errors.imageThree?.type === 'required' && (
                <p className="text-sm py-1 text-red-400">
                  Este campo e requerido!
                </p>
              )}
            </div>
            <div className="mt-3">
              <input
                defaultValue={useInfo?.storeLinkImageThree}
                {...register('linkThree', { required: true })}
                className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
              />

              {errors.linkThree?.type === 'required' && (
                <p className="text-sm py-1 text-red-400">
                  Este campo e requerido!
                </p>
              )}
            </div>
            <button className="items-center bg-color-success hover:bg-opacity-90 rounded shadow-md inline-flex float-right text-lg font-bold justify-center mt-5 focus:outline-none px-4 py-3 text-white duration-150 transition ease-in-out w-full lg:w-1/4">
              Atualizar
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSSRAdminPermFull(async () => {
  return { props: {} }
})
