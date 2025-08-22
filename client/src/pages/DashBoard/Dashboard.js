import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import MessageIcon from "@material-ui/icons/Message";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./Dashboard.css";
import styles from "./Dashboard.module.css";
import { Col, Container, Row } from "react-bootstrap";
import {
  IconButton,
  Paper,
  Typography,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import Body4Card from "./Body4Card/Body4Card";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

import RightSidebar from "./RightSidebar/RightSidebar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BookIcon from "@material-ui/icons/Book";
import ScheduleIcon from "@material-ui/icons/Schedule";
import StarIcon from "@material-ui/icons/Star";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);



  // Clean dashboard statistics - removed GPA, focused on learning progress
  const dashboardStats = [
    {
      title: "Enrolled Courses",
      value: "12",
      icon: <BookIcon style={{ fontSize: 40, color: 'var(--accent-color)' }} />,
      color: "var(--accent-color)",
      progress: 75,
      description: "Active learning courses"
    },
    {
      title: "Completed Courses",
      value: "8",
      icon: <AssignmentIcon style={{ fontSize: 40, color: 'var(--success-color)' }} />,
      color: "var(--success-color)",
      progress: 65,
      description: "Successfully finished"
    },
    {
      title: "Quiz Performance",
      value: "85%",
      icon: <QuestionAnswer style={{ fontSize: 40, color: 'var(--warning-color)' }} />,
      color: "var(--warning-color)",
      progress: 85,
      description: "Average quiz score"
    },
    {
      title: "Study Hours",
      value: "156",
      icon: <ScheduleIcon style={{ fontSize: 40, color: 'var(--primary-color)' }} />,
      color: "var(--primary-color)",
      progress: 60,
      description: "This semester"
    }
  ];

  // Clean recent activities - focused on software engineering learning
  const recentActivities = [
    {
      id: 1,
      type: "Course",
      action: "Completed",
      title: "Introduction to Software Engineering",
      time: "2 hours ago",
      icon: <AssignmentIcon style={{ color: 'var(--success-color)' }} />
    },
    {
      id: 2,
      type: "Quiz",
      action: "Started",
      title: "Data Structures Quiz",
      time: "4 hours ago",
      icon: <QuestionAnswer style={{ color: 'var(--accent-color)' }} />
    },
    {
      id: 3,
      type: "Discussion",
      action: "Participated in",
      title: "Software Architecture Forum",
      time: "1 day ago",
      icon: <MessageIcon style={{ color: 'var(--primary-color)' }} />
    },
    {
      id: 4,
      type: "Assignment",
      action: "Submitted",
      title: "Algorithm Design Project",
      time: "2 days ago",
      icon: <BookIcon style={{ color: 'var(--warning-color)' }} />
    }
  ];

  // Upcoming activities - department events, quizzes, and meaningful activities
  const upcomingActivities = [
    {
      id: 1,
      title: "Software Engineering Workshop",
      type: "Department Event",
      description: "DevOps Pipeline Optimization",
      date: "Tomorrow, 2:00 PM",
      location: "Computer Lab 3",
      icon: <AssignmentIcon style={{ color: 'var(--accent-color)' }} />
    },
    {
      id: 2,
      title: "Embedded Systems Quiz",
      type: "Assessment",
      description: "Real-time Programming Concepts",
      date: "Friday, 10:00 AM",
      location: "Online",
      icon: <QuestionAnswer style={{ color: 'var(--warning-color)' }} />
    },
    {
      id: 3,
      title: "Machine Learning Seminar",
      type: "Academic Event",
      description: "AI Integration in Software Applications",
      date: "Monday, 3:00 PM",
      location: "Auditorium A",
      icon: <BookIcon style={{ color: 'var(--success-color)' }} />
    },
    {
      id: 4,
      title: "Database Design Project Demo",
      type: "Project Presentation",
      description: "Final Year Student Presentations",
      date: "Wednesday, 1:00 PM",
      location: "Conference Room 2",
      icon: <MessageIcon style={{ color: 'var(--primary-color)' }} />
    }
  ];

  return (
    <div className="dashboard">
      <div className="left__sidebar__dashboard">
        <Sidebar Icon={DashboardIcon} title="Dashboard" link="/" />
        <Sidebar Icon={PersonIcon} title="Profile" link="/profile" />
        <Sidebar Icon={TouchAppIcon} title="Performance" link="/grades" />
        <Sidebar Icon={MessageIcon} title="Messages" link="/messages" />
        <Sidebar Icon={ExitToAppIcon} title="Logout" />
      </div>

      <div className="main__body__dashboard">
        <Container>
          <div className={styles.dashboard__header__name}>
            <div>
              <h2 className={styles.dashboard__name}>
                Welcome back, {user && user.userName}! 👋
              </h2>
              <Typography variant="body2" style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                Track your software engineering learning progress and stay organized
              </Typography>
            </div>
            <Box display="flex" alignItems="center">
              <TrendingUpIcon style={{ fontSize: 40, color: 'var(--accent-color)', marginRight: '16px' }} />
            </Box>
          </div>
        </Container>

        {/* Clean Statistics Cards */}
        <Container fluid className="my-4">
          <Row>
            {dashboardStats.map((stat, index) => (
              <Col key={index} md={3} sm={6} xs={12} className="mb-3">
                <Paper className="p-4 shadow" style={{ 
                  borderRadius: '16px', 
                  border: '1px solid var(--border-color)',
                  transition: 'transform 0.2s ease-in-out'
                }} className="stat-card">
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Box>
                      <Typography variant="h3" style={{ 
                        fontWeight: '700', 
                        color: stat.color,
                        marginBottom: '4px'
                      }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="h6" style={{ 
                        color: 'var(--text-primary)', 
                        fontWeight: '600',
                        marginBottom: '4px'
                      }}>
                        {stat.title}
                      </Typography>
                      <Typography variant="body2" style={{ 
                        color: 'var(--text-secondary)',
                        fontSize: '0.875rem'
                      }}>
                        {stat.description}
                      </Typography>
                    </Box>
                    <Box style={{ 
                      backgroundColor: `${stat.color}15`, 
                      padding: '16px',
                      borderRadius: '12px'
                    }}>
                      {stat.icon}
                    </Box>
                  </Box>
                  <Box mt={2}>
                    <LinearProgress 
                      variant="determinate" 
                      value={stat.progress} 
                      style={{ 
                        height: 8, 
                        borderRadius: 4,
                        backgroundColor: 'var(--light-color)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: stat.color
                        }
                      }} 
                    />
                    <Typography variant="caption" style={{ 
                      color: 'var(--text-secondary)',
                      marginTop: '8px',
                      display: 'block'
                    }}>
                      {stat.progress}% Complete
                    </Typography>
                  </Box>
                </Paper>
              </Col>
            ))}
          </Row>
        </Container>

        {/* Quick Action Cards - User-Friendly Actions */}
        <Container fluid className="my-4">
          <Typography variant="h5" style={{ 
            color: 'var(--text-primary)', 
            fontWeight: '600',
            marginBottom: '20px'
          }}>
            Quick Actions
          </Typography>
          <Row>
            <Col md={3} sm={6} xs={12} className="mb-3">
              <Body4Card
                link="/quiz"
                shortTitle="Test Your Knowledge"
                title="Take a Quiz"
                Icon={QuestionAnswer}
              />
            </Col>
            <Col md={3} sm={6} xs={12} className="mb-3">
              <Body4Card
                link="/student-forum"
                shortTitle="Connect & Learn"
                title="Student Forum"
                Icon={MessageIcon}
              />
            </Col>
            <Col md={3} sm={6} xs={12} className="mb-3">
              <Body4Card
                link="/grades"
                shortTitle="Track Your Progress"
                title="View Performance"
                Icon={TrendingUpIcon}
              />
            </Col>
            <Col md={3} sm={6} xs={12} className="mb-3">
              <Body4Card
                link="/messages"
                shortTitle="Stay Connected"
                title="Messages"
                Icon={MessageIcon}
              />
            </Col>
          </Row>
        </Container>

        <Container fluid className="my-5">
          <Row>
            <Col md={9} xs={12} sm={12}>
              {/* Recent Activities - Cleaner Design */}
              <Paper className="p-4 mb-4 shadow" style={{ 
                borderRadius: '16px',
                border: '1px solid var(--border-color)'
              }}>
                <Typography variant="h6" style={{ 
                  color: 'var(--primary-color)', 
                  fontWeight: '600', 
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <AssignmentIcon style={{ marginRight: '12px', color: 'var(--accent-color)' }} />
                  Recent Learning Activities
                </Typography>
                <List>
                  {recentActivities.map((activity) => (
                    <ListItem key={activity.id} style={{ 
                      borderBottom: '1px solid var(--border-color)',
                      padding: '16px 0'
                    }}>
                      <ListItemAvatar>
                        <Avatar style={{ 
                          backgroundColor: 'var(--light-color)',
                          color: 'var(--accent-color)'
                        }}>
                          {activity.icon}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body1" style={{ fontWeight: '500' }}>
                            {activity.action} <strong>{activity.title}</strong>
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" style={{ color: 'var(--text-secondary)' }}>
                            {activity.time}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>

              {/* Upcoming Activities - Software Engineering Department Events */}
              <Paper className="p-4 mb-4 shadow" style={{ 
                borderRadius: '16px',
                border: '1px solid var(--border-color)'
              }}>
                <Typography variant="h6" style={{ 
                  color: 'var(--primary-color)', 
                  fontWeight: '600', 
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <ScheduleIcon style={{ marginRight: '12px', color: 'var(--warning-color)' }} />
                  Upcoming Activities
                </Typography>
                {upcomingActivities.map((activity) => (
                  <Box key={activity.id} mb={2} p={3} style={{ 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '12px',
                    backgroundColor: 'var(--background-color)',
                    transition: 'all 0.2s ease-in-out'
                  }} className="activity-card">
                    <Box display="flex" alignItems="center" mb={2}>
                      <Box mr={2}>
                        {activity.icon}
                      </Box>
                      <Box flex={1}>
                        <Typography variant="body1" style={{ fontWeight: '600', marginBottom: '4px' }}>
                          {activity.title}
                        </Typography>
                        <Typography variant="body2" style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>
                          {activity.type} • {activity.description}
                        </Typography>
                        <Typography variant="body2" style={{ 
                          color: 'var(--accent-color)', 
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <ScheduleIcon style={{ fontSize: 16, marginRight: '8px' }} />
                          {activity.date} • {activity.location}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Paper>




            </Col>

            {/* Right Sidebar */}
            <Col className="right__sidebar__dashboard" md={3} xs={12} sm={12}>
              <RightSidebar />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
