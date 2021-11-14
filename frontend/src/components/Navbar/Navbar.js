import React from 'react';

import styles from '../../../styles/Navbar/navbar.module.css';

import { Grid } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';

export default function Navbar() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      className={styles.navbarPaper}
    >
      <Grid item xs={4}>
        {/* Space */}
      </Grid>

      <Grid item xs={4}>
        <ul className={styles.ulStyling}>
          <li className={styles.liStyling}>
            <div className={`${styles.itemStyling} ${styles.selectedItemStyling}`}>
              <a className={styles.linkStyling} href="#">Dashboard</a>

            </div>
          </li>
          <li className={styles.liStyling}>
            <div className={styles.itemStyling}>
              <a className={styles.linkStyling} style={{ color: "#5f6368" }} href="#">People</a>
            </div>
          </li>
        </ul>
      </Grid>

      <Grid item xs={2}>

      </Grid>

      <Grid item xs={2} className={styles.iconGridStyling}>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-start"
        >
          <Grid item>
            <ul className={styles.ulStyling}>
              <li className={styles.iconStyling}>
                <div className={styles.itemStyling}>
                  <AddIcon />
                </div>
              </li>
            </ul>
          </Grid>
          <Grid item>
            <ul className={styles.ulStyling}>
              <li className={`${styles.iconStyling} ${styles.itemStyling}`}>
                <div className={`${styles.profileLogoStyling}`}>
                  <span className={styles.profileTextStyling}>SUI</span>
                </div>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}