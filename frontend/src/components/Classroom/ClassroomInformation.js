import React, {useEffect} from 'react';

import styles from '@styles/Classroom/ClassroomInformation.module.css';

import CardMedia from './CardMedia';
import AddSection from './AddSection';
import { useRouter } from 'next/router';


// redux imports
import {getClassroomAction} from '../../../redux/actions/classroom.action';
import { connect } from "react-redux";

import {
    Grid
} from "@mui/material";


const ClassroomInformation = (props) => {

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        props.getClassroomAction(id);
      }, [router]); 

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            className={styles.classroomContentContainerStyling}
        >
            <Grid item xs={6} sx={{ width: "100%" }}>
                <div className={styles.backgroundContentContainer}>
                    <div
                        className={styles.backgroundStyling}
                    >
                        <div className={styles.headerContainer}>
                            <div className={styles.titleContainer}>
                                <span className={styles.classroomName}>
                                    {props.classroomInformation.name}
                                </span>

                                <span className={styles.teacherName}>
                                    {props.classroomInformation.createdBy}
                                </span>

                                <span className={styles.classroomDescription}>
                                {props.classroomInformation.description}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>

            <Grid item xs={2} className={styles.gridItemSpacing}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="stretch"
                    className={styles.gridContainerStyling}
                >
                    <Grid item>
                        <span className={styles.sectionStyling}>Sections</span>
                    </Grid>

                    <Grid item>
                        <AddSection />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={4} className={styles.gridItemSpacing}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="stretch"
                    className={styles.gridContainerStyling}
                >
                    {props.sections.map((i, index) => {
                        return (
                            <Grid item key={index}>
                                <CardMedia section={i.name} assignee={i.teacherEmail} />
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
        </Grid>
    )
}


const mapStateToProps = (state) => {
    return {
    classroomInformation: state.classroomReducer.classroomInformation,
    sections: state.classroomReducer.totalSections,
    responseMessage: state.apiReducer.responseMessage,
    successMessageSnackbar: state.apiReducer.successMessageSnackbar,
    errorMessageSnackbar: state.apiReducer.errorMessageSnackbar,
    };
  };
  
  export default connect(mapStateToProps, { getClassroomAction })(ClassroomInformation);