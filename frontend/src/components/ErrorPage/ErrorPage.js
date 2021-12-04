import Error from 'next/error'

export default function ErrorPage({ errorCode, errorMessage }) {
    if (errorCode) {
      return <Error statusCode={errorCode} />
    }
    return <div> {errorMessage}</div>
  }