import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  TextField,
  Radio,
  RadioGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core';
import {
  Settings,
  Notifications,
  Language,
  Palette,
  Security,
  School,
  Accessibility,
  DataUsage,
  Help,
  Save,
  RestoreDefaults,
  ExpandMore
} from '@material-ui/icons';
import CommonHeader from '../../components/Common/CommonHeader';
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    courseUpdates: true,
    assignmentReminders: true,
    quizNotifications: true,
    forumNotifications: false,
    
    // Display
    theme: 'light',
    fontSize: 'medium',
    colorScheme: 'default',
    compactMode: false,
    showAnimations: true,
    
    // Language & Region
    language: 'en',
    timezone: 'UTC+0',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    
    // Academic
    autoEnroll: false,
    showProgressBars: true,
    gradeVisibility: 'all',
    courseRecommendations: true,
    
    // Accessibility
    highContrast: false,
    screenReader: false,
    keyboardNavigation: true,
    reduceMotion: false,
    
    // Privacy
    profileVisibility: 'public',
    dataSharing: 'limited',
    analytics: true,
    cookies: true
  });

  const [expandedSection, setExpandedSection] = useState('notifications');

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSaveSettings = () => {
    // Here you would typically save the settings to your backend
    console.log('Saving settings:', settings);
    // Show success message
  };

  const handleRestoreDefaults = () => {
    // Reset to default settings
    const defaultSettings = {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      courseUpdates: true,
      assignmentReminders: true,
      quizNotifications: true,
      forumNotifications: false,
      theme: 'light',
      fontSize: 'medium',
      colorScheme: 'default',
      compactMode: false,
      showAnimations: true,
      language: 'en',
      timezone: 'UTC+0',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      autoEnroll: false,
      showProgressBars: true,
      gradeVisibility: 'all',
      courseRecommendations: true,
      highContrast: false,
      screenReader: false,
      keyboardNavigation: true,
      reduceMotion: false,
      profileVisibility: 'public',
      dataSharing: 'limited',
      analytics: true,
      cookies: true
    };
    setSettings(defaultSettings);
  };

  const renderNotificationsSettings = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
              <Notifications style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Notification Preferences
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.emailNotifications}
                  onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  color="primary"
                />
              }
              label="Email Notifications"
              className="mb-2"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.pushNotifications}
                  onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                  color="primary"
                />
              }
              label="Push Notifications"
              className="mb-2"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.smsNotifications}
                  onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                  color="primary"
                />
              }
              label="SMS Notifications"
              className="mb-2"
            />
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
              <School style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Academic Notifications
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.courseUpdates}
                  onChange={(e) => handleSettingChange('courseUpdates', e.target.checked)}
                  color="primary"
                />
              }
              label="Course Updates"
              className="mb-2"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.assignmentReminders}
                  onChange={(e) => handleSettingChange('assignmentReminders', e.target.checked)}
                  color="primary"
                />
              }
              label="Assignment Reminders"
              className="mb-2"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.quizNotifications}
                  onChange={(e) => handleSettingChange('quizNotifications', e.target.checked)}
                  color="primary"
                />
              }
              label="Quiz Notifications"
              className="mb-2"
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderDisplaySettings = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
              <Palette style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Appearance
            </Typography>
            
            <FormControl fullWidth className="mb-3">
              <InputLabel>Theme</InputLabel>
              <Select
                value={settings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="auto">Auto (System)</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth className="mb-3">
              <InputLabel>Font Size</InputLabel>
              <Select
                value={settings.fontSize}
                onChange={(e) => handleSettingChange('fontSize', e.target.value)}
              >
                <MenuItem value="small">Small</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="large">Large</MenuItem>
                <MenuItem value="extra-large">Extra Large</MenuItem>
              </Select>
            </FormControl>
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.compactMode}
                  onChange={(e) => handleSettingChange('compactMode', e.target.checked)}
                  color="primary"
                />
              }
              label="Compact Mode"
              className="mb-2"
            />
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
              <DataUsage style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Performance
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.showAnimations}
                  onChange={(e) => handleSettingChange('showAnimations', e.target.checked)}
                  color="primary"
                />
              }
              label="Show Animations"
              className="mb-2"
            />
            
            <Typography variant="body2" color="textSecondary" className="mb-2">
              Animation Speed
            </Typography>
            <Slider
              value={settings.reduceMotion ? 0 : 1}
              onChange={(e, value) => handleSettingChange('reduceMotion', value === 0)}
              step={1}
              marks={[
                { value: 0, label: 'Reduced' },
                { value: 1, label: 'Normal' }
              ]}
              valueLabelDisplay="auto"
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderLanguageSettings = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
              <Language style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Language & Region
            </Typography>
            
            <FormControl fullWidth className="mb-3">
              <InputLabel>Language</InputLabel>
              <Select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Spanish</MenuItem>
                <MenuItem value="fr">French</MenuItem>
                <MenuItem value="de">German</MenuItem>
                <MenuItem value="zh">Chinese</MenuItem>
                <MenuItem value="ar">Arabic</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth className="mb-3">
              <InputLabel>Timezone</InputLabel>
              <Select
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
              >
                <MenuItem value="UTC+0">UTC+0 (London)</MenuItem>
                <MenuItem value="UTC-5">UTC-5 (New York)</MenuItem>
                <MenuItem value="UTC-8">UTC-8 (Los Angeles)</MenuItem>
                <MenuItem value="UTC+1">UTC+1 (Paris)</MenuItem>
                <MenuItem value="UTC+5:30">UTC+5:30 (Mumbai)</MenuItem>
                <MenuItem value="UTC+8">UTC+8 (Beijing)</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
              <Accessibility style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Accessibility
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.highContrast}
                  onChange={(e) => handleSettingChange('highContrast', e.target.checked)}
                  color="primary"
                />
              }
              label="High Contrast Mode"
              className="mb-2"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.screenReader}
                  onChange={(e) => handleSettingChange('screenReader', e.target.checked)}
                  color="primary"
                />
              }
              label="Screen Reader Support"
              className="mb-2"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.keyboardNavigation}
                  onChange={(e) => handleSettingChange('keyboardNavigation', e.target.checked)}
                  color="primary"
                />
              }
              label="Enhanced Keyboard Navigation"
              className="mb-2"
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderAcademicSettings = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
              <School style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Learning Preferences
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.autoEnroll}
                  onChange={(e) => handleSettingChange('autoEnroll', e.target.checked)}
                  color="primary"
                />
              }
              label="Auto-enroll in Recommended Courses"
              className="mb-2"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.showProgressBars}
                  onChange={(e) => handleSettingChange('showProgressBars', e.target.checked)}
                  color="primary"
                />
              }
              label="Show Progress Bars"
              className="mb-2"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.courseRecommendations}
                  onChange={(e) => handleSettingChange('courseRecommendations', e.target.checked)}
                  color="primary"
                />
              }
              label="Course Recommendations"
              className="mb-2"
            />
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
              <Security style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Privacy & Security
            </Typography>
            
            <FormControl fullWidth className="mb-3">
              <InputLabel>Profile Visibility</InputLabel>
              <Select
                value={settings.profileVisibility}
                onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
              >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="friends">Friends Only</MenuItem>
                <MenuItem value="private">Private</MenuItem>
              </Select>
            </FormControl>
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.analytics}
                  onChange={(e) => handleSettingChange('analytics', e.target.checked)}
                  color="primary"
                />
              }
              label="Usage Analytics"
              className="mb-2"
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderContent = () => {
    switch (expandedSection) {
      case 'notifications':
        return renderNotificationsSettings();
      case 'display':
        return renderDisplaySettings();
      case 'language':
        return renderLanguageSettings();
      case 'academic':
        return renderAcademicSettings();
      default:
        return renderNotificationsSettings();
    }
  };

  return (
    <div className="settings-page">
      <CommonHeader title="Preferences & Settings" />
      
      <Container maxWidth="lg" className="mt-4">
        {/* Header Section */}
        <Paper className="p-4 mb-4 text-center" style={{ 
          background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
          color: 'white',
          borderRadius: '16px'
        }}>
          <Typography variant="h4" className="mb-2">
            ⚙️ Customize Your Experience
          </Typography>
          <Typography variant="body1">
            Personalize your learning environment with these customizable settings
          </Typography>
        </Paper>

        {/* Settings Navigation */}
        <Paper className="p-3 mb-4">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant={expandedSection === 'notifications' ? 'contained' : 'outlined'}
                onClick={() => setExpandedSection('notifications')}
                style={{ 
                  backgroundColor: expandedSection === 'notifications' ? 'var(--accent-color)' : 'transparent',
                  borderColor: 'var(--accent-color)',
                  color: expandedSection === 'notifications' ? 'white' : 'var(--accent-color)'
                }}
              >
                <Notifications style={{ marginRight: '8px' }} />
                Notifications
              </Button>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant={expandedSection === 'display' ? 'contained' : 'outlined'}
                onClick={() => setExpandedSection('display')}
                style={{ 
                  backgroundColor: expandedSection === 'display' ? 'var(--accent-color)' : 'transparent',
                  borderColor: 'var(--accent-color)',
                  color: expandedSection === 'display' ? 'white' : 'var(--accent-color)'
                }}
              >
                <Palette style={{ marginRight: '8px' }} />
                Display
              </Button>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant={expandedSection === 'language' ? 'contained' : 'outlined'}
                onClick={() => setExpandedSection('language')}
                style={{ 
                  backgroundColor: expandedSection === 'language' ? 'var(--accent-color)' : 'transparent',
                  borderColor: 'var(--accent-color)',
                  color: expandedSection === 'language' ? 'white' : 'var(--accent-color)'
                }}
              >
                <Language style={{ marginRight: '8px' }} />
                Language
              </Button>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant={expandedSection === 'academic' ? 'contained' : 'outlined'}
                onClick={() => setExpandedSection('academic')}
                style={{ 
                  backgroundColor: expandedSection === 'academic' ? 'var(--accent-color)' : 'transparent',
                  borderColor: 'var(--accent-color)',
                  color: expandedSection === 'academic' ? 'white' : 'var(--accent-color)'
                }}
              >
                <School style={{ marginRight: '8px' }} />
                Academic
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Settings Content */}
        <Paper className="p-4 mb-4">
          {renderContent()}
        </Paper>

        {/* Action Buttons */}
        <Paper className="p-4 text-center">
          <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSaveSettings}
              style={{ backgroundColor: 'var(--success-color)' }}
              size="large"
            >
              Save Settings
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<RestoreDefaults />}
              onClick={handleRestoreDefaults}
              style={{ borderColor: 'var(--warning-color)', color: 'var(--warning-color)' }}
              size="large"
            >
              Restore Defaults
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Settings;