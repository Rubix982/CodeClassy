import LoginForm from '@components/LoginForm/LoginForm'
import Head from 'next/head'

export default function Login() {
  return (
    <>
        <Head>
            <title>Login</title>
            <link rel="icon" href="/assets/images/vercel.svg" />
        </Head>
        <LoginForm/>
    </>
  )
}
