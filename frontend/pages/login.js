import LoginForm from "@components/LoginForm/LoginForm";
import Head from "next/head";
import ForwardAuthenticated from "@components/Auth/forward-authenticated";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/assets/images/vercel.svg" />
      </Head>
      <ForwardAuthenticated>
        <LoginForm />
      </ForwardAuthenticated>
    </>
  );
}
