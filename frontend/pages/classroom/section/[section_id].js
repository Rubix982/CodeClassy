import React from 'react';
import { useRouter } from 'next/router';

import styles from '../../../styles/Section/[section_id].module.css';

import Navbar from '../../../src/components/Navbar/Navbar';
import Announcement from '../../../src/components/Section/Announcement';

import {
    Grid
} from "@mui/material";

export default function Section() {

    const router = useRouter();
    const { section_id } = router.query;

    return (
        <div>
            <Navbar />
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                className={styles.sectionContentContainerStyling}
            >
                <Grid
                    item
                    xs={6}
                    className={styles.backgroundStyling}
                >
                    &nbsp;
                </Grid>

                <Grid
                    item
                    xs={6}
                >
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Announcement />
                        
                        <Announcement />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}