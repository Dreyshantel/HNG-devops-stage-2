import React, { useState, useEffect } from 'react';
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
  AccordionDetails,
  Snackbar
} from '@material-ui/core';
import {
  Notifications,
  Language,
  Palette,
  Security,
  School,
  Accessibility,
  DataUsage,
  Help,
  Save,
  Restore,
  ExpandMore,
  Brightness4,
  Brightness7,
  Computer,
  Translate
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
    largeText: false,
    focusIndicators: true,
    
    // Privacy
    profileVisibility: 'public',
    dataSharing: 'limited',
    analytics: true,
    cookies: true
  });

  const [expandedSection, setExpandedSection] = useState('notifications');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
      applySettings(parsedSettings);
    }
  }, []);

  // Apply settings to the UI
  const applySettings = (newSettings) => {
    // Apply theme
    if (newSettings.theme === 'dark') {
      document.documentElement.style.setProperty('--background-color', '#1a1a1a');
      document.documentElement.style.setProperty('--card-background', '#2d2d2d');
      document.documentElement.style.setProperty('--text-primary', '#ffffff');
      document.documentElement.style.setProperty('--text-secondary', '#b0b0b0');
      document.documentElement.style.setProperty('--border-color', '#404040');
      document.documentElement.style.setProperty('--light-color', '#404040');
    } else {
      document.documentElement.style.setProperty('--background-color', '#f8f9fa');
      document.documentElement.style.setProperty('--card-background', '#ffffff');
      document.documentElement.style.setProperty('--text-primary', '#2c3e50');
      document.documentElement.style.setProperty('--text-secondary', '#7f8c8d');
      document.documentElement.style.setProperty('--border-color', '#bdc3c7');
      document.documentElement.style.setProperty('--light-color', '#ecf0f1');
    }

    // Apply high contrast
    if (newSettings.highContrast) {
      document.documentElement.style.setProperty('--primary-color', '#000000');
      document.documentElement.style.setProperty('--accent-color', '#ffffff');
      document.documentElement.style.setProperty('--text-primary', '#000000');
      document.documentElement.style.setProperty('--text-secondary', '#000000');
      document.documentElement.style.setProperty('--border-color', '#000000');
    } else {
      document.documentElement.style.setProperty('--primary-color', '#2c3e50');
      document.documentElement.style.setProperty('--accent-color', '#3498db');
      document.documentElement.style.setProperty('--text-primary', '#2c3e50');
      document.documentElement.style.setProperty('--text-secondary', '#7f8c8d');
      document.documentElement.style.setProperty('--border-color', '#bdc3c7');
    }

    // Apply font size
    const fontSizeMap = {
      'small': '14px',
      'medium': '16px',
      'large': '18px',
      'extra-large': '20px'
    };
    document.documentElement.style.fontSize = fontSizeMap[newSettings.fontSize] || '16px';

    // Apply focus indicators
    if (newSettings.focusIndicators) {
      document.documentElement.style.setProperty('--focus-outline', '2px solid var(--accent-color)');
    } else {
      document.documentElement.style.setProperty('--focus-outline', 'none');
    }

    // Apply large text
    if (newSettings.largeText) {
      document.documentElement.style.setProperty('--text-scale', '1.2');
    } else {
      document.documentElement.style.setProperty('--text-scale', '1');
    }
  };

  const handleSettingChange = (setting, value) => {
    const newSettings = { ...settings, [setting]: value };
    setSettings(newSettings);
    
    // Apply settings immediately for certain changes
    if (['theme', 'fontSize', 'highContrast', 'largeText', 'focusIndicators'].includes(setting)) {
      applySettings(newSettings);
      showSnackbar('Setting applied instantly!', 'success');
    }
    
    // Save to localStorage
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSaveSettings = () => {
    // Save all settings to backend (if available)
    localStorage.setItem('userSettings', JSON.stringify(settings));
    showSnackbar('All settings saved successfully!', 'success');
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
      largeText: false,
      focusIndicators: true,
      profileVisibility: 'public',
      dataSharing: 'limited',
      analytics: true,
      cookies: true
    };
    setSettings(defaultSettings);
    applySettings(defaultSettings);
    localStorage.setItem('userSettings', JSON.stringify(defaultSettings));
    showSnackbar('Settings restored to defaults!', 'info');
  };

  // Enhanced language options
  const languages = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'es', label: 'Español', flag: '🇪🇸' },
    { value: 'fr', label: 'Français', flag: '🇫🇷' },
    { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { value: 'zh', label: '中文', flag: '🇨🇳' },
    { value: 'ja', label: '日本語', flag: '🇯🇵' },
    { value: 'ko', label: '한국어', flag: '🇰🇷' },
    { value: 'ar', label: 'العربية', flag: '🇸🇦' },
    { value: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { value: 'pt', label: 'Português', flag: '🇵🇹' },
    { value: 'ru', label: 'Русский', flag: '🇷🇺' },
    { value: 'it', label: 'Italiano', flag: '🇮🇹' }
  ];

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
                <MenuItem value="light">
                  <Box display="flex" alignItems="center">
                    <Brightness7 style={{ marginRight: '8px' }} />
                    Light
                  </Box>
                </MenuItem>
                <MenuItem value="dark">
                  <Box display="flex" alignItems="center">
                    <Brightness4 style={{ marginRight: '8px' }} />
                    Dark
                  </Box>
                </MenuItem>
                <MenuItem value="auto">
                  <Box display="flex" alignItems="center">
                    <Computer style={{ marginRight: '8px' }} />
                    Auto (System)
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth className="mb-3">
              <InputLabel>Font Size</InputLabel>
              <Select
                value={settings.fontSize}
                onChange={(e) => handleSettingChange('fontSize', e.target.value)}
              >
                <MenuItem value="small">Small (14px)</MenuItem>
                <MenuItem value="medium">Medium (16px)</MenuItem>
                <MenuItem value="large">Large (18px)</MenuItem>
                <MenuItem value="extra-large">Extra Large (20px)</MenuItem>
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
                {languages.map((lang) => (
                  <MenuItem key={lang.value} value={lang.value}>
                    <Box display="flex" alignItems="center">
                      <span style={{ marginRight: '8px' }}>{lang.flag}</span>
                      {lang.label}
                    </Box>
                  </MenuItem>
                ))}
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

            <Typography variant="body2" color="textSecondary" className="mt-3">
              💡 Language changes will be applied immediately across the application
            </Typography>
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
                  checked={settings.largeText}
                  onChange={(e) => handleSettingChange('largeText', e.target.checked)}
                  color="primary"
                />
              }
              label="Large Text"
              className="mb-2"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.focusIndicators}
                  onChange={(e) => handleSettingChange('focusIndicators', e.target.checked)}
                  color="primary"
                />
              }
              label="Enhanced Focus Indicators"
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
              startIcon={<Restore />}
              onClick={handleRestoreDefaults}
              style={{ borderColor: 'var(--warning-color)', color: 'var(--warning-color)' }}
              size="large"
            >
              Restore Defaults
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Custom notification for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message={snackbar.message}
        action={
          <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
            CLOSE
          </Button>
        }
        style={{
          backgroundColor: snackbar.severity === 'success' ? 'var(--success-color)' :
                          snackbar.severity === 'warning' ? 'var(--warning-color)' :
                          snackbar.severity === 'error' ? 'var(--danger-color)' :
                          'var(--accent-color)',
          color: 'white'
        }}
      />
    </div>
  );
};

export default Settings;