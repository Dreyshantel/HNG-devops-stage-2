import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Switch,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
  IconButton,
  InputAdornment
} from '@material-ui/core';
import {
  Security as SecurityIcon,
  Lock,
  Visibility,
  VisibilityOff,
  Email,
  Phone,
  VerifiedUser
} from '@material-ui/icons';
import CommonHeader from '../../components/Common/CommonHeader';
import './Security.css';

const Security = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match!');
      setMessageType('error');
      return;
    }
    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters long!');
      setMessageType('error');
      return;
    }
    
    // Here you would typically make an API call to change the password
    setMessage('Password changed successfully!');
    setMessageType('success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    setMessage(`Two-factor authentication ${!twoFactorEnabled ? 'enabled' : 'disabled'}!`);
    setMessageType('info');
  };

  return (
    <div className="security-page">
      <CommonHeader />
      <Container maxWidth="lg" className="mt-4">
        <Typography variant="h4" className="mb-4" style={{ color: 'var(--primary-color)' }}>
          <SecurityIcon style={{ marginRight: '12px', verticalAlign: 'middle' }} />
          Security Settings
        </Typography>

        {message && (
          <Paper 
            className="mb-3 p-3" 
            elevation={1}
            style={{ 
              backgroundColor: messageType === 'error' ? '#ffebee' : 
                             messageType === 'success' ? '#e8f5e8' : '#e3f2fd',
              borderLeft: `4px solid ${
                messageType === 'error' ? '#f44336' : 
                messageType === 'success' ? '#4caf50' : '#2196f3'
              }`
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography 
                style={{ 
                  color: messageType === 'error' ? '#d32f2f' : 
                         messageType === 'success' ? '#2e7d32' : '#1976d2'
                }}
              >
                {message}
              </Typography>
              <IconButton size="small" onClick={() => setMessage('')}>
                <Typography variant="h6" style={{ fontSize: '18px' }}>×</Typography>
              </IconButton>
            </Box>
          </Paper>
        )}

        <Grid container spacing={3}>
          {/* Password Change Section */}
          <Grid item xs={12} md={6}>
            <Paper className="p-4" elevation={2}>
              <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
                <Lock style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Change Password
              </Typography>
              <Divider className="mb-3" />
              
              <TextField
                fullWidth
                label="Current Password"
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mb-3"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        edge="end"
                      >
                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                fullWidth
                label="New Password"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mb-3"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                fullWidth
                label="Confirm New Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mb-3"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <Button
                variant="contained"
                color="primary"
                onClick={handlePasswordChange}
                fullWidth
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                Change Password
              </Button>
            </Paper>
          </Grid>

          {/* Security Preferences */}
          <Grid item xs={12} md={6}>
            <Paper className="p-4" elevation={2}>
              <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
                <VerifiedUser style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Security Preferences
              </Typography>
              <Divider className="mb-3" />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={twoFactorEnabled}
                    onChange={handleTwoFactorToggle}
                    color="primary"
                  />
                }
                label="Two-Factor Authentication"
                className="mb-2"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    color="primary"
                  />
                }
                label="Email Security Notifications"
                className="mb-2"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={loginAlerts}
                    onChange={(e) => setLoginAlerts(e.target.checked)}
                    color="primary"
                  />
                }
                label="Login Alerts"
                className="mb-2"
              />
            </Paper>
          </Grid>

          {/* Recent Login Activity */}
          <Grid item xs={12}>
            <Paper className="p-4" elevation={2}>
              <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
                Recent Login Activity
              </Typography>
              <Divider className="mb-3" />
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="body2" color="textSecondary">
                        Last Login
                      </Typography>
                      <Typography variant="h6">
                        Today, 2:30 PM
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Windows 10 • Chrome
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="body2" color="textSecondary">
                        Previous Login
                      </Typography>
                      <Typography variant="h6">
                        Yesterday, 9:15 AM
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Windows 10 • Firefox
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="body2" color="textSecondary">
                        Account Created
                      </Typography>
                      <Typography variant="h6">
                        March 15, 2024
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Email verification completed
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Security;
