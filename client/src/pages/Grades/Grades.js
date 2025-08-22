import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core';
import {
  Assessment,
  TrendingUp,
  School,
  Assignment,
  QuestionAnswer,
  Code,
  FilterList,
  GetApp,
  Print,
  Visibility,
  CheckCircle,
  Schedule,
  Star,
  EmojiEvents
} from '@material-ui/icons';
import CommonHeader from '../../components/Common/CommonHeader';
import './Grades.css';

const Grades = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSemester, setSelectedSemester] = useState('current');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [showPerformanceDetails, setShowPerformanceDetails] = useState(false);
  const [selectedPerformance, setSelectedPerformance] = useState(null);

  // Software Engineering focused semesters
  const semesters = [
    { value: 'current', label: 'Current Semester (Second Semester 2024)' },
    { value: 'second2023', label: 'Second Semester 2023' },
    { value: 'first2023', label: 'First Semester 2023' }
  ];

  // Software Engineering courses
  const courses = [
    { value: 'all', label: 'All Courses' },
    { value: 'se101', label: 'Introduction to Software Engineering' },
    { value: 'ds101', label: 'Data Structures & Algorithms' },
    { value: 'db101', label: 'Database Systems' },
    { value: 'web101', label: 'Web Development' },
    { value: 'ai101', label: 'Artificial Intelligence' }
  ];

  // Performance data focused on software engineering skills
  const performanceData = [
    {
      id: 1,
      courseCode: 'SE101',
      courseName: 'Introduction to Software Engineering',
      instructor: 'Dr. Smith',
      credits: 3,
      assignments: [
        { name: 'Software Design Quiz', score: 85, maxScore: 100, weight: 15, type: 'Quiz' },
        { name: 'Requirements Analysis', score: 78, maxScore: 100, weight: 25, type: 'Assignment' },
        { name: 'Final Project', score: 92, maxScore: 100, weight: 35, type: 'Project' },
        { name: 'Code Review', score: 88, maxScore: 100, weight: 25, type: 'Assignment' }
      ],
      finalGrade: 'B+',
      performanceScore: 85.8,
      semester: 'current',
      skills: ['Software Design', 'Requirements Analysis', 'Project Management', 'Code Quality']
    },
    {
      id: 2,
      courseCode: 'DS101',
      courseName: 'Data Structures & Algorithms',
      instructor: 'Dr. Johnson',
      credits: 4,
      assignments: [
        { name: 'Algorithm Implementation', score: 90, maxScore: 100, weight: 20, type: 'Assignment' },
        { name: 'Data Structure Quiz', score: 85, maxScore: 100, weight: 30, type: 'Quiz' },
        { name: 'Final Exam', score: 88, maxScore: 100, weight: 35, type: 'Exam' },
        { name: 'Coding Challenges', score: 95, maxScore: 100, weight: 15, type: 'Assignment' }
      ],
      finalGrade: 'B+',
      performanceScore: 89.5,
      semester: 'current',
      skills: ['Algorithm Design', 'Data Structures', 'Problem Solving', 'Coding']
    },
    {
      id: 3,
      courseCode: 'DB101',
      courseName: 'Database Systems',
      instructor: 'Dr. Williams',
      credits: 4,
      assignments: [
        { name: 'Database Design', score: 88, maxScore: 100, weight: 25, type: 'Project' },
        { name: 'SQL Quiz', score: 82, maxScore: 100, weight: 30, type: 'Quiz' },
        { name: 'Final Project', score: 85, maxScore: 100, weight: 35, type: 'Project' },
        { name: 'Database Optimization', score: 90, maxScore: 100, weight: 10, type: 'Assignment' }
      ],
      finalGrade: 'B',
      performanceScore: 86.3,
      semester: 'current',
      skills: ['Database Design', 'SQL', 'Data Modeling', 'Performance Optimization']
    }
  ];

  // Performance statistics - no GPA
  const overallStats = {
    totalCredits: 11,
    averagePerformance: 87.2,
    totalCourses: 3,
    completedCourses: 0,
    inProgressCourses: 3,
    totalAssignments: 12,
    completedAssignments: 12,
    averageQuizScore: 84.0,
    averageProjectScore: 88.3
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handlePerformanceClick = (performance) => {
    setSelectedPerformance(performance);
    setShowPerformanceDetails(true);
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'var(--success-color)';
    if (grade.startsWith('B')) return 'var(--accent-color)';
    if (grade.startsWith('C')) return 'var(--warning-color)';
    if (grade.startsWith('D') || grade.startsWith('F')) return 'var(--danger-color)';
    return 'var(--text-secondary)';
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'var(--success-color)';
    if (score >= 80) return 'var(--accent-color)';
    if (score >= 70) return 'var(--warning-color)';
    return 'var(--danger-color)';
  };

  const filteredPerformance = performanceData.filter(performance => {
    const matchesSemester = selectedSemester === 'all' || performance.semester === selectedSemester;
    const matchesCourse = selectedCourse === 'all' || performance.courseCode.toLowerCase().includes(selectedCourse.toLowerCase());
    return matchesSemester && matchesCourse;
  });

  return (
    <div className="grades-page">
      <CommonHeader title="Performance & Learning Analytics" />
      
      <Container maxWidth="lg" className="mt-4">
        {/* Header Section */}
        <Paper className="p-4 mb-4 text-center" style={{ 
          background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
          color: 'white',
          borderRadius: '16px'
        }}>
          <Typography variant="h4" className="mb-2">
            📊 Learning Performance Dashboard
          </Typography>
          <Typography variant="body1">
            Track your software engineering skills development, project performance, and learning progress
          </Typography>
        </Paper>

        {/* Overall Performance Statistics */}
        <Grid container spacing={3} className="mb-4">
          <Grid item xs={12} sm={6} md={3}>
            <Card className="stat-card">
              <CardContent className="text-center">
                <TrendingUp style={{ fontSize: 40, color: 'var(--success-color)' }} />
                <Typography variant="h4" style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>
                  {overallStats.averagePerformance}%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Average Performance
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card className="stat-card">
              <CardContent className="text-center">
                <Assignment style={{ fontSize: 40, color: 'var(--accent-color)' }} />
                <Typography variant="h4" style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>
                  {overallStats.totalCourses}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Active Courses
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card className="stat-card">
              <CardContent className="text-center">
                <QuestionAnswer style={{ fontSize: 40, color: 'var(--warning-color)' }} />
                <Typography variant="h4" style={{ color: 'var(--warning-color)', fontWeight: 'bold' }}>
                  {overallStats.averageQuizScore}%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Quiz Average
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card className="stat-card">
              <CardContent className="text-center">
                <Code style={{ fontSize: 40, color: 'var(--primary-color)' }} />
                <Typography variant="h4" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
                  {overallStats.averageProjectScore}%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Project Average
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filters */}
        <Paper className="p-3 mb-4" style={{ borderRadius: '12px' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>Semester</InputLabel>
                <Select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  label="Semester"
                >
                  {semesters.map((semester) => (
                    <MenuItem key={semester.value} value={semester.value}>
                      {semester.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>Course</InputLabel>
                <Select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  label="Course"
                >
                  {courses.map((course) => (
                    <MenuItem key={course.value} value={course.value}>
                      {course.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant="outlined"
                startIcon={<FilterList />}
                  style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
                >
                Apply Filters
                </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Button
                variant="contained"
                startIcon={<GetApp />}
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                Export Report
                </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Performance Tabs */}
        <Paper className="mb-4" style={{ borderRadius: '12px' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Course Performance" />
            <Tab label="Skill Analysis" />
            <Tab label="Progress Tracking" />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Paper className="p-4" style={{ borderRadius: '12px' }}>
            <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
              Course Performance Overview
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>Course</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Performance Score</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Final Grade</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Credits</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPerformance.map((performance) => (
                    <TableRow key={performance.id} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="body1" style={{ fontWeight: '500' }}>
                            {performance.courseCode} - {performance.courseName}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {performance.instructor}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Typography variant="body1" style={{ 
                            fontWeight: 'bold',
                            color: getPerformanceColor(performance.performanceScore),
                            marginRight: '8px'
                          }}>
                            {performance.performanceScore}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={performance.performanceScore}
                            style={{
                              width: 60,
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: 'var(--light-color)'
                            }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={performance.finalGrade}
                          style={{ 
                            backgroundColor: getGradeColor(performance.finalGrade),
                            color: 'white',
                            fontWeight: 'bold'
                          }}
                        />
                      </TableCell>
                      <TableCell>{performance.credits}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          startIcon={<Visibility />}
                          onClick={() => handlePerformanceClick(performance)}
                          style={{ color: 'var(--accent-color)' }}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {activeTab === 1 && (
          <Paper className="p-4" style={{ borderRadius: '12px' }}>
            <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
              Skills Development Analysis
            </Typography>
            <Grid container spacing={3}>
              {filteredPerformance.map((performance) => (
                <Grid item xs={12} md={6} key={performance.id}>
                  <Card style={{ borderRadius: '12px' }}>
                    <CardContent>
                      <Typography variant="h6" className="mb-2" style={{ color: 'var(--primary-color)' }}>
                        {performance.courseName}
                      </Typography>
                      <Box mb={2}>
                        <Typography variant="body2" color="textSecondary" className="mb-1">
                          Key Skills Developed:
                            </Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                          {performance.skills.map((skill, index) => (
                            <Chip
                              key={index}
                              label={skill}
                              size="small"
                              style={{
                                backgroundColor: 'var(--light-color)',
                                color: 'var(--text-primary)'
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color="textSecondary">
                          Performance: {performance.performanceScore}%
                            </Typography>
                        <Chip
                          label={performance.finalGrade}
                          size="small"
                            style={{ 
                            backgroundColor: getGradeColor(performance.finalGrade),
                            color: 'white'
                          }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

        {activeTab === 2 && (
          <Paper className="p-4" style={{ borderRadius: '12px' }}>
            <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
              Learning Progress Tracking
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent>
                    <Typography variant="h6" className="mb-2" style={{ color: 'var(--accent-color)' }}>
                      Assignment Completion
                    </Typography>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Typography variant="h4" style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>
                        {overallStats.completedAssignments}/{overallStats.totalAssignments}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" style={{ marginLeft: '8px' }}>
                        ({Math.round((overallStats.completedAssignments / overallStats.totalAssignments) * 100)}%)
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(overallStats.completedAssignments / overallStats.totalAssignments) * 100}
                      style={{ height: 10, borderRadius: 5 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent>
                    <Typography variant="h6" className="mb-2" style={{ color: 'var(--success-color)' }}>
                      Course Progress
                    </Typography>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Typography variant="h4" style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>
                        {overallStats.inProgressCourses}/{overallStats.totalCourses}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" style={{ marginLeft: '8px' }}>
                        Active Courses
            </Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {overallStats.totalCredits} credits in progress
            </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Container>

      {/* Performance Details Dialog */}
      <Dialog 
        open={showPerformanceDetails}
        onClose={() => setShowPerformanceDetails(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Code style={{ marginRight: '12px', color: 'var(--accent-color)' }} />
            {selectedPerformance?.courseName} - Performance Details
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedPerformance && (
            <Box>
              <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
                Assignment Breakdown
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: 'bold' }}>Assignment</TableCell>
                      <TableCell style={{ fontWeight: 'bold' }}>Type</TableCell>
                      <TableCell style={{ fontWeight: 'bold' }}>Score</TableCell>
                      <TableCell style={{ fontWeight: 'bold' }}>Weight</TableCell>
                      <TableCell style={{ fontWeight: 'bold' }}>Grade</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedPerformance.assignments.map((assignment, index) => (
                      <TableRow key={index}>
                        <TableCell>{assignment.name}</TableCell>
                        <TableCell>
                          <Chip
                            label={assignment.type}
                            size="small"
                            style={{
                              backgroundColor: 'var(--light-color)',
                              color: 'var(--text-primary)'
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {assignment.score}/{assignment.maxScore}
                        </TableCell>
                        <TableCell>{assignment.weight}%</TableCell>
                        <TableCell>
                          <Chip
                            label={assignment.grade}
                            size="small"
                            style={{ 
                              backgroundColor: getGradeColor(assignment.grade),
                              color: 'white'
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box mt={3}>
                <Typography variant="h6" className="mb-2" style={{ color: 'var(--primary-color)' }}>
                  Skills Developed
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {selectedPerformance.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      style={{
                        backgroundColor: 'var(--accent-color)',
                        color: 'white',
                        fontWeight: '500'
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPerformanceDetails(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Grades;