// React imports
import React from "react";

// NextJS imports
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

// Styling imports
import SectionPageStyling from "@styles/Section/[id].module.scss";
import { styled } from "@mui/material/styles";

// MUI imports
import {
  Box,
  Tab,
  AppBar,
  Toolbar,
  Avatar,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { red } from "@mui/material/colors";

// Component imports
import SectionInformation from "@components/Section/SectionInformation";
import MembersView from "@components/MembersView/MembersView";
import InvitationModal from "@components/Navbar/InvitationModal";

// Redux imports
import { connect } from "react-redux";

// API imports
import { getSectionFeed } from "redux/actions/section.action";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: 0,
}));

function SectionPage({ userFullName, userRole, isAuthenticated, isLoading }) {
  const router = useRouter();
  const { section_id } = router.query;

  const [value, setValue] = React.useState("1");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <>
      <Head>
        <title>Section</title>
        <meta name="section page" content="Section page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TabContext value={value}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <StyledToolbar className={SectionPageStyling.appBarStyling}>
              <Link href="/h">
                <h1 className={SectionPageStyling.codeClassyStyling}>
                  CodeClassy
                </h1>
              </Link>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    centered
                  >
                    <Tab
                      label="Stream"
                      value="1"
                      className={SectionPageStyling.tabStyling}
                    />
                    <Tab
                      label="People"
                      value="2"
                      className={SectionPageStyling.tabStyling}
                    />
                  </TabList>
                </Box>
              </Box>

              {/* Only display the "Plus" modal if the role
              is that of a teacher */}
              {userRole === "Teacher" && (
                <Box>
                  <InvitationModal />
                </Box>
              )}

              <div>
                <Box>
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      className={SectionPageStyling.icon}
                    >
                      <Avatar
                        sx={{ bgcolor: red[500] }}
                        className={SectionPageStyling.icon}
                        {...stringAvatar(userFullName)}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  className={SectionPageStyling.avatarMenu}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Sign out
                  </MenuItem>
                </Menu>
              </div>
            </StyledToolbar>
          </AppBar>
        </Box>
        <TabPanel value="1" className={SectionPageStyling.tabPanelStyling}>
          <SectionInformation section={section_id} />
        </TabPanel>
        <TabPanel value="2" className={SectionPageStyling.tabPanelStyling}>
          <MembersView />
        </TabPanel>
      </TabContext>
    </>
  );
}

const mapStateToProps = (state) => ({
  userFullName: state.sectionReducer.userFullName,
  userRole: state.sectionReducer.userRole,
  isAuthenticated: state.sectionReducer.isAuthenticated,
  isLoading: state.sectionReducer.isLoading,
});

export default connect(mapStateToProps, { getSectionFeed })(SectionPage);
