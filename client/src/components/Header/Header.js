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

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [settingsAnchor, setSettingsAnchor] = useState(null);

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



  const handleClose = () => {
    setNotificationsAnchor(null);
    setSettingsAnchor(null);
    setChatAnchor(null);
  };

  // Mock notifications data
  const notifications = [
    { id: 1, message: "New course 'Advanced Mathematics' is available", time: "2 hours ago" },
    { id: 2, message: "Quiz deadline reminder: Physics Quiz 1", time: "1 day ago" },
    { id: 3, message: "Welcome to SEN Online Peer Learning Forum!", time: "2 days ago" }
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

          <Link to="/profile">
            <Avatar style={{ backgroundColor: 'var(--accent-color)' }}>
              {user?.userName?.charAt(0) || 'U'}
            </Avatar>
          </Link>
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
