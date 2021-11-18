import React from 'react';

import styles from '../../../styles/Navbar/navbar.module.css';

import InvitationModal from './InvitationModal';

import { Grid } from "@mui/material";

export default function Navbar({ isFeedPage = false }) {
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
            {
              isFeedPage
              &&
              <ul className={styles.ulStyling}>
                <InvitationModal />
              </ul>
            }
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