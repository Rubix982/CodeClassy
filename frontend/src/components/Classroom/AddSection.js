import React, {useState} from 'react';
import styles from '@styles/Classroom/AddSection.module.css';
import Image from 'next/image'
import AddImage from '../../../public/assets/images/add.png'
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


// redux imports
import { connect } from "react-redux";
import { createSectionAction } from '../../../redux/actions/classroom.action'

import {
    Box,
    Typography,
    Modal,
    TextField,
    FormControl,
    Button,
    Grid
} from '@mui/material';
import { withRouter } from 'next/router';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: '0px 4px 8px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '28px',
};

const AddSection = withRouter((props) => {

    const [open, setOpen] = useState(false);
    const [sectionName, setSectionName] = useState('');
    const [collaboratorsEmail, setCollaboratorsEmail] = useState('');
    const id = props.router.query.id;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const createSection = (event) => {
        event.preventDefault();
        const newSection = {
            name: sectionName,
            assignedTo: collaboratorsEmail
        }
        props.createSectionAction(newSection, id);
    }

    return (
        <>
            {props.successMessageSnackbar && (
            <Snackbar open={true} autoHideDuration={3000}>
                <Alert severity="success" sx={{ width: "100%" }}>
                    {props.responseMessage}
                </Alert>
            </Snackbar>
            )}

            {props.errorMessageSnackbar && (
            <Snackbar open={true} autoHideDuration={3000}>
                <Alert severity="error" sx={{ width: "100%" }}>
                    {props.responseMessage}
                </Alert>
            </Snackbar>
            )}

            <div style={{ display: 'flex' }}>
                <div className={styles.addSectionButtonStyling} onClick={handleOpen}>
                    <Button 
                    startIcon={<Image width={18} height={17} alt="Add" src={AddImage} />}
                    className={styles.addSectionStyling} 
                    variant="contained"> 
                        <b>Add</b>
                    </Button>
                </div>
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box sx={style} style={{ borderRadius: '10px', outline: 'none'}}>
                        <Typography variant="h6" component="h2" className={styles.typographyTextBox}>
                            <span className={styles.invitationText}>Create Section</span>
                        </Typography>
                        <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                        className={styles.formControlContainerStyling}
                        >
                            <FormControl className={styles.formControlStyling}>

                                <Grid item>
                                    <Typography id="modal-modal-name" sx={{ mt: 2 }}>
                                        <TextField
                                        className={styles.textFieldStyling}
                                        id="section-name"
                                        label="Name"
                                        value={sectionName}
                                        onChange={ e => setSectionName(e.target.value)}
                                        variant="standard"
                                        />
                                    </Typography>
                                </Grid>

                                <Grid item style={{paddingTop: "10px"}}>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        <TextField
                                            className={styles.textFieldStyling}
                                            id="coordinator-email-invite"
                                            label="Collaborator's Email"
                                            variant="standard"
                                            value={collaboratorsEmail}
                                            onChange={ e => setCollaboratorsEmail(e.target.value)}
                                        />
                                    </Typography>
                                </Grid>

                                <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="stretch"
                                style={{paddingTop: "30px"}}
                                >
                                    <Grid item>
                                        <Button
                                        variant="contained"
                                        onClick={createSection}
                                        className={styles.createButtonStyling}
                                        >
                                            Create
                                        </Button>
                                    </Grid>

                                    <Grid item>
                                        <Button
                                        variant="contained"
                                        className={styles.cancelButtonStyling}
                                        onClick={handleClose}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>

                                </Grid>
                                
                            </FormControl>
                        </Grid>
                    </Box>
                </Modal>
            </div>
        </>
    )
})


const mapStateToProps = (state) => {
    return {
        responseMessage: state.apiReducer.responseMessage,
        successMessageSnackbar: state.apiReducer.successMessageSnackbar,
        errorMessageSnackbar: state.apiReducer.errorMessageSnackbar,
    };
  };
  
export default connect(mapStateToProps, { createSectionAction })(AddSection);