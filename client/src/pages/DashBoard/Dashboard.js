import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import MessageIcon from "@material-ui/icons/Message";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./Dashboard.css";
import styles from "./Dashboard.module.css";
import { Col, Container, Row } from "react-bootstrap";
import {
  Button,
  Divider,
  IconButton,
  Paper,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import Body4Card from "./Body4Card/Body4Card";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CourseCard from "./CourseCard/CourseCard";
import RightSidebar from "./RightSidebar/RightSidebar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BookIcon from "@material-ui/icons/Book";
import ScheduleIcon from "@material-ui/icons/Schedule";
import StarIcon from "@material-ui/icons/Star";

import { useDispatch, useSelector } from "react-redux";
import { fetchCourseInfo } from "../../Redux/course/courseAction";

const Dashboard = () => {
  const [pageValue, setPageValue] = useState(5);
  const { user } = useSelector((state) => state.auth);
  const { courseInfo } = useSelector((state) => state.course);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {
    if (pageValue === "All") {
      dispatch(fetchCourseInfo());
      setPageValue(courseInfo.length);
    } else {
      dispatch(fetchCourseInfo());
    }
  }, [pageValue, dispatch, courseInfo.length]);

  // Mock data for dashboard statistics
  const dashboardStats = [
    {
      title: "Enrolled Courses",
      value: "12",
      icon: <BookIcon style={{ fontSize: 40, color: 'var(--accent-color)' }} />,
      color: "var(--accent-color)",
      progress: 75
    },
    {
      title: "Completed Courses",
      value: "8",
      icon: <AssignmentIcon style={{ fontSize: 40, color: 'var(--success-color)' }} />,
      color: "var(--success-color)",
      progress: 65
    },
    {
      title: "Current GPA",
      value: "3.8",
      icon: <StarIcon style={{ fontSize: 40, color: 'var(--warning-color)' }} />,
      color: "var(--warning-color)",
      progress: 85
    },
    {
      title: "Study Hours",
      value: "156",
      icon: <ScheduleIcon style={{ fontSize: 40, color: 'var(--primary-color)' }} />,
      color: "var(--primary-color)",
      progress: 60
    }
  ];

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: "Course",
      action: "Completed",
      title: "Introduction to Physics",
      time: "2 hours ago",
      icon: <AssignmentIcon style={{ color: 'var(--success-color)' }} />
    },
    {
      id: 2,
      type: "Quiz",
      action: "Started",
      title: "Mathematics Quiz 3",
      time: "4 hours ago",
      icon: <TouchAppIcon style={{ color: 'var(--accent-color)' }} />
    },
    {
      id: 3,
      type: "Discussion",
      action: "Participated in",
      title: "Physics Forum Discussion",
      time: "1 day ago",
      icon: <MessageIcon style={{ color: 'var(--primary-color)' }} />
    },
    {
      id: 4,
      type: "Assignment",
      action: "Submitted",
      title: "Chemistry Lab Report",
      time: "2 days ago",
      icon: <BookIcon style={{ color: 'var(--warning-color)' }} />
    }
  ];

  // Mock upcoming deadlines
  const upcomingDeadlines = [
    {
      id: 1,
      title: "Advanced Mathematics Assignment",
      course: "Calculus II",
      deadline: "Tomorrow, 11:59 PM",
      priority: "High"
    },
    {
      id: 2,
      title: "Physics Lab Report",
      course: "Mechanics",
      deadline: "Friday, 5:00 PM",
      priority: "Medium"
    },
    {
      id: 3,
      title: "Literature Essay",
      course: "World Literature",
      deadline: "Sunday, 11:59 PM",
      priority: "Low"
    }
  ];



  return (
    <div className="dashboard">
      <div className="left__sidebar__dashboard">
        <Sidebar Icon={DashboardIcon} title="Dashboard" link="/" />
        <Sidebar Icon={PersonIcon} title="Profile" link="/profile" />
        <Sidebar Icon={TouchAppIcon} title="Grades" link="/grades" />
        <Sidebar Icon={MessageIcon} title="Messages" link="/messages" />
        <Sidebar
          Icon={SettingsApplicationsIcon}
          title="Preferences"
          link="/preferences"
        />
        <Sidebar Icon={ExitToAppIcon} title="Logout" />
      </div>

      <div className="main__body__dashboard">


        <Container>
          <div className={styles.dashboard__header__name}>
            <h2 className={styles.dashboard__name}>
              Welcome back, {user && user.userName}! 👋
            </h2>
            <Typography variant="body2" style={{ color: 'var(--text-secondary)' }}>
              Here's what's happening with your learning journey today
            </Typography>
          </div>
        </Container>

        {/* Statistics Cards */}
        <Container fluid className="my-4">
          <Row>
            {dashboardStats.map((stat, index) => (
              <Col key={index} md={3} sm={6} xs={12} className="mb-3">
                <Paper className="p-3 shadow" style={{ borderRadius: '12px' }}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="h4" style={{ fontWeight: 'bold', color: stat.color }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" style={{ color: 'var(--text-secondary)' }}>
                        {stat.title}
                      </Typography>
                    </Box>
                    {stat.icon}
                  </Box>
                  <Box mt={2}>
                    <LinearProgress 
                      variant="determinate" 
                      value={stat.progress} 
                      style={{ 
                        height: 6, 
                        borderRadius: 3,
                        backgroundColor: 'var(--light-color)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: stat.color
                        }
                      }} 
                    />
                  </Box>
                </Paper>
              </Col>
            ))}
          </Row>
        </Container>

        <div className="d-flex flex-wrap justify-content-md-between justify-content-md-end mb-4">
          <Body4Card
            link="/messages"
            shortTitle="Communicate"
            title="Message"
            Icon={MessageIcon}
          />
          <Body4Card
            link="/profile"
            shortTitle="Your Profile"
            title="Profile"
            Icon={AccountCircleOutlinedIcon}
          />
          <Body4Card
            link="/settings"
            shortTitle="Preferences"
            title="Settings"
            Icon={SettingsApplicationsIcon}
          />
          <Body4Card
            shortTitle="Performance"
            title="Grades"
            Icon={TouchAppIcon}
          />
          <Body4Card
            link="/quiz"
            shortTitle="Take Tests"
            title="Quiz Center"
            Icon={AssignmentIcon}
          />
          <Body4Card
            link="/student-forum"
            shortTitle="Share Knowledge"
            title="Student Forum"
            Icon={MessageIcon}
          />
        </div>

        <Container fluid className="my-5">
          <Row>
            <Col md={9} xs={12} sm={12}>
              {/* Recent Activities */}
              <Paper className="p-4 mb-4 shadow" style={{ borderRadius: '12px' }}>
                <Typography variant="h6" style={{ color: 'var(--primary-color)', fontWeight: 'bold', marginBottom: '20px' }}>
                  Recent Activities
                </Typography>
                <List>
                  {recentActivities.map((activity) => (
                    <ListItem key={activity.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: 'var(--light-color)' }}>
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

              {/* Upcoming Deadlines */}
              <Paper className="p-4 mb-4 shadow" style={{ borderRadius: '12px' }}>
                <Typography variant="h6" style={{ color: 'var(--primary-color)', fontWeight: 'bold', marginBottom: '20px' }}>
                  Upcoming Deadlines
                </Typography>
                {upcomingDeadlines.map((deadline) => (
                  <Box key={deadline.id} mb={2} p={2} style={{ 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '8px',
                    backgroundColor: 'var(--background-color)'
                  }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body1" style={{ fontWeight: '500' }}>
                        {deadline.title}
                      </Typography>
                      <Chip 
                        label={deadline.priority} 
                        size="small"
                        style={{ 
                          backgroundColor: deadline.priority === 'High' ? 'var(--danger-color)' : 
                                       deadline.priority === 'Medium' ? 'var(--warning-color)' : 'var(--success-color)',
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                    </Box>
                    <Typography variant="body2" style={{ color: 'var(--text-secondary)' }}>
                      Course: {deadline.course}
                    </Typography>
                    <Typography variant="body2" style={{ color: 'var(--accent-color)', fontWeight: '500' }}>
                      Due: {deadline.deadline}
                    </Typography>
                  </Box>
                ))}
              </Paper>

              <Container>
                <Button
                  className="my-2 mb-5"
                  color="primary"
                  variant="contained"
                  style={{ backgroundColor: 'var(--accent-color)' }}
                >
                  Customize This Page
                </Button>
                <div>
                  <Row>
                    <Col>
                      <Paper className="d-flex justify-content-between align-items-center p-2 flex-wrap">
                        <Typography variant="h6">
                          Recently accessed courses
                        </Typography>

                        <div className={styles.icon__style}>
                          <IconButton
                            onClick={() => {
                              if (start === 0 || end === 0) {
                                setEnd(courseInfo.length);
                                setStart(courseInfo.length-1);
                              } else {
                               
                                setStart(start - 1);
                                setEnd(end - 1);
                              }
                              console.log(start,end)
                            }}

                          >
                            <ArrowBackIosIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              if (courseInfo.length === end) {
                                setStart(0);
                                setEnd(1);
                              } else {
                                setStart(start + 1);
                                setEnd(end + 1);
                              }
                            }}
                          >
                            <ArrowForwardIosIcon />
                          </IconButton>
                        </div>
                      </Paper>
                    </Col>
                  </Row>
                </div>

                <Divider />
                {courseInfo.length > 0 &&
                  courseInfo.slice(start, end).map((val) => {
                    return (
                      <CourseCard
                        key={Math.random(2) * 10}
                        title={val.courseDescription}
                        name={val.courseName}
                        id={val._id}
                        img={val.courseThumbnail}
                      />
                    );
                  })}
              </Container>

              <Container className="mt-5">
                <Paper className="d-flex justify-content-between align-items-center p-4">
                  <Typography variant="h6">Courses</Typography>
                </Paper>
                <Divider />

                {courseInfo.length > 0 &&
                  courseInfo.slice(0, pageValue).map((val) => {
                    return (
                      <CourseCard
                        key={Math.random(2) * 10}
                        title={val.courseDescription}
                        name={val.courseName}
                        id={val._id}
                        img={val.courseThumbnail}
                      />
                    );
                  })}

                <div className=" d-flex align-items-center my-2">
                  <Typography className="mr-3" variant="subtitle1">
                    Show
                  </Typography>
                  <select
                    className={styles.dropdown__style}
                    onChange={(e) => setPageValue(e.target.value)}
                  >
                    {[5, 10, 20, "All"].map((val) => {
                      return <option key={val}>{val}</option>;
                    })}
                  </select>
                </div>
              </Container>
            </Col>

            {/* Right Sidebar */}
            <Col className=" right__sidebar__dashboard " md={3} xs={12} sm={12}>
              <RightSidebar />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
