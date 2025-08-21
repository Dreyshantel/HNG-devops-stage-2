import { Avatar, Paper, Typography, Chip, Box, IconButton, Badge } from "@material-ui/core";
import React, { useState, useRef } from "react";
import CommonHeader from "../../components/Common/CommonHeader";
import Styles from "./Profile.module.css";
import ToggleProfileInfo from "./ToggleProfileInfo/ToggleProfileInfo";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import SchoolIcon from "@material-ui/icons/School";
import EmailIcon from "@material-ui/icons/Email";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PersonIcon from "@material-ui/icons/Person";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();
  
  // Get current date for last access
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <CommonHeader title={user && user.userName && user.userName} />
      <div className={Styles.avatar}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <IconButton
              size="small"
              onClick={handleImageClick}
              style={{
                backgroundColor: 'var(--accent-color)',
                color: 'white',
                width: 32,
                height: 32,
                border: '2px solid white'
              }}
            >
              <PhotoCameraIcon style={{ fontSize: 16 }} />
            </IconButton>
          }
        >
          <Avatar 
            className={Styles.avatar__profile__pic} 
            style={{ 
              fontSize: '2rem', 
              backgroundColor: 'var(--accent-color)',
              cursor: 'pointer',
              width: 120,
              height: 120
            }}
            onClick={handleImageClick}
            src={imagePreview}
          >
            {!imagePreview && (user && user.userName ? user.userName.charAt(0).toUpperCase() : 'U')}
          </Avatar>
        </Badge>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>
      <Container fluid className="mb-5">
        <Row>
          <Col md={8}>
            <Paper className="p-5 m-3 shadow">
              <Typography
                className="text-center text-primary pb-4"
                variant="h5"
                style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}
              >
                Profile Information
              </Typography>
              
              <ToggleProfileInfo
                title="Personal Information"
                type="personal"
                user={user}
              />

              <ToggleProfileInfo
                title="Privacy & Security"
                type="privacy"
                user={user}
              />

              <ToggleProfileInfo
                title="Academic Information"
                type="academic"
                user={user}
              />

              <ToggleProfileInfo
                title="Learning Resources"
                type="learning"
                user={user}
              />
              
              <ToggleProfileInfo
                title="Performance & Reports"
                type="performance"
                user={user}
              />
            </Paper>
          </Col>
          <Col md={4} className="">
            <Paper className="p-4 m-3 d-flex flex-column shadow">
              <Typography className="my-3 text-primary" variant="h5" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
                Profile Overview
              </Typography>
              
              <Box display="flex" alignItems="center" mb={2}>
                <PersonIcon style={{ color: 'var(--accent-color)', marginRight: '8px' }} />
                <Box>
                  <Typography variant="caption" style={{ color: "var(--text-secondary)" }}>
                    Username
                  </Typography>
                  <Typography variant="body1" style={{ fontWeight: '500' }}>
                    {user && user.userName && user.userName}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                <SchoolIcon style={{ color: 'var(--accent-color)', marginRight: '8px' }} />
                <Box>
                  <Typography variant="caption" style={{ color: "var(--text-secondary)" }}>
                    Role
                  </Typography>
                  <Typography variant="body1" style={{ fontWeight: '500' }}>
                    <Chip 
                      label={user && user.role ? user.role : 'Student'} 
                      size="small" 
                      style={{ 
                        backgroundColor: user?.role === 'Admin' ? 'var(--danger-color)' : 
                                     user?.role === 'Teacher' ? 'var(--warning-color)' : 'var(--success-color)',
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                <EmailIcon style={{ color: 'var(--accent-color)', marginRight: '8px' }} />
                <Box>
                  <Typography variant="caption" style={{ color: "var(--text-secondary)" }}>
                    Email Address
                  </Typography>
                  <Typography variant="body1" style={{ fontWeight: '500' }}>
                    {user && user.email ? user.email : 'Not provided'}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                <CalendarTodayIcon style={{ color: 'var(--accent-color)', marginRight: '8px' }} />
                <Box>
                  <Typography variant="caption" style={{ color: "var(--text-secondary)" }}>
                    Member Since
                  </Typography>
                  <Typography variant="body1" style={{ fontWeight: '500' }}>
                    {currentDate}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                <AccessTimeIcon style={{ color: 'var(--accent-color)', marginRight: '8px' }} />
                <Box>
                  <Typography variant="caption" style={{ color: "var(--text-secondary)" }}>
                    Last Access
                  </Typography>
                  <Typography variant="body1" style={{ fontWeight: '500' }}>
                    {currentDate}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {user && user.role === "Student" && (
              <Paper className="shadow p-4 d-flex flex-column m-3">
                <Typography className="my-3 text-primary" variant="h5" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
                  Academic Summary
                </Typography>
                
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="body2" style={{ color: "var(--text-secondary)" }}>
                    Enrolled Courses
                  </Typography>
                  <Chip label="9" color="primary" size="small" />
                </Box>
                
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="body2" style={{ color: "var(--text-secondary)" }}>
                    Completed Courses
                  </Typography>
                  <Chip label="3" color="secondary" size="small" />
                </Box>
                
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="body2" style={{ color: "var(--text-secondary)" }}>
                    Current GPA
                  </Typography>
                  <Chip label="3.8" style={{ backgroundColor: 'var(--success-color)', color: 'white' }} size="small" />
                </Box>
              </Paper>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
