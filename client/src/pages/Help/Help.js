import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import {
  ExpandMore,
  Help as HelpIcon,
  Email,
  Phone,
  Chat,
  Book,
  VideoLibrary,
  Info,
  QuestionAnswer,
  School,
  Assignment,
  Forum
} from '@material-ui/icons';
import CommonHeader from '../../components/Common/CommonHeader';
import './Help.css';

const Help = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer: "To enroll in a course, navigate to the 'All Courses' section, browse available courses, and click the 'Enroll' button on any course you're interested in."
    },
    {
      question: "How do I take quizzes?",
      answer: "Access the Quiz Center from your dashboard or navigation menu. Select a quiz, read the instructions, and start answering questions. You can review your answers before submitting."
    },
    {
      question: "How do I participate in the Student Forum?",
      answer: "Go to the Student Forum section to view discussions, ask questions, and share knowledge with other students. You can create new posts, comment on existing ones, and interact with the community."
    },
    {
      question: "How do I check my grades?",
      answer: "Your grades are displayed in the Grades section of your dashboard. You can view scores for completed quizzes, assignments, and overall course progress."
    },
    {
      question: "How do I update my profile information?",
      answer: "Navigate to your Profile page and click on the section you want to edit. You can update personal information, academic details, and profile picture."
    },
    {
      question: "What if I forget my password?",
      answer: "Use the 'Forgot Password' option on the login page. You'll receive an email with instructions to reset your password securely."
    }
  ];

  const resources = [
    {
      title: "Student Guide",
      description: "Comprehensive guide for new students",
      icon: <Book style={{ fontSize: 40, color: 'var(--accent-color)' }} />,
      link: "#"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video instructions",
      icon: <VideoLibrary style={{ fontSize: 40, color: 'var(--primary-color)' }} />,
      link: "#"
    },
    {
      title: "FAQ Database",
      description: "Searchable frequently asked questions",
      icon: <QuestionAnswer style={{ fontSize: 40, color: 'var(--success-color)' }} />,
      link: "#"
    },
    {
      title: "Academic Calendar",
      description: "Important dates and deadlines",
      icon: <Assignment style={{ fontSize: 40, color: 'var(--warning-color)' }} />,
      link: "#"
    }
  ];

  const contactMethods = [
    {
      method: "Email Support",
      details: "support@senlms.com",
      icon: <Email style={{ fontSize: 24, color: 'var(--accent-color)' }} />,
      description: "Get help within 24 hours"
    },
    {
      method: "Live Chat",
      details: "Available 9 AM - 6 PM",
      icon: <Chat style={{ fontSize: 24, color: 'var(--primary-color)' }} />,
      description: "Instant help during business hours"
    },
    {
      method: "Phone Support",
      details: "+1 (555) 123-4567",
      icon: <Phone style={{ fontSize: 24, color: 'var(--success-color)' }} />,
      description: "Speak with a support representative"
    }
  ];

  const handleContactSubmit = () => {
    // Here you would typically send the contact form data
    setContactDialogOpen(false);
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="help-page">
      <CommonHeader />
      <Container maxWidth="lg" className="mt-4">
        <Typography variant="h4" className="mb-4" style={{ color: 'var(--primary-color)' }}>
                          <HelpIcon style={{ marginRight: '12px', verticalAlign: 'middle' }} />
          Help & Support
        </Typography>

        {/* Quick Help Section */}
        <Paper className="p-4 mb-4" elevation={2}>
          <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
                            <Info style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Quick Help
          </Typography>
          <Divider className="mb-3" />
          
          <Grid container spacing={3}>
            {resources.map((resource, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card className="resource-card" onClick={() => window.open(resource.link, '_blank')}>
                  <CardContent className="text-center">
                    {resource.icon}
                    <Typography variant="h6" className="mt-2">
                      {resource.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {resource.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* FAQ Section */}
        <Paper className="p-4 mb-4" elevation={2}>
          <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
            <QuestionAnswer style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Frequently Asked Questions
          </Typography>
          <Divider className="mb-3" />
          
          {faqs.map((faq, index) => (
            <Accordion key={index} className="mb-2">
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="subtitle1" style={{ fontWeight: 500 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="textSecondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>

        {/* Contact Methods */}
        <Paper className="p-4 mb-4" elevation={2}>
          <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
            <School style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Contact Support
          </Typography>
          <Divider className="mb-3" />
          
          <Grid container spacing={3} className="mb-4">
            {contactMethods.map((method, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card className="contact-method-card">
                  <CardContent className="text-center">
                    <Box className="mb-2">
                      {method.icon}
                    </Box>
                    <Typography variant="h6" className="mb-1">
                      {method.method}
                    </Typography>
                    <Typography variant="body1" className="mb-1" style={{ fontWeight: 500 }}>
                      {method.details}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {method.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box textAlign="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setContactDialogOpen(true)}
              style={{ backgroundColor: 'var(--accent-color)' }}
              startIcon={<Email />}
            >
              Send Message to Support
            </Button>
          </Box>
        </Paper>

        {/* Student Forum Help */}
        <Paper className="p-4 mb-4" elevation={2}>
          <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
            <Forum style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Student Forum Guidelines
          </Typography>
          <Divider className="mb-3" />
          
          <List>
            <ListItem>
              <ListItemIcon>
                <Chip label="1" size="small" style={{ backgroundColor: 'var(--accent-color)', color: 'white' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Be respectful and constructive in all discussions"
                secondary="Treat others as you would like to be treated"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Chip label="2" size="small" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Use appropriate language and avoid spam"
                secondary="Keep discussions focused on academic topics"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Chip label="3" size="small" style={{ backgroundColor: 'var(--success-color)', color: 'white' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Share knowledge and help fellow students"
                secondary="Collaborate to create a positive learning environment"
              />
            </ListItem>
          </List>
        </Paper>
      </Container>

      {/* Contact Form Dialog */}
      <Dialog open={contactDialogOpen} onClose={() => setContactDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Contact Support</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Your Name"
            value={contactForm.name}
            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
            className="mb-3"
            margin="dense"
          />
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={contactForm.email}
            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
            className="mb-3"
            margin="dense"
          />
          <TextField
            fullWidth
            label="Subject"
            value={contactForm.subject}
            onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
            className="mb-3"
            margin="dense"
          />
          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            value={contactForm.message}
            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setContactDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleContactSubmit} color="primary" variant="contained">
            Send Message
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Help;
