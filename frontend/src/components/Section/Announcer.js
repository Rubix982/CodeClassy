import React from 'react';

import styles from '../../../styles/Section/Announcer.module.css';

import { Avatar } from '@mui/material';

import { deepPurple } from '@mui/material/colors';

export default function Announcer() {
    return (
        <div className={`${styles.announcerModuleStyling} ${styles.gridContentAlignStyling}`}>
            <Avatar sx={{ bgcolor: deepPurple[500], width: 48, height: 48}}>US</Avatar>
            <div className={styles.textContainerStyling}>
                <p className={styles.textStyling}>
                    <span className={styles.nameStyling}>
                        Unais Siddiqui
                    </span>
                </p>

                <p className={styles.textStyling}>
                    <span className={styles.dateStyling}>
                        Oct 26
                    </span>
                </p>
            </div>
        </div>
    )
}