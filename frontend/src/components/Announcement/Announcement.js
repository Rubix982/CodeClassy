// Styling imports
import React from "react";

// NextJS imports
import Image from "next/image";
import { withRouter, useRouter } from "next/router";

// Styling imports
import PostStyling from "@styles/Post/Post.module.css";

// MUI imports
import {
  Grid,
  Avatar,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";

/// MUI Icon imports
import SendIcon from "@mui/icons-material/Send";

// Component imports
import SnackBarAlert from "@components/SnackBarAlert/SnackBarAlert";
import { StringAvatar } from "@components/Section/helper/StringHelpers";
import Moment from "moment";

// Redux imports
import {
  announcementPageLoadAction,
  commentAddition,
} from "redux/actions/announcement.action";
import { connect } from "react-redux";

// Asset imports
import announcementImage from "/public/assets/images/announcement.png";
import commentImage from "/public/assets/images/comment.png";

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

          <div className={PostStyling.postContent}>
            <p className={PostStyling.content}>{announcementContentBody}</p>
          </div>

          <div className={PostStyling.commentsContainer}>
            <div className={PostStyling.commentHeadingContainer}>
              <Image src={commentImage} height={30} width={28}></Image>
              <h1 className={PostStyling.commentHeading}>Comments</h1>
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
                          <SendIcon />
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
})(Post);
