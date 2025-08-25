import { Avatar, Paper, Typography, Chip, Box, IconButton, Badge, Button } from "@material-ui/core";
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
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import AssignmentIcon from "@material-ui/icons/Assignment";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
import Security from "@material-ui/icons/Security";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [userData, setUserData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    dateOfBirth: user?.dateOfBirth || '',
    phone: user?.phone || '',
    professionalTitle: user?.professionalTitle || '',
    yearsExperience: user?.yearsExperience || '',
    bio: user?.bio || '',
    profileVisibility: user?.profileVisibility || 'public',
    emailNotifications: user?.emailNotifications || 'all',
    studentId: user?.studentId || '',
    major: user?.major || '',
    yearLevel: user?.yearLevel || '',
    expectedGraduation: user?.expectedGraduation || '',
    gpa: user?.gpa || '',
    academicStanding: user?.academicStanding || '',
    certifications: user?.certifications || ''
  });
  const [saveStatus, setSaveStatus] = useState({ message: '', type: '' });
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

  const handleSaveProfileData = (sectionData, sectionType) => {
    // Update the userData state with new data
    setUserData(prev => ({ ...prev, ...sectionData }));
    
    // Apply privacy settings immediately if they were changed
    if (sectionType === 'Privacy & Security') {
      applyPrivacySettings(sectionData);
    }
    
    // Simulate saving to backend (in real app, this would be an API call)
    setTimeout(() => {
      setSaveStatus({
        message: `${sectionType} information saved successfully!`,
        type: 'success'
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveStatus({ message: '', type: '' });
      }, 3000);
    }, 500);
  };

  const applyPrivacySettings = (privacyData) => {
    // Apply profile visibility settings
    if (privacyData.profileVisibility) {
      const visibility = privacyData.profileVisibility;
      
      // In a real app, this would update the backend and apply restrictions
      if (visibility === 'private') {
        console.log('Profile is now private - restricting access to profile information');
        // Here you would implement actual privacy restrictions
        // For demonstration, we'll show a message about what this means
        setSaveStatus({
          message: 'Profile is now private! Other users cannot see your profile information.',
          type: 'success'
        });
      } else if (visibility === 'friends') {
        console.log('Profile is now friends-only - restricting access to non-friends');
        // Here you would implement friends-only restrictions
        setSaveStatus({
          message: 'Profile is now friends-only! Only your friends can see your profile.',
          type: 'success'
        });
      } else {
        console.log('Profile is now public - allowing full access');
        // Here you would remove restrictions
        setSaveStatus({
          message: 'Profile is now public! Anyone can view your profile information.',
          type: 'success'
        });
      }
    }
    
    // Apply email notification settings
    if (privacyData.emailNotifications) {
      const notifications = privacyData.emailNotifications;
      
      if (notifications === 'none') {
        console.log('Email notifications disabled - user will not receive any emails');
        // Here you would disable email notifications
        setSaveStatus({
          message: 'Email notifications disabled! You will not receive any emails.',
          type: 'success'
        });
      } else if (notifications === 'important') {
        console.log('Email notifications set to important only');
        // Here you would filter notifications
        setSaveStatus({
          message: 'Email notifications set to important only!',
          type: 'success'
        });
      } else {
        console.log('All email notifications enabled');
        // Here you would enable all notifications
        setSaveStatus({
          message: 'All email notifications enabled!',
          type: 'success'
        });
      }
    }
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setSaveStatus({ message: '', type: '' });
    }, 5000);
  };

  const handleImageSave = () => {
    if (profileImage) {
      // Simulate image upload to backend
      setSaveStatus({
        message: 'Profile image uploaded successfully!',
        type: 'success'
      });
      
      setTimeout(() => {
        setSaveStatus({ message: '', type: '' });
      }, 3000);
    }
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
        
        {/* Save Image Button */}
        {profileImage && (
          <Box textAlign="center" mt={2}>
            <Button
              variant="contained"
              onClick={handleImageSave}
              style={{ backgroundColor: 'var(--success-color)', color: 'white' }}
            >
              Save Profile Image
            </Button>
          </Box>
        )}
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
              
              {/* Save Status Display */}
              {saveStatus.message && (
                <Box 
                  mb={3} 
                  p={2} 
                  style={{ 
                    backgroundColor: saveStatus.type === 'success' ? 'var(--success-color)' : 'var(--danger-color)',
                    color: 'white',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="body1">
                    {saveStatus.message}
                  </Typography>
                </Box>
              )}

              <ToggleProfileInfo
                title="Personal Information"
                type="personal"
                user={userData}
                onSave={(data) => handleSaveProfileData(data, 'Personal')}
              />

              <ToggleProfileInfo
                title="Privacy & Security"
                type="privacy"
                user={userData}
                onSave={(data) => handleSaveProfileData(data, 'Privacy & Security')}
              />

              <ToggleProfileInfo
                title="Academic Information"
                type="academic"
                user={userData}
                onSave={(data) => handleSaveProfileData(data, 'Academic')}
              />

              <ToggleProfileInfo
                title="Performance & Reports"
                type="performance"
                user={userData}
                viewOnly={true}
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
                                     user?.role === 'Lecturer' ? 'var(--warning-color)' : 'var(--success-color)',
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

              {/* Privacy Status Overview */}
              <Box display="flex" alignItems="center" mb={2}>
                <Security style={{ color: 'var(--accent-color)', marginRight: '8px' }} />
                <Box>
                  <Typography variant="caption" style={{ color: "var(--text-secondary)" }}>
                    Privacy Status
                  </Typography>
                  <Box display="flex" alignItems="center" mt={0.5}>
                                      <Box 
                    width={8} 
                    height={8} 
                    borderRadius="50%" 
                    style={{ 
                      backgroundColor: userData.profileVisibility === 'public' ? '#9c27b0' : 
                                   userData.profileVisibility === 'friends' ? 'var(--warning-color)' : 'var(--success-color)',
                      marginRight: '6px'
                    }} 
                  />
                    <Typography variant="body2" style={{ fontWeight: '500' }}>
                      {userData.profileVisibility === 'public' ? 'Public' : 
                       userData.profileVisibility === 'friends' ? 'Friends Only' : 'Private'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>

            {/* Privacy Demonstration Section */}
            <Paper className="shadow p-4 d-flex flex-column m-3">
              <Typography className="my-3 text-primary" variant="h5" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
                Privacy Settings Demo
              </Typography>
              
              <Typography variant="body2" style={{ color: "var(--text-secondary)", marginBottom: '16px' }}>
                This section demonstrates how your privacy settings affect profile visibility:
              </Typography>
              
              <Box display="flex" flexDirection="column" gap={2}>
                <Box p={2} style={{ 
                  backgroundColor: userData.profileVisibility === 'public' ? '#9c27b0' : 'var(--light-color)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)'
                }}>
                  <Typography variant="subtitle2" style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    Public Profile
                  </Typography>
                  <Typography variant="caption" style={{ color: "var(--text-secondary)" }}>
                    {userData.profileVisibility === 'public' 
                      ? '✅ Your profile is currently public - anyone can view your information'
                      : 'Your profile is not public - information is restricted'}
                  </Typography>
                </Box>
                
                <Box p={2} style={{ 
                  backgroundColor: userData.profileVisibility === 'friends' ? 'var(--warning-color)' : 'var(--light-color)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)'
                }}>
                  <Typography variant="subtitle2" style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    Friends Only
                  </Typography>
                  <Typography variant="caption" style={{ color: "var(--text-secondary)" }}>
                    {userData.profileVisibility === 'friends' 
                      ? '✅ Your profile is friends-only - only friends can view your information'
                      : 'Your profile is not friends-only'}
                  </Typography>
                </Box>
                
                <Box p={2} style={{ 
                  backgroundColor: userData.profileVisibility === 'private' ? 'var(--success-color)' : 'var(--light-color)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)'
                }}>
                  <Typography variant="subtitle2" style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    Private Profile
                  </Typography>
                  <Typography variant="caption" style={{ color: "var(--text-secondary)" }}>
                    {userData.profileVisibility === 'private' 
                      ? '✅ Your profile is private - no one can view your information'
                      : 'Your profile is not private'}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {user && user.role === "Student" && (
              <Paper className="shadow p-4 d-flex flex-column m-3">
                <Typography className="my-3 text-primary" variant="h5" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
                  Learning Summary
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
                    Quiz Performance
                  </Typography>
                  <Chip label="85%" style={{ backgroundColor: 'var(--success-color)', color: 'white' }} size="small" />
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="body2" style={{ color: "var(--text-secondary)" }}>
                    Assignment Completion
                  </Typography>
                  <Chip label="92%" style={{ backgroundColor: 'var(--accent-color)', color: 'white' }} size="small" />
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
