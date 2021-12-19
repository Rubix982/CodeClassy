import React from "react";
import styles from "../styles/index.module.css";
import { Grid, Button } from '@mui/material';

export default function Index() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '90vh', minWidth: '100vw', flexDirection: "row", justifyContent: 'center' }}
    >

      <Grid item xs={4}>
        <div className={styles.mainCodeClassyTitle}>
          <p>Welcome To CodeClassy!</p>

        </div>

        <div className={styles.mainCodeClassyContent}>
          <p>The world's biggest learning platform! here.</p>

          <p>Get started today!</p>
        </div>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >

          <Grid item xs={4} alignItems="center" justifyContent="center" className={styles.actionButton}>
            <Grid item alignItems="center" justifyContent="center">
              <Button href="/login">
                <span className={styles.actionButtonContent}>Login</span>
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={4}>

          </Grid>

          <Grid item xs={4} className={styles.actionButton}>
            <Grid alignItems="center" justifyContent="center" >
              <Button href="/register">
                <span className={styles.actionButtonContent}>Register</span>
              </Button>
            </Grid>
          </Grid>

        </Grid>
      </Grid>

    </Grid>
  );
}