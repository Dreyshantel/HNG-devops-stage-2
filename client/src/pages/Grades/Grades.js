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
  TextField
} from '@material-ui/core';
import {
  Assessment,
  TrendingUp,
  School,
  Assignment,
  Quiz,
  Grade,
  FilterList,
  GetApp,
  Print,
  Visibility
} from '@material-ui/icons';
import CommonHeader from '../../components/Common/CommonHeader';
import './Grades.css';

const Grades = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSemester, setSelectedSemester] = useState('current');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [showGradeDetails, setShowGradeDetails] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);

  // Mock data for grades
  const semesters = [
    { value: 'current', label: 'Current Semester (Spring 2024)' },
    { value: 'fall2023', label: 'Fall 2023' },
    { value: 'spring2023', label: 'Spring 2023' }
  ];

  const courses = [
    { value: 'all', label: 'All Courses' },
    { value: 'math101', label: 'Mathematics 101' },
    { value: 'physics101', label: 'Physics 101' },
    { value: 'chemistry101', label: 'Chemistry 101' },
    { value: 'english101', label: 'English 101' }
  ];

  const gradeData = [
    {
      id: 1,
      courseCode: 'MATH101',
      courseName: 'Mathematics Fundamentals',
      instructor: 'Dr. Smith',
      credits: 3,
      assignments: [
        { name: 'Quiz 1', score: 85, maxScore: 100, weight: 15, grade: 'B' },
        { name: 'Midterm Exam', score: 78, maxScore: 100, weight: 25, grade: 'C+' },
        { name: 'Final Exam', score: 92, maxScore: 100, weight: 35, grade: 'A-' },
        { name: 'Homework', score: 88, maxScore: 100, weight: 25, grade: 'B+' }
      ],
      finalGrade: 'B+',
      gpa: 3.3,
      semester: 'current'
    },
    {
      id: 2,
      courseCode: 'PHYS101',
      courseName: 'Introduction to Physics',
      instructor: 'Dr. Johnson',
      credits: 4,
      assignments: [
        { name: 'Lab Reports', score: 90, maxScore: 100, weight: 20, grade: 'A-' },
        { name: 'Midterm Exam', score: 85, maxScore: 100, weight: 30, grade: 'B' },
        { name: 'Final Exam', score: 88, maxScore: 100, weight: 35, grade: 'B+' },
        { name: 'Participation', score: 95, maxScore: 100, weight: 15, grade: 'A' }
      ],
      finalGrade: 'B+',
      gpa: 3.3,
      semester: 'current'
    },
    {
      id: 3,
      courseCode: 'CHEM101',
      courseName: 'General Chemistry',
      instructor: 'Dr. Williams',
      credits: 4,
      assignments: [
        { name: 'Lab Work', score: 88, maxScore: 100, weight: 25, grade: 'B+' },
        { name: 'Midterm Exam', score: 82, maxScore: 100, weight: 30, grade: 'B-' },
        { name: 'Final Exam', score: 85, maxScore: 100, weight: 35, grade: 'B' },
        { name: 'Quizzes', score: 90, maxScore: 100, weight: 10, grade: 'A-' }
      ],
      finalGrade: 'B',
      gpa: 3.0,
      semester: 'current'
    }
  ];

  const overallStats = {
    totalCredits: 11,
    currentGPA: 3.2,
    totalCourses: 3,
    completedCourses: 0,
    inProgressCourses: 3
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleGradeClick = (grade) => {
    setSelectedGrade(grade);
    setShowGradeDetails(true);
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'var(--success-color)';
    if (grade.startsWith('B')) return 'var(--accent-color)';
    if (grade.startsWith('C')) return 'var(--warning-color)';
    if (grade.startsWith('D') || grade.startsWith('F')) return 'var(--danger-color)';
    return 'var(--text-secondary)';
  };

  const filteredGrades = gradeData.filter(grade => {
    const matchesSemester = selectedSemester === 'all' || grade.semester === selectedSemester;
    const matchesCourse = selectedCourse === 'all' || grade.courseCode.toLowerCase().includes(selectedCourse.toLowerCase());
    return matchesSemester && matchesCourse;
  });

  return (
    <div className="grades-page">
      <CommonHeader title="Grades & Performance" />
      
      <Container maxWidth="lg" className="mt-4">
        {/* Header Section */}
        <Paper className="p-4 mb-4 text-center" style={{ 
          background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
          color: 'white',
          borderRadius: '16px'
        }}>
          <Typography variant="h4" className="mb-2">
            📊 Academic Performance Dashboard
          </Typography>
          <Typography variant="body1">
            Track your progress, view detailed grades, and monitor your academic achievements
          </Typography>
        </Paper>

        {/* Overall Statistics */}
        <Grid container spacing={3} className="mb-4">
          <Grid item xs={12} sm={6} md={3}>
            <Card className="stat-card">
              <CardContent className="text-center">
                <School style={{ fontSize: 40, color: 'var(--primary-color)' }} />
                <Typography variant="h4" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
                  {overallStats.currentGPA}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Current GPA
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
                <TrendingUp style={{ fontSize: 40, color: 'var(--success-color)' }} />
                <Typography variant="h4" style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>
                  {overallStats.totalCredits}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Credits
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card className="stat-card">
              <CardContent className="text-center">
                <Grade style={{ fontSize: 40, color: 'var(--warning-color)' }} />
                <Typography variant="h4" style={{ color: 'var(--warning-color)', fontWeight: 'bold' }}>
                  {overallStats.completedCourses}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Completed
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filters */}
        <Paper className="p-3 mb-4">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Semester</InputLabel>
                <Select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                >
                  {semesters.map((semester) => (
                    <MenuItem key={semester.value} value={semester.value}>
                      {semester.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Course</InputLabel>
                <Select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  {courses.map((course) => (
                    <MenuItem key={course.value} value={course.value}>
                      {course.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" gap={1}>
                <Button
                  variant="outlined"
                  startIcon={<GetApp />}
                  style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
                >
                  Export
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Print />}
                  style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}
                >
                  Print
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Tabs */}
        <Paper className="mb-4">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Course Grades" />
            <Tab label="Performance Trends" />
            <Tab label="Grade History" />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Paper className="p-4">
            <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
              <Assessment style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Course Grades
            </Typography>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Course</TableCell>
                    <TableCell>Instructor</TableCell>
                    <TableCell>Credits</TableCell>
                    <TableCell>Final Grade</TableCell>
                    <TableCell>GPA</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredGrades.map((grade) => (
                    <TableRow key={grade.id} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                            {grade.courseCode}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {grade.courseName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{grade.instructor}</TableCell>
                      <TableCell>{grade.credits}</TableCell>
                      <TableCell>
                        <Chip
                          label={grade.finalGrade}
                          style={{ 
                            backgroundColor: getGradeColor(grade.finalGrade),
                            color: 'white',
                            fontWeight: 'bold'
                          }}
                        />
                      </TableCell>
                      <TableCell>{grade.gpa}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          startIcon={<Visibility />}
                          onClick={() => handleGradeClick(grade)}
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
          <Paper className="p-4">
            <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
              <TrendingUp style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Performance Trends
            </Typography>
            
            <Grid container spacing={3}>
              {filteredGrades.map((grade) => (
                <Grid item xs={12} md={6} key={grade.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" className="mb-2">
                        {grade.courseCode} - {grade.courseName}
                      </Typography>
                      
                      {grade.assignments.map((assignment, index) => (
                        <Box key={index} mb={2}>
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="body2">
                              {assignment.name}
                            </Typography>
                            <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                              {assignment.score}/{assignment.maxScore} ({assignment.grade})
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={(assignment.score / assignment.maxScore) * 100}
                            style={{ 
                              height: 8, 
                              borderRadius: 4,
                              backgroundColor: 'var(--light-color)'
                            }}
                          />
                        </Box>
                      ))}
                      
                      <Box mt={2} p={2} style={{ backgroundColor: 'var(--light-color)', borderRadius: '8px' }}>
                        <Typography variant="body2" align="center">
                          Final Grade: <strong style={{ color: getGradeColor(grade.finalGrade) }}>{grade.finalGrade}</strong>
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

        {activeTab === 2 && (
          <Paper className="p-4">
            <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
              <School style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Grade History
            </Typography>
            
            <Typography variant="body1" color="textSecondary" align="center">
              Your complete academic history will be displayed here as you progress through your studies.
            </Typography>
          </Paper>
        )}
      </Container>

      {/* Grade Details Dialog */}
      <Dialog 
        open={showGradeDetails} 
        onClose={() => setShowGradeDetails(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Grade Details - {selectedGrade?.courseCode}
        </DialogTitle>
        <DialogContent>
          {selectedGrade && (
            <Box>
              <Typography variant="h6" className="mb-3">
                {selectedGrade.courseName}
              </Typography>
              
              <Grid container spacing={2} className="mb-3">
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">Instructor</Typography>
                  <Typography variant="body1">{selectedGrade.instructor}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">Credits</Typography>
                  <Typography variant="body1">{selectedGrade.credits}</Typography>
                </Grid>
              </Grid>
              
              <Typography variant="h6" className="mb-2">Assignment Breakdown</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Assignment</TableCell>
                      <TableCell>Score</TableCell>
                      <TableCell>Weight</TableCell>
                      <TableCell>Grade</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedGrade.assignments.map((assignment, index) => (
                      <TableRow key={index}>
                        <TableCell>{assignment.name}</TableCell>
                        <TableCell>{assignment.score}/{assignment.maxScore}</TableCell>
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
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowGradeDetails(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Grades;