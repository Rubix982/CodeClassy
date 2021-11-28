import RegisterForm from '@components/RegisterForm/RegisterForm'
import Head from 'next/head'

export default function Register() {
  return (
    <>
        <Head>
            <title>Register</title>
            <link rel="icon" href="/assets/images/vercel.svg" />
        </Head>
        <RegisterForm/>
    </>
  )
}
