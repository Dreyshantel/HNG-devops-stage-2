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

const ToggleProfileInfo = ({ title, type, user }) => {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const classes = useStyles();

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log('Saving data:', formData);
    setEditing(false);
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
          label="First Name"
          value={editing ? (formData.firstName || user?.firstName || '') : (user?.firstName || 'Not provided')}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          disabled={!editing}
          className={classes.formField}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Last Name"
          value={editing ? (formData.lastName || user?.lastName || '') : (user?.lastName || 'Not provided')}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          disabled={!editing}
          className={classes.formField}
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
            value={editing ? (formData.profileVisibility || 'public') : 'public'}
            onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
            disabled={!editing}
          >
            <MenuItem value="public">Public</MenuItem>
            <MenuItem value="friends">Friends Only</MenuItem>
            <MenuItem value="private">Private</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth className={classes.formField}>
          <InputLabel>Email Notifications</InputLabel>
          <Select
            value={editing ? (formData.emailNotifications || 'all') : 'all'}
            onChange={(e) => handleInputChange('emailNotifications', e.target.value)}
            disabled={!editing}
          >
            <MenuItem value="all">All Notifications</MenuItem>
            <MenuItem value="important">Important Only</MenuItem>
            <MenuItem value="none">No Notifications</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary" className={classes.formField}>
          <Security style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Two-factor authentication is currently disabled. Enable it in the Security settings.
        </Typography>
      </Grid>
    </Grid>
  );

  const renderAcademicInfo = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Student ID"
          value={editing ? (formData.studentId || user?.studentId || '') : (user?.studentId || 'Not provided')}
          onChange={(e) => handleInputChange('studentId', e.target.value)}
          disabled={!editing}
          className={classes.formField}
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
            primary="Mathematics Fundamentals" 
            secondary="Progress: 75% • 3 modules remaining"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Book style={{ color: 'var(--success-color)' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Physics Basics" 
            secondary="Progress: 45% • 5 modules remaining"
          />
        </ListItem>
      </List>
      
      <Typography variant="h6" className={classes.formField}>Study Groups</Typography>
      <Box display="flex" flexWrap="wrap" gap={1}>
        <Chip label="Calculus Study Group" className={classes.chip} />
        <Chip label="Physics Lab Partners" className={classes.chip} />
        <Chip label="Chemistry Review" className={classes.chip} />
      </Box>
    </Box>
  );

  const renderPerformanceReports = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Box textAlign="center" p={2} style={{ backgroundColor: 'var(--light-color)', borderRadius: '8px' }}>
          <Typography variant="h4" style={{ color: 'var(--success-color)' }}>3.8</Typography>
          <Typography variant="body2">Current GPA</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box textAlign="center" p={2} style={{ backgroundColor: 'var(--light-color)', borderRadius: '8px' }}>
          <Typography variant="h4" style={{ color: 'var(--accent-color)' }}>85%</Typography>
          <Typography variant="body2">Overall Progress</Typography>
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
          <Chip label="Perfect Score - Math Quiz" className={classes.chip} style={{ backgroundColor: 'var(--success-color)', color: 'white' }} />
          <Chip label="Course Completion - Physics 101" className={classes.chip} style={{ backgroundColor: 'var(--accent-color)', color: 'white' }} />
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
            {expanded && !editing && (
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
