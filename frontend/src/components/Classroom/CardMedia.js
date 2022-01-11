// React imports
import React from "react";

// Styling imports
import CardMediaStyling from "@styles/Classroom/CardMedia.module.css";

// Component imports
import EditSection from "@components/Classroom/EditSection";

// MUI imports
import {
  Box,
  Card,
  Menu,
  Tooltip,
  MenuItem,
  IconButton,
  CardHeader,
  Typography,
  CardContent,
} from "@mui/material";

// MUI Icon imports
import { DeleteForever, MoreVert } from "@mui/icons-material";

// Redux imports
import { connect } from "react-redux";
import { deleteSection } from "redux/actions/classroom.action";

const MoreVertMenu = ({
  deleteSection,
  sectionID,
  sectionName,
  assignedTo,
}) => {
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
        <Tooltip title="Section settings">
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
              width: 32,
              height: 32,
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
          style={{
            justifyContent: "space-between",
          }}
          onClick={() => {
            deleteSection(sectionID);
            handleClose();
          }}
        >
          <DeleteForever />
          Delete
        </MenuItem>
        <MenuItem
          style={{
            justifyContent: "space-between",
          }}
        >
          <EditSection
            sectionID={sectionID}
            sectionName={sectionName}
            assignedTo={assignedTo}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

const CardMedia = ({ deleteSection, section }) => {
  const { ID, name, teacherEmail } = section;

  return (
    <Card variant="outlined" className={CardMediaStyling.cardStyling}>
      <CardHeader
        title={name}
        action={
          <div>
            <MoreVertMenu
              deleteSection={deleteSection}
              sectionID={ID}
              sectionName={name}
              assignedTo={teacherEmail}
            />
          </div>
        }
      />
      <CardContent className={CardMediaStyling.cardContentStyling}>
        <Typography variant="body2" color="text.secondary">
          Assigned to{" "}
          <a href={`mailto:${teacherEmail}`} style={{ textDecoration: "none" }}>
            {teacherEmail}
          </a>
        </Typography>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { deleteSection })(CardMedia);
