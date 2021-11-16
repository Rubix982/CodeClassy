import React from 'react';

import { Grid } from "@mui/material";

import styles from '../../../styles/Navbar/invitationNavbar.module.css';

export default function InvitationNavbar() {
    return (
        <ul className={styles.ulStyling}>
            <Grid item xs={4}>
                <li className={styles.liStyling}>
                    <div className={`${styles.itemStyling} ${styles.selectedItemStyling}`}>
                        <div className={styles.selectedOptionForEmail}>
                            <a className={`${styles.linkStyling}`} href="#">Students</a>
                        </div>
                    </div>
                </li>
            </Grid>
            <Grid item xs={4}>
                <li className={styles.liStyling}>
                    <div className={styles.itemStyling}>
                        <a className={styles.linkStyling} style={{ color: "#5f6368" }} href="#">Coordinators</a>
                    </div>
                </li>
            </Grid>
            <Grid item xs={5}>
                <li className={styles.liStyling}>
                    <div className={styles.itemStyling}>
                        <a className={styles.linkStyling} style={{ color: "#5f6368" }} href="#">Teacher Assistants</a>
                    </div>
                </li>
            </Grid>
        </ul>
    )
}