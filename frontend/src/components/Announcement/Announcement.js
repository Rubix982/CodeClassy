// Styling imports
import React from "react";

// NextJS imports
import Image from "next/image";
import { useRouter } from "next/router";

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
  InputLabel,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

/// MUI Icon imports
import { DeleteForever, MoreVert, Send } from "@mui/icons-material";

// Component imports
import EditAnnouncement from "@components/Announcement/EditAnnouncement";
import SnackBarAlert from "@components/SnackBarAlert/SnackBarAlert";
import { StringAvatar } from "@components/Section/helper/StringHelpers";
import Navbar from "@components/Navbar/Navbar";
import Moment from "moment";

// Redux imports
import {
  updateAnnouncement,
  deleteAnnouncement,
  announcementPageLoadAction,
  commentAddition,
} from "redux/actions/announcement.action";
import { connect } from "react-redux";

// Asset imports
import announcementImage from "/public/assets/images/announcement.png";
import commentImage from "/public/assets/images/comment.png";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const options = [
  'Edit',
  'Delete'
]

const ITEM_HEIGHT = 48;

const MoreVertMenu = (props) => {
  const { sectionID } = useRouter().query;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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
        PaperProps={{
          elevation: 0,
          sx: {
            width: "110px",
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
          onClick={() => {
            props.deleteAnnouncement(props.announcementID, sectionID);
            handleClose();
          }}
          sx={{ justifyContent: "space-between" }}
        >
          <DeleteForever />
          Delete
        </MenuItem>
        <MenuItem sx={{ justifyContent: "space-between" }}>
          <EditAnnouncement
            announcementContentBody={props.announcementContentBody}
            announcementID={props.announcementID}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

const AnnouncementCommentMenu = (props) => {
  const { sectionID } = useRouter().query;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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
        PaperProps={{
          elevation: 0,
          sx: {
            width: "110px",
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
          onClick={() => {
            props.deleteAnnouncement(sectionID);
            handleClose();
          }}
          sx={{ justifyContent: "space-between" }}
        >
          <DeleteForever />
          Delete
        </MenuItem>
        <MenuItem sx={{ justifyContent: "space-between" }}>
          <EditAnnouncement
            announcementContentBody={props.announcementContentBody}
            announcementID={props.announcementID}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

const Post = ({
  comments,
  userRole,
  userFullName,
  announcementID,
  responseMessage,
  teacherFullName,
  commentAddition,
  deleteAnnouncement,
  updateAnnouncement,
  errorMessageSnackbar,
  successMessageSnackbar,
  announcementContentBody,
  announcementCreationDate,
  announcementPageLoadAction,
}) => {
  const [values, setValues] = React.useState({
    comment: "",
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const checkOption = (option) => {
    if(option == 'Delete'){
      
      console.log("Delete Called");
    }
    if(option == 'Edit'){
      
      console.log("Edit Called");
    }
    
  }
  const { id } = useRouter().query;

  React.useEffect(async () => {
    if (!id) {
      return;
    }
    await announcementPageLoadAction(id);
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

  console.log(comments)

  return (
    <>
      {successMessageSnackbar && (
        <SnackBarAlert severity={"success"} message={responseMessage} />
      )}

      {errorMessageSnackbar && (
        <SnackBarAlert severity={"error"} message={responseMessage} />
      )}

      <div>
        <Navbar />
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
          </div>

          {userRole == "Teacher" && (
            <div className={PostStyling.moreVertMenu}>
              <MoreVertMenu
                announcementContentBody={announcementContentBody}
                announcementID={announcementID}
                updateAnnouncement={updateAnnouncement}
                deleteAnnouncement={deleteAnnouncement}
              />
            </div>
          )}

          <div className={PostStyling.postContent}>
            <p className={PostStyling.content}>{announcementContentBody}</p>
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
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                    >
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
                      <div className={PostStyling.hamburger}>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                      <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        MenuListProps={{
                          'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                          },
                        }}
                      >
                        {options.map((option) => (
                          <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => { handleClose(), checkOption(option) }}>
                            {option}
                          </MenuItem>
                        ))}
                      </Menu>
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
    </>
  );
};

const mapStateToProps = (state) => ({
  responseMessage: state.apiReducer.responseMessage,
  successMessageSnackbar: state.apiReducer.successMessageSnackbar,
  errorMessageSnackbar: state.apiReducer.errorMessageSnackbar,
  userFullName: state.authReducer.userFullName,
  userRole: state.authReducer.userRole,
  teacherFullName: state.announcementReducer.teacherFullName,
  announcementID: state.announcementReducer.announcementID,
  announcementCreationDate: state.announcementReducer.announcementCreationDate,
  announcementContentBody: state.announcementReducer.announcementContentBody,
  comments: state.announcementReducer.announcementComments,
});

export default connect(mapStateToProps, {
  announcementPageLoadAction,
  commentAddition,
  deleteComment,
  updateAnnouncement,
  deleteAnnouncement,
})(Post);
