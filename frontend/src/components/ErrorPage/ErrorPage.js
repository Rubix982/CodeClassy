// React imports
import React from "react";

// NextJS imports
import Error from "next/error";
import { useRouter } from "next/router";

// Styling imports
import ErrorPageStyling from "@styles/ErrorPage/ErrorPage.module.scss";

// MUI imports
import { Grid, Button } from "@mui/material";

const RedirectContent = ({ errorMessage }) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
      }}
      spacing={4}
    >
      <Grid item>
        <div className={ErrorPageStyling.title}>
          <p>
            {errorMessage != "" ? (
              <>{errorMessage}</>
            ) : (
              <>Page could not be found!</>
            )}
          </p>
        </div>
      </Grid>{" "}
      <Grid item>
        <div className={ErrorPageStyling.content}>
          <p>Did you lose your way?</p>

          <p>No worries, you can always go back</p>
        </div>
      </Grid>{" "}
      <Grid item>
        <Button
          variant="contained"
          href="/h"
          size="large"
          className={ErrorPageStyling.button}
        >
          Go back to the homepage
        </Button>
      </Grid>
    </Grid>
  );
};

const ErrorPage = ({}) => {
  const { errorMessage, errorCode } = useRouter().query;

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <>
      <RedirectContent errorMessage={errorMessage} />
    </>
  );
};

export default ErrorPage;
