// Styling imports
import React from "react";

// NextJS imports
import Image from "next/image";
import { withRouter, useRouter } from "next/router";

// Styling imports
import PostStyling from "@styles/Post/Post.module.css";

// MUI imports
import {
  Box,
  Grid,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  TextField,
  InputLabel,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

/// MUI Icon imports
import { ModeEdit, DeleteForever, MoreVert, Send } from "@mui/icons-material";

import SaveAltIcon from "@mui/icons-material/SaveAlt";

// Component imports
import CustomTabs from "@components/MaterialCustomComponents/CustomTabs";
import SnackBarAlert from "@components/SnackBarAlert/SnackBarAlert";
import { StringAvatar } from "@components/Section/helper/StringHelpers";
import Moment from "moment";

// Redux imports
import {
  updateAnnouncement,
  deleteAnnouncement,
  announcementPageLoadAction,
  commentAddition,
} from "redux/actions/post.action";
import { connect } from "react-redux";

// Asset imports
import announcementImage from "/public/assets/images/announcement.png";
import commentImage from "/public/assets/images/comment.png";

const MoreVertMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { id } = useRouter().query;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Announcement options">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVert />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 40,
              height: 40,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => props.setReadOnlyText(false)}
          sx={{ justifyContent: "center" }}
        >
          <div style={{ marginRight: "10px" }}>
            <ModeEdit />
          </div>
          <span>Edit</span>
        </MenuItem>
        <MenuItem
          onClick={() => props.updateAnnouncement(id, props.textFieldContent)}
          sx={{ justifyContent: "center" }}
        >
          <div style={{ marginRight: "10px" }}>
            <SaveAltIcon />
          </div>
          <span>Save</span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.deleteAnnouncement(id);
          }}
          sx={{ justifyContent: "center" }}
        >
          <div style={{ marginRight: "10px" }}>
            <DeleteForever />
          </div>
          <span>Delete</span>
        </MenuItem>
      </Menu>
    </>
  );
};

const Post = ({
  successMessageSnackbar,
  errorMessageSnackbar,
  responseMessage,
  announcementPageLoadAction,
  commentAddition,
  userFullName,
  comments,
  teacherFullName,
  announcementCreationDate,
  announcementContentBody,
  router,
}) => {
  const [values, setValues] = React.useState({
    comment: "",
  });
  const [readOnlyText, setReadOnlyText] = React.useState(true);
  const [textFieldContent, setTextFieldContent] = React.useState(
    router.query.contentBody
  );
  const { id } = useRouter().query;

  React.useEffect(() => {
    if (!id) {
      return;
    }
    announcementPageLoadAction(id);
  }, [id]);

  const handleChange = (prop) => (event) => {
    setValues({ comment: event.target.value });
  };

  const handlePostComment = () => {
    commentAddition(id, { contentBody: values.comment });
    setValues({ comment: "" });
  };

  const handleMouseDownComment = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {successMessageSnackbar && (
        <SnackBarAlert severity={"success"} message={responseMessage} />
      )}

      {errorMessageSnackbar && (
        <SnackBarAlert severity={"error"} message={responseMessage} />
      )}

      <div>
        <div>
          <CustomTabs tabsData={[]} />
        </div>
        <div className={PostStyling.container}>
          <div className={PostStyling.postContainer}>
            <div className={PostStyling.postHeader}>
              <div className={PostStyling.imageContainer}>
                <Image src={announcementImage} height={70} width={70}></Image>
              </div>

            <div className={PostStyling.headingContainer}>
              <h1 className={PostStyling.heading}> Announcement </h1>
              <div className={PostStyling.teacherName}>
                {teacherFullName} •{" "}
                {Moment(announcementCreationDate).format("MMM DD, YYYY")}
              </div>
            </div>

            <div className={PostStyling.moreVertMenu}>
              <MoreVertMenu
                textFieldContent={textFieldContent}
                setReadOnlyText={setReadOnlyText}
                updateAnnouncement={updateAnnouncement}
                deleteAnnouncement={deleteAnnouncement}
              />
            </div>
          <div className={PostStyling.postContent}>
            <p className={PostStyling.content}>{announcementContentBody}</p>
          </div>

            <div className={PostStyling.postContent}>
              <TextField
                id="standard-textarea"
                label=" "
                placeholder="Announcement here"
                multiline
                variant="standard"
                defaultValue={textFieldContent}
                inputProps={{
                  maxLength: 255,
                }}
                InputProps={{
                  disableUnderline: true,
                  readOnly: readOnlyText,
                }}
                sx={{
                  margin: 0,
                }}
                onChange={() => {
                  setTextFieldContent(event.target.value);
                }}
                className={PostStyling.content}
              />
            </div>

            <div className={PostStyling.commentsContainer}>
              <div className={PostStyling.commentHeadingContainer}>
                <Image src={commentImage} height={30} width={28}></Image>
                <h1 className={PostStyling.commentHeading}>Comments</h1>
              </div>
            </div>

            <div className={PostStyling.commentsArray}>
              {comments &&
                comments.map((item, index) => {
                  return (
                    <div key={index} className={PostStyling.comment}>
                      <Avatar
                        sx={{ fontSize: "1rem" }}
                        aria-label="recipe"
                        {...StringAvatar(item.fullName)}
                      />

                      <div>
                        <h3 className={PostStyling.commenter}>
                          {item.fullName} •{" "}
                          {Moment(item.creationDate).format("MMM DD, YYYY")}
                        </h3>

                        <p style={{ marginLeft: "15px" }}>{item.contentBody}</p>
                      </div>
                    </div>
                  );
                })}
            </div>

              <div className={PostStyling.writeComment}>
                <Avatar
                  sx={{ fontSize: "1rem" }}
                  aria-label="recipe"
                  {...StringAvatar(userFullName)}
                />
                <Grid style={{ marginLeft: "15px" }} item xs={11}>
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-comment">
                      Comment
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-comment"
                      value={values.comment}
                      onChange={handleChange("comment")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle comment visibility"
                            onClick={handlePostComment}
                            onMouseDown={handleMouseDownComment}
                            edge="end"
                          >
                            <Send />
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Comment"
                    />
                  </FormControl>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  responseMessage: state.apiReducer.responseMessage,
  successMessageSnackbar: state.apiReducer.successMessageSnackbar,
  errorMessageSnackbar: state.apiReducer.errorMessageSnackbar,
  userFullName: state.authReducer.userFullName,
  teacherFullName: state.announcementReducer.teacherFullName,
  announcementCreationDate: state.announcementReducer.announcementCreationDate,
  announcementContentBody: state.announcementReducer.announcementContentBody,
  comments: state.announcementReducer.announcementComments,
});

export default connect(mapStateToProps, {
  announcementPageLoadAction,
  commentAddition,
  updateAnnouncement,
  deleteAnnouncement,
})(Post);
