import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { 
  Divider, 
  TextField, 
  Button, 
  Box, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";
import {
  Person,
  Security,
  School,
  Book,
  Assessment,
  Edit,
  Save,
  Cancel
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "10px 0px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
  actionButtons: {
    marginTop: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0.5),
  }
}));

const ToggleProfileInfo = ({ title, type, user, viewOnly = false, onSave }) => {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const classes = useStyles();

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleEdit = () => {
    setEditing(true);
    // Initialize form data with current user data
    setFormData({
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
    // Clear any previous validation errors
    setValidationErrors({});
  };

  const handleSave = () => {
    // Validate required fields
    const errors = {};
    
    if (type === 'personal') {
      if (!formData.firstName?.trim()) errors.firstName = 'First name is required';
      if (!formData.lastName?.trim()) errors.lastName = 'Last name is required';
    }
    
    if (type === 'academic') {
      if (!formData.studentId?.trim()) errors.studentId = 'Student ID is required';
      if (!formData.major?.trim()) errors.major = 'Major/Program is required';
    }
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    // Clear validation errors
    setValidationErrors({});
    
    // Call the onSave function passed from parent
    if (onSave) {
      onSave(formData);
    }
    
    // Reset form and exit editing mode
    setEditing(false);
    setFormData({});
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData({});
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderPersonalInfo = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="First Name *"
          value={editing ? (formData.firstName || user?.firstName || '') : (user?.firstName || 'Not provided')}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          disabled={!editing}
          className={classes.formField}
          error={!!validationErrors.firstName}
          helperText={validationErrors.firstName}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Last Name *"
          value={editing ? (formData.lastName || user?.lastName || '') : (user?.lastName || 'Not provided')}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          disabled={!editing}
          className={classes.formField}
          error={!!validationErrors.lastName}
          helperText={validationErrors.lastName}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Date of Birth"
          type="date"
          value={editing ? (formData.dateOfBirth || '') : ''}
          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          disabled={!editing}
          className={classes.formField}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Phone Number"
          value={editing ? (formData.phone || user?.phone || '') : (user?.phone || 'Not provided')}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          disabled={!editing}
          className={classes.formField}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Professional Title"
          value={editing ? (formData.professionalTitle || user?.professionalTitle || '') : (user?.professionalTitle || 'Not provided')}
          onChange={(e) => handleInputChange('professionalTitle', e.target.value)}
          disabled={!editing}
          className={classes.formField}
          placeholder="e.g., Software Engineer, QA Specialist, DevOps Engineer"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Years of Experience"
          type="number"
          value={editing ? (formData.yearsExperience || user?.yearsExperience || '') : (user?.yearsExperience || 'Not provided')}
          onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
          disabled={!editing}
          className={classes.formField}
          placeholder="e.g., 3"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Bio"
          multiline
          rows={3}
          value={editing ? (formData.bio || user?.bio || '') : (user?.bio || 'No bio provided')}
          onChange={(e) => handleInputChange('bio', e.target.value)}
          disabled={!editing}
          className={classes.formField}
        />
      </Grid>
    </Grid>
  );

  const renderPrivacySecurity = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth className={classes.formField}>
          <InputLabel>Profile Visibility</InputLabel>
          <Select
            value={editing ? (formData.profileVisibility || user?.profileVisibility || 'public') : (user?.profileVisibility || 'public')}
            onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
            disabled={!editing}
          >
            <MenuItem value="public">Public</MenuItem>
            <MenuItem value="friends">Friends Only</MenuItem>
            <MenuItem value="private">Private</MenuItem>
          </Select>
        </FormControl>
        {!editing && (
          <Typography variant="caption" style={{ color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>
            Current setting: {user?.profileVisibility === 'public' ? 'Your profile is visible to everyone' : 
                             user?.profileVisibility === 'friends' ? 'Your profile is visible to friends only' : 
                             'Your profile is private and not visible to others'}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth className={classes.formField}>
          <InputLabel>Email Notifications</InputLabel>
          <Select
            value={editing ? (formData.emailNotifications || user?.emailNotifications || 'all') : (user?.emailNotifications || 'all')}
            onChange={(e) => handleInputChange('emailNotifications', e.target.value)}
            disabled={!editing}
          >
            <MenuItem value="all">All Notifications</MenuItem>
            <MenuItem value="important">Important Only</MenuItem>
            <MenuItem value="none">No Notifications</MenuItem>
          </Select>
        </FormControl>
        {!editing && (
          <Typography variant="caption" style={{ color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>
            Current setting: {user?.emailNotifications === 'all' ? 'You receive all email notifications' : 
                             user?.emailNotifications === 'important' ? 'You receive only important notifications' : 
                             'You receive no email notifications'}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary" className={classes.formField}>
          <Security style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Two-factor authentication is currently disabled. Enable it in the Security settings.
        </Typography>
      </Grid>
      
      {/* Privacy Status Display */}
      {!editing && (
        <Grid item xs={12}>
          <Box p={2} style={{ backgroundColor: 'var(--light-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <Typography variant="subtitle2" style={{ fontWeight: 'bold', marginBottom: '8px', color: 'var(--primary-color)' }}>
              Privacy Status
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
                             <Box 
                 width={12} 
                 height={12} 
                 borderRadius="50%" 
                 style={{ 
                   backgroundColor: user?.profileVisibility === 'public' ? '#9c27b0' : 
                                user?.profileVisibility === 'friends' ? 'var(--warning-color)' : 'var(--success-color)',
                   marginRight: '8px'
                 }} 
               />
              <Typography variant="body2">
                Profile: {user?.profileVisibility === 'public' ? 'Public' : 
                         user?.profileVisibility === 'friends' ? 'Friends Only' : 'Private'}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Box 
                width={12} 
                height={12} 
                borderRadius="50%" 
                style={{ 
                  backgroundColor: user?.emailNotifications === 'all' ? 'var(--success-color)' : 
                               user?.emailNotifications === 'important' ? 'var(--warning-color)' : 'var(--danger-color)',
                  marginRight: '8px'
                }} 
              />
              <Typography variant="body2">
                Email: {user?.emailNotifications === 'all' ? 'All Notifications' : 
                       user?.emailNotifications === 'important' ? 'Important Only' : 'No Notifications'}
              </Typography>
            </Box>
          </Box>
        </Grid>
      )}
    </Grid>
  );

  const renderAcademicInfo = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Student ID *"
          value={editing ? (formData.studentId || user?.studentId || '') : (user?.studentId || 'Not provided')}
          onChange={(e) => handleInputChange('studentId', e.target.value)}
          disabled={!editing}
          className={classes.formField}
          error={!!validationErrors.studentId}
          helperText={validationErrors.studentId}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Major/Program"
          value={editing ? (formData.major || user?.major || '') : (user?.major || 'Not specified')}
          onChange={(e) => handleInputChange('major', e.target.value)}
          disabled={!editing}
          className={classes.formField}
          error={!!validationErrors.major}
          helperText={validationErrors.major}
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Year Level"
          value={editing ? (formData.yearLevel || user?.yearLevel || '') : (user?.yearLevel || 'Not specified')}
          onChange={(e) => handleInputChange('yearLevel', e.target.value)}
          disabled={!editing}
          className={classes.formField}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Expected Graduation"
          type="date"
          value={editing ? (formData.expectedGraduation || '') : ''}
          onChange={(e) => handleInputChange('expectedGraduation', e.target.value)}
          disabled={!editing}
          className={classes.formField}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="GPA"
          type="number"
          step="0.01"
          min="0"
          max="4.0"
          value={editing ? (formData.gpa || user?.gpa || '') : (user?.gpa || 'Not provided')}
          onChange={(e) => handleInputChange('gpa', e.target.value)}
          disabled={!editing}
          className={classes.formField}
          placeholder="e.g., 3.75"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Academic Standing"
          value={editing ? (formData.academicStanding || user?.academicStanding || '') : (user?.academicStanding || 'Not specified')}
          onChange={(e) => handleInputChange('academicStanding', e.target.value)}
          disabled={!editing}
          className={classes.formField}
          placeholder="e.g., Dean's List, Honors, Regular"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Certifications"
          multiline
          rows={2}
          value={editing ? (formData.certifications || user?.certifications || '') : (user?.certifications || 'None')}
          onChange={(e) => handleInputChange('certifications', e.target.value)}
          disabled={!editing}
          className={classes.formField}
          placeholder="e.g., AWS Certified Developer, Microsoft Azure Fundamentals, Google Cloud Professional"
        />
      </Grid>
    </Grid>
  );

  const renderLearningResources = () => (
    <Box>
      <Typography variant="h6" className={classes.formField}>Current Learning Path</Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <Book style={{ color: 'var(--accent-color)' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Introduction to Software Engineering" 
            secondary="Progress: 75% • 3 modules remaining"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Book style={{ color: 'var(--success-color)' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Data Structures & Algorithms" 
            secondary="Progress: 45% • 5 modules remaining"
          />
        </ListItem>
      </List>
      
      <Typography variant="h6" className={classes.formField}>Study Groups</Typography>
      <Box display="flex" flexWrap="wrap" gap={1}>
        <Chip label="Software Design Group" className={classes.chip} />
        <Chip label="Algorithm Study Partners" className={classes.chip} />
        <Chip label="Web Development Review" className={classes.chip} />
      </Box>
    </Box>
  );

  const renderPerformanceReports = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Box textAlign="center" p={2} style={{ backgroundColor: 'var(--light-color)', borderRadius: '8px' }}>
          <Typography variant="h4" style={{ color: 'var(--success-color)' }}>85%</Typography>
          <Typography variant="body2">Quiz Performance</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box textAlign="center" p={2} style={{ backgroundColor: 'var(--light-color)', borderRadius: '8px' }}>
          <Typography variant="h4" style={{ color: 'var(--accent-color)' }}>92%</Typography>
          <Typography variant="body2">Assignment Completion</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box textAlign="center" p={2} style={{ backgroundColor: 'var(--light-color)', borderRadius: '8px' }}>
          <Typography variant="h4" style={{ color: 'var(--warning-color)' }}>12</Typography>
          <Typography variant="body2">Courses Enrolled</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" className={classes.formField}>Recent Achievements</Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          <Chip label="Perfect Score - Software Design Quiz" className={classes.chip} style={{ backgroundColor: 'var(--success-color)', color: 'white' }} />
          <Chip label="Course Completion - Data Structures" className={classes.chip} style={{ backgroundColor: 'var(--accent-color)', color: 'white' }} />
          <Chip label="Top Contributor - Forum" className={classes.chip} style={{ backgroundColor: 'var(--primary-color)', color: 'white' }} />
        </Box>
      </Grid>
    </Grid>
  );

  const renderContent = () => {
    switch (type) {
      case 'personal':
        return renderPersonalInfo();
      case 'privacy':
        return renderPrivacySecurity();
      case 'academic':
        return renderAcademicInfo();
      case 'learning':
        return renderLearningResources();
      case 'performance':
        return renderPerformanceReports();
      default:
        return <Typography>Content not available</Typography>;
    }
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded}
        onChange={handleExpand}
        style={{ backgroundColor: "var(--light-color)" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box display="flex" alignItems="center" width="100%">
            <Typography className={classes.heading} style={{ flexGrow: 1 }}>
              {title}
            </Typography>
            {expanded && !editing && !viewOnly && (
              <Button
                size="small"
                startIcon={<Edit />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit();
                }}
                style={{ color: 'var(--accent-color)' }}
              >
                Edit
              </Button>
            )}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {renderContent()}
          
          {editing && (
            <Box className={classes.actionButtons}>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                style={{ backgroundColor: 'var(--success-color)', marginRight: '8px' }}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          )}
          
          <Divider />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ToggleProfileInfo;
