import * as Yup from 'yup'
import { useContext, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'

import { AlertError } from '@hooks/useAlert'
import { NewsContext } from '@contexts/NewsContext'

export function UpdateForm(props: any) {
  const { useLoading, UpdateNews } = useContext(NewsContext)

  const [initialDescription, setInitialDescription] = useState(
    props.props.news.description
  )
  const [description, setDescription] = useState(props.props.news.description)

  const schema = Yup.object().shape({
    title: Yup.string().required('Informe o título!'),
    highlight: Yup.string().required('Informe o destaque!')
  })

  const initialValues = {
    title: props.props.news.title,
    highlight: props.props.news.highlight
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  async function handleUpdate(data: any) {
    try {
      const uuid = props.props.news.uuid
      await UpdateNews(uuid, data, description)
    } catch (err) {
      AlertError('Ocorreu um erro na requisição!')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <h1 className="text-2xl font-bold text-color-light">
        Informações da Notícia
      </h1>
      <div className="mt-5 w-full">
        <div className="items-start justify-between w-full lg:flex lg:space-x-10">
          <div className="mt-3 w-full">
            <label htmlFor="title" className="block text-color-medium">
              Título
            </label>
            <input
              {...register('title')}
              defaultValue={initialValues.title}
              type="text"
              name="title"
              placeholder="Qual o título?"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            />
            {errors.title && (
              <p className="text-sm py-1 text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="mt-3 w-full">
            <label className="block text-color-medium">Destaque</label>
            <select
              {...register('highlight')}
              name="highlight"
              className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-1 outline-none px-4 py-3 text-color-light w-full"
            >
              {initialValues.highlight === '1' ? (
                <>
                  <option value="1" className="text-color-medium" selected>
                    Com destaque
                  </option>
                  <option className="text-color-medium" value="0">
                    Sem destaque
                  </option>
                </>
              ) : (
                <>
                  <option value="1" className="text-color-medium">
                    Com destaque
                  </option>
                  <option className="text-color-medium" value="0" selected>
                    Sem destaque
                  </option>
                </>
              )}
            </select>
            {errors.highlight && (
              <p className="text-sm py-1 text-red-400">
                {errors.highlight.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-10 w-full">
          <div className="mt-3">
            <label
              htmlFor="description"
              className="block mb-2 text-color-medium"
            >
              Descrição
            </label>
            <Editor
              apiKey="3ladh1ccukce9mtvx9wy2tr6v8cqg7lh21046diaebsksu3k"
              value={initialDescription}
              onInit={(evt, editor) => {
                setDescription(editor.getContent())
              }}
              onEditorChange={(newValue, editor) => {
                setInitialDescription(newValue)
                setDescription(editor.getContent())
              }}
              init={{
                height: 500,
                themes: 'modern',
                plugins:
                  'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help emoticons',
                toolbar:
                  'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat emoticons',
                image_advtab: true,
                content_css: [
                  '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                  '//fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1'
                ],
                content_style:
                  "@import url('https://fonts.googleapis.com/css2?family=Lato:wght@900&family=Roboto&display=swap'); body { font-family: 'Roboto', sans-serif; } h1,h2,h3,h4,h5,h6 { font-family: 'Lato', sans-serif; }",
                font_formats:
                  'Arial Black=arial black,avant garde; Courier New=courier new,courier; Lato Black=lato; Roboto=roboto; Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats'
              }}
            />
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
