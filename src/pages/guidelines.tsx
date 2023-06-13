import { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'

import { Layout } from '@components/utils/layout'
import { withSSRAdminPerm } from '@utils/withSSRAdminPerm'
import { editTerms, editRules } from '@hooks/useGuide'
import { AlertError, AlertSuccess, AlertWarn } from '@hooks/useAlert'
import { api } from '@services/apiClient'

export default function Guidelines(props: any) {
  const [initialRules, setInitialRules] = useState(props.data.rules)
  const [initialTerms, setInitialTerms] = useState(props.data.rules)
  const [terms, setTerms] = useState<string>(props.data.terms)
  const [rules, setRules] = useState<string>(props.data.rules)

  async function handleRules() {
    try {
      editRules(rules).then(response => {
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

  async function handleTerms() {
    try {
      editTerms(terms).then(response => {
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
    <Layout title="Diretrizes">
      <>
        <div className="bg-primary rounded-md my-5 p-8">
          <h1 className="text-xl font-bold mb-5 text-color-light">
            Regras do Servidor
          </h1>
          <Editor
            apiKey="3ladh1ccukce9mtvx9wy2tr6v8cqg7lh21046diaebsksu3k"
            value={initialRules}
            onInit={(evt, editor) => {
              setRules(editor.getContent())
            }}
            onEditorChange={(newValue, editor) => {
              setInitialRules(newValue)
              setRules(editor.getContent())
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
          <div className="items-center flex justify-end mt-5">
            <button
              onClick={() => handleRules()}
              className="items-center bg-color-success hover:bg-opacity-90 rounded shadow-md inline-flex float-right text-lg font-bold justify-center mt-5 focus:outline-none px-4 py-3 text-white duration-150 transition ease-in-out w-full lg:w-1/4"
            >
              Atualizar
            </button>
          </div>
        </div>
        <div className="bg-primary rounded-md my-5 p-8">
          <h1 className="text-xl font-bold mb-5 text-color-light">
            Termos do Servidor
          </h1>
          <Editor
            apiKey="3ladh1ccukce9mtvx9wy2tr6v8cqg7lh21046diaebsksu3k"
            value={initialTerms}
            onInit={(evt, editor) => {
              setTerms(editor.getContent({ format: 'text' }))
            }}
            onEditorChange={(newValue, editor) => {
              setInitialTerms(newValue)
              setTerms(editor.getContent({ format: 'text' }))
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
          <div className="items-center flex justify-end mt-5">
            <button
              onClick={() => handleTerms()}
              className="items-center bg-color-success hover:bg-opacity-90 rounded shadow-md inline-flex float-right text-lg font-bold justify-center mt-5 focus:outline-none px-4 py-3 text-white duration-150 transition ease-in-out w-full lg:w-1/4"
            >
              Atualizar
            </button>
          </div>
        </div>
      </>
    </Layout>
  )
}

export const getServerSideProps = withSSRAdminPerm(async () => {
  const response = await api.get(`/shopping/utils/getInfo`)
  return {
    props: {
      data: response.data.data
    }
  }
})
