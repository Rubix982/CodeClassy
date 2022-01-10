import React from "react";
import styles from "@styles/Index/Index.module.css";
import { Grid, Button } from "@mui/material";

const MainContent = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{
        minHeight: "90vh",
        minWidth: "100vw",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Grid item xs={4} 
      style={{ 
        border: '1px solid #e0e0e0', 
        borderRadius: '2%',
        padding: '50px',
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'column'}}
      >
        <div className={styles.mainCodeClassyTitle} >
          <p>Welcome To Codeclassy!</p>
        </div>

        <div className={styles.mainCodeClassyContent}>
          <p>The world's biggest learning platform! here.</p>

          <p>Get started today!</p>
        </div>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-end"
          style={{ width: '80%', margin: '15px'}}
        >
          <Grid
            item
            xs={4}
            alignItems="center"
            justifyContent="center"
            className={styles.actionButton}
          >
            <Grid item alignItems="center" justifyContent="center">
              <Button href="/login">
                <span className={styles.actionButtonContent}>Login</span>
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={4}></Grid>

          <Grid item xs={4} className={styles.actionButton}>
            <Grid alignItems="center" justifyContent="center">
              <Button href="/register">
                <span className={styles.actionButtonContent}>Register</span>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainContent;
