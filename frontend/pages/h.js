import Head from "next/head";
import StudentHomePage from "@components/StudentHomePage/HomePage";
import TeacherHomePage from "@components/TeacherHomePage/HomePage";
import { connect } from "react-redux";
import EnsureAuthenticated from "@components/Auth/ensure-authenticated";

function Home({ userRole }) {
  return (
    <>
      <Head>
        <title>Classes</title>
        <meta name="description" content="Home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EnsureAuthenticated>
        {userRole === "Teacher" ? <TeacherHomePage /> : <StudentHomePage />}
      </EnsureAuthenticated>
    </>
  );
}

const mapStateToProps = (state) => ({
  userRole: state.authReducer.userRole,
});

export default connect(mapStateToProps, {})(Home);
