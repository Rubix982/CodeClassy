import React from "react";

import styles from "@styles/Tabbar/navbar.module.css";

import InvitationModal from "./InvitationModal";

import { Grid } from "@mui/material";

export default function Navbar({
  linkToDashboardPage,
  linkToPeoplePage,
  isFeedPage, // Is this the feed (section) page?
  isPeoplePage, // is the tab selected for the 'people' view?
}) {
  // Get basic styles first for the dashboard and the people tab
  var dashboardTabStyling = `${styles.itemStyling}`;
  var dashboardTabTextStyling = `${styles.linkStyling}`;

  var peopleTabStyling = `${styles.itemStyling}`;
  var peopleTabTextStyling = `${styles.linkStyling}`;

  // If this is the people's tab ...
  if (isPeoplePage) {
    // ... Append the selected styles to the people tab
    peopleTabStyling += ` ${styles.selectedItemStyling}`;
    peopleTabTextStyling += ` ${styles.selectedItemTextStyling}`;
    dashboardTabTextStyling += ` ${styles.unSelectedItemTextStyling}`;
  } else {
    // ... Append the selected styles to the dashboard tab
    dashboardTabStyling += ` ${styles.selectedItemStyling}`;
    dashboardTabTextStyling += ` ${styles.selectedItemTextStyling}`;
    peopleTabTextStyling += ` ${styles.unSelectedItemTextStyling}`;
  }

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
            <div className={dashboardTabStyling}>
              <a className={dashboardTabTextStyling} href={linkToDashboardPage}>
                Dashboard
              </a>
            </div>
          </li>
          <li className={styles.liStyling}>
            <div className={peopleTabStyling}>
              <a className={peopleTabTextStyling} href={linkToPeoplePage}>
                People
              </a>
            </div>
          </li>
        </ul>
      </Grid>

      <Grid item xs={2}></Grid>

      <Grid item xs={2} className={styles.iconGridStyling}>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-start"
        >
          <Grid item>
            {isFeedPage && (
              <ul className={styles.ulStyling}>
                <InvitationModal />
              </ul>
            )}
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
  );
}
