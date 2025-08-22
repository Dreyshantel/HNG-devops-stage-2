import React, { useState } from "react";
import { Link, NavLink, useHistory, withRouter } from "react-router-dom";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";

import SettingsIcon from "@material-ui/icons/Settings";
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Button,
} from "@material-ui/core";
import "./Header.css";
import ClearIcon from "@material-ui/icons/Clear";
import NotesIcon from "@material-ui/icons/Notes";
import { useDispatch } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SecurityIcon from "@material-ui/icons/Security";
import HelpIcon from "@material-ui/icons/Help";
import Assessment from "@material-ui/icons/Assessment";
import MessageIcon from "@material-ui/icons/Message";
import Forum from "@material-ui/icons/Forum";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Divider, Typography } from "@material-ui/core";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [settingsAnchor, setSettingsAnchor] = useState(null);
  const [chatAnchor, setChatAnchor] = useState(null);
  const [profileAnchor, setProfileAnchor] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  
  const toggleClose = () => {
    setToggle(false);
  };

  const handleNotificationsClick = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleSettingsClick = (event) => {
    setSettingsAnchor(event.currentTarget);
  };

  const handleProfileClick = (event) => {
    setProfileAnchor(event.currentTarget);
  };



  const handleClose = () => {
    setNotificationsAnchor(null);
    setSettingsAnchor(null);
    setChatAnchor(null);
    setProfileAnchor(null);
  };

  // Mock notifications data - Software Engineering Department
  const notifications = [
    { id: 1, message: "New course 'Software Quality Assurance & Testing' is available", time: "2 hours ago" },
    { id: 2, message: "Quiz deadline reminder: Embedded Systems Programming Quiz 1", time: "1 day ago" },
    { id: 3, message: "Software Engineering Workshop: DevOps Pipeline Optimization", time: "2 days ago" },
    { id: 4, message: "Database Design Project submission deadline extended", time: "3 days ago" },
    { id: 5, message: "Machine Learning Integration Lab session tomorrow", time: "4 days ago" },
    { id: 6, message: "Software Architecture Design Competition registration open", time: "5 days ago" }
  ];

  // Mock chat messages


  return (
    <div className="header">
      <div className="left__header">
        <Link to="/">
          <img
            src="https://lms.bup.edu.bd/pluginfile.php/1/theme_edumy/headerlogo2/1618037325/bup-icon.png"
            alt=""
          />
          <h4>SEN Online Peer Learning Forum</h4>
        </Link>
      </div>
      <div
        className={`middle__header ${
          toggle ? `show__sidebar__nav` : `sidebar__nav`
        }`}
      >
        {user && (
          <ul>
            {
              user.role==="Teacher" && <> <li>
              <NavLink onClick={toggleClose} to="/teacher-dashboard">Dashboard</NavLink>
            </li>
            
           

            </>
            
            }
            {
              user.role==="Admin" && <> <li >
              <NavLink onClick={toggleClose} to="/admin-dashboard">Dashboard</NavLink>
            </li>
            <li className="admin__toggle__menu">
              <NavLink onClick={toggleClose} to="/admin/course-info">Course-Info</NavLink>
            </li>
            <li className="admin__toggle__menu">
              <NavLink onClick={toggleClose} to="/admin/student-info">Student-Info</NavLink>
            </li>
            <li className="admin__toggle__menu">
              <NavLink onClick={toggleClose} to="/admin/teacher-info">Teacher-Info</NavLink>
            </li>
            
            </>
            }
            {
              user.role==="Student" &&<><li>
              <NavLink onClick={toggleClose} to="/">Dashboard</NavLink>
            </li>

            <li>
              <NavLink onClick={toggleClose} to="/quiz">Quiz Center</NavLink>
            </li>
            <li>
              <NavLink onClick={toggleClose} to="/student-forum">Student Forum</NavLink>
            </li> </> 
            }
            
            <li>
              <Link onClick={toggleClose} to="/profile">Profile</Link>
            </li>
            <li>
              <NavLink onClick={toggleClose} to="/all-courses">All Courses</NavLink>
            </li>

            {
              user.role==="Teacher" ?   <li className="">
              <Button
                onClick={() => {
                  localStorage.clear("user");
                  localStorage.clear("auth_token");
                  dispatch({ type: "CLEAR__USER" });
                  history.push("/login");
                }}
              >
                Logout
              </Button>
            </li> :  <li className="logout__button">
              <Button
                onClick={() => {
                  localStorage.clear("user");
                  localStorage.clear("auth_token");
                  dispatch({ type: "CLEAR__USER" });
                  history.push("/login");
                }}
              >
                Logout
              </Button>
            </li>

            }
           
           

           
          </ul>
        )}
      </div>
      {user ? (
        <div className="right__header">
          {/* Notifications */}
          <IconButton onClick={handleNotificationsClick}>
            <Badge badgeContent={notifications.length} color="secondary">
              <NotificationsActiveIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={notificationsAnchor}
            open={Boolean(notificationsAnchor)}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 400,
                width: 350,
              },
            }}
          >
            <div style={{ padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
              <h4 style={{ margin: 0, color: 'var(--primary-color)' }}>Notifications</h4>
            </div>
            {notifications.map((notification) => (
              <MenuItem key={notification.id} onClick={handleClose}>
                <div style={{ width: '100%' }}>
                  <div style={{ fontSize: '14px', marginBottom: '4px' }}>{notification.message}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{notification.time}</div>
                </div>
              </MenuItem>
            ))}
          </Menu>

          

          {/* Settings */}
          <IconButton onClick={handleSettingsClick}>
            <SettingsIcon />
          </IconButton>
          <Menu
            anchorEl={settingsAnchor}
            open={Boolean(settingsAnchor)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => { handleClose(); history.push('/profile'); }}>
              <AccountCircleIcon fontSize="small" style={{ marginRight: '8px' }} />
              Profile Settings
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); history.push('/security'); }}>
              <SecurityIcon fontSize="small" style={{ marginRight: '8px' }} />
              Security
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); history.push('/help'); }}>
              <HelpIcon fontSize="small" style={{ marginRight: '8px' }} />
              Help & Support
            </MenuItem>
          </Menu>

          {/* Profile Icon with Dropdown */}
          <IconButton onClick={handleProfileClick}>
            <Avatar style={{ backgroundColor: 'var(--accent-color)' }}>
              {user?.userName?.charAt(0) || 'U'}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={profileAnchor}
            open={Boolean(profileAnchor)}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: 250,
              },
            }}
          >
            <div style={{ padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
              <Typography variant="h6" style={{ margin: 0, color: 'var(--primary-color)' }}>
                {user?.userName || 'User'}
              </Typography>
              <Typography variant="body2" style={{ color: 'var(--text-secondary)' }}>
                {user?.role || 'Student'}
              </Typography>
            </div>
            <MenuItem onClick={() => { handleClose(); history.push('/profile'); }}>
              <AccountCircleIcon fontSize="small" style={{ marginRight: '8px' }} />
              View Profile
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); history.push('/grades'); }}>
              <Assessment fontSize="small" style={{ marginRight: '8px' }} />
              View Grades
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); history.push('/messages'); }}>
              <MessageIcon fontSize="small" style={{ marginRight: '8px' }} />
              Messages
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); history.push('/student-forum'); }}>
              <Forum fontSize="small" style={{ marginRight: '8px' }} />
              Student Forum
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => { handleClose(); history.push('/settings'); }}>
              <SettingsApplicationsIcon fontSize="small" style={{ marginRight: '8px' }} />
              Settings
            </MenuItem>
            <MenuItem onClick={() => { 
              localStorage.clear("user");
              localStorage.clear("auth_token");
              dispatch({ type: "CLEAR__USER" });
              history.push("/login");
            }}>
              <ExitToAppIcon fontSize="small" style={{ marginRight: '8px' }} />
              Logout
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <div className="d-flex list-unstyled">
          <li className="mr-3">
            <NavLink to="/Login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/Register">Register</NavLink>
          </li>
        </div>
      )}

      {user ? (
        <div className="menu__toggle__icon mr-auto">
          <IconButton onClick={() => setToggle(!toggle)}>
            {!toggle ? (
              <NotesIcon fontSize="large" />
            ) : (
              <ClearIcon fontSize="large" />
            )}
          </IconButton>
        </div>
      ) : null}
    </div>
  );
};

export default withRouter(Header);
