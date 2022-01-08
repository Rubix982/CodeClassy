// React imports
import React from "react";

// Styling imports
import AnnounceSomethingStyling from "@styles/Section/AnnounceSomething.module.css";

// Material UI imports
import { Grid, Avatar } from "@mui/material";

// Component imports
import { StringAvatar } from "./helper/StringHelpers";

// Redux imports
import { authorizeUser } from "redux/actions/auth.action";
import { connect } from "react-redux";

function AnnounceSomething({
  authorizeUser,
  userFullName,
  postStateController,
}) {
  React.useEffect(() => {
    authorizeUser();
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      className={AnnounceSomethingStyling.boxContent}
      onClick={() => postStateController(true)}
    >
      <Grid item className={AnnounceSomethingStyling.itemPadding}>
        <Avatar
          className={AnnounceSomethingStyling.avatarStyling}
          {...StringAvatar(userFullName)}
        />
      </Grid>

      <Grid item className={AnnounceSomethingStyling.textAnnouncementStyling}>
        <span>Announce something to your class</span>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  userFullName: state.authReducer.userFullName,
});

export default connect(mapStateToProps, { authorizeUser })(AnnounceSomething);
