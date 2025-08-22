
import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions, 
  Button, 
  Chip, 
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  LinearProgress
} from '@material-ui/core';
import { 
  Search, 
  FilterList, 
  Code, 
  School, 
  TrendingUp,
  Star,
  AccessTime,
  Person
} from '@material-ui/icons';
import { Col, Row } from 'react-bootstrap';
import CourseCard from '../DashBoard/CourseCard/CourseCard';
import CardOfAllCourse from './CardOfCourse/CardOfAllCourse';
import Spinner_comp from '../../components/Spinner/Spinner_comp';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseInfo } from '../../Redux/course/courseAction';

const AllCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { courseInfo } = useSelector((state) => state.course);

  // Software Engineering course categories
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'programming', label: 'Programming' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'mobile-development', label: 'Mobile Development' },
    { value: 'software-design', label: 'Software Design' },
    { value: 'cybersecurity', label: 'Cybersecurity' }
  ];

  const levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  // Fallback software engineering courses if backend fails
  const fallbackCourses = [
    {
      _id: 'se101',
      courseName: 'Introduction to Software Engineering',
      courseDescription: 'Learn the fundamentals of software development, including requirements analysis, design patterns, and project management.',
      courseThumbnail: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
      category: 'software-design',
      level: 'beginner',
      duration: '8 weeks',
      instructor: 'Dr. Sarah Johnson',
      rating: 4.8,
      students: 1250
    },
    {
      _id: 'ds101',
      courseName: 'Data Structures & Algorithms',
      courseDescription: 'Master fundamental data structures and algorithms essential for software development and technical interviews.',
      courseThumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      category: 'programming',
      level: 'intermediate',
      duration: '10 weeks',
      instructor: 'Prof. Michael Chen',
      rating: 4.9,
      students: 2100
    },
    {
      _id: 'web101',
      courseName: 'Full-Stack Web Development',
      courseDescription: 'Build modern web applications using React, Node.js, and MongoDB. Learn both frontend and backend development.',
      courseThumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c072?w=400&h=300&fit=crop',
      category: 'web-development',
      level: 'intermediate',
      duration: '12 weeks',
      instructor: 'Alex Rodriguez',
      rating: 4.7,
      students: 1800
    },
    {
      _id: 'db101',
      courseName: 'Database Design & Management',
      courseDescription: 'Learn database design principles, SQL, and NoSQL databases for scalable applications.',
      courseThumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop',
      category: 'data-science',
      level: 'intermediate',
      duration: '8 weeks',
      instructor: 'Dr. Emily Davis',
      rating: 4.6,
      students: 950
    },
    {
      _id: 'ai101',
      courseName: 'Machine Learning Fundamentals',
      courseDescription: 'Introduction to machine learning algorithms, neural networks, and AI applications in software development.',
      courseThumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      category: 'data-science',
      level: 'advanced',
      duration: '14 weeks',
      instructor: 'Dr. James Wilson',
      rating: 4.9,
      students: 1600
    },
    {
      _id: 'mobile101',
      courseName: 'Mobile App Development',
      courseDescription: 'Build iOS and Android apps using React Native. Learn mobile UI/UX design and app store deployment.',
      courseThumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      category: 'mobile-development',
      level: 'intermediate',
      duration: '10 weeks',
      instructor: 'Maria Garcia',
      rating: 4.5,
      students: 1200
    },
    {
      _id: 'sec101',
      courseName: 'Cybersecurity for Developers',
      courseDescription: 'Learn secure coding practices, vulnerability assessment, and security testing for web applications.',
      courseThumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
      category: 'cybersecurity',
      level: 'advanced',
      duration: '8 weeks',
      instructor: 'David Thompson',
      rating: 4.7,
      students: 800
    },
    {
      _id: 'devops101',
      courseName: 'DevOps & CI/CD',
      courseDescription: 'Master deployment automation, containerization with Docker, and continuous integration practices.',
      courseThumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=300&fit=crop',
      category: 'software-design',
      level: 'advanced',
      duration: '10 weeks',
      instructor: 'Lisa Anderson',
      rating: 4.6,
      students: 1100
    }
  ];

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        await dispatch(fetchCourseInfo());
      } catch (err) {
        console.log('Error loading courses:', err);
        setError('Failed to load courses from server. Showing fallback courses.');
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [dispatch]);

  // Use fallback courses if backend courses are not available
  const availableCourses = courseInfo && courseInfo.length > 0 ? courseInfo : fallbackCourses;

  // Filter courses based on search and filters
  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.courseDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleEnroll = (courseId) => {
    // TODO: Implement enrollment logic
    console.log('Enrolling in course:', courseId);
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner_comp />
        <Typography variant="h6" className="mt-3">
          Loading Software Engineering Courses...
        </Typography>
      </Container>
    );
  }

    return (
    <div className="all-courses-page">
      <Container maxWidth="lg" className="my-4">
        {/* Header Section */}
        <Paper className="p-4 mb-4 text-center" style={{ 
          background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
          color: 'white',
          borderRadius: '16px'
        }}>
          <Typography variant="h3" className="mb-2">
            🚀 Software Engineering Courses
          </Typography>
          <Typography variant="h6">
            Master the skills needed for modern software development
          </Typography>
          <Typography variant="body1" className="mt-2">
            From beginner to advanced, learn programming, web development, data science, and more
          </Typography>
        </Paper>

        {/* Search and Filters */}
        <Paper className="p-3 mb-4" style={{ borderRadius: '12px' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search style={{ color: 'var(--text-secondary)' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>Level</InputLabel>
                <Select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  label="Level"
                >
                  {levels.map((level) => (
                    <MenuItem key={level.value} value={level.value}>
                      {level.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Error Notification */}
        {error && (
          <Paper className="p-3 mb-4" style={{ 
            backgroundColor: 'var(--warning-color)', 
            color: 'white',
            borderRadius: '12px'
          }}>
            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center' }}>
              ⚠️ {error}
            </Typography>
          </Paper>
        )}

        {/* Course Count */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" style={{ color: 'var(--text-primary)' }}>
            {filteredCourses.length} Software Engineering Courses Available
          </Typography>
          <Chip 
            icon={<FilterList />} 
            label={`${filteredCourses.length} courses`}
            style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}
          />
        </Box>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <Grid container spacing={3}>
            {filteredCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={course._id}>
                <Card style={{ 
                  height: '100%', 
                  borderRadius: '12px',
                  transition: 'transform 0.2s ease-in-out',
                  cursor: 'pointer'
                }} className="course-card">
                  <CardMedia
                    component="img"
                    height="200"
                    image={course.courseThumbnail}
                    alt={course.courseName}
                    style={{ objectFit: 'cover' }}
                  />
                  <CardContent style={{ flexGrow: 1 }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Chip 
                        label={course.category?.replace('-', ' ') || 'Software Engineering'} 
                        size="small"
                        style={{ 
                          backgroundColor: 'var(--light-color)', 
                          color: 'var(--text-primary)',
                          textTransform: 'capitalize'
                        }}
                      />
                      <Chip 
                        label={course.level || 'Intermediate'} 
                        size="small"
                        style={{ 
                          backgroundColor: 'var(--accent-color)', 
                          color: 'white',
                          marginLeft: '8px',
                          textTransform: 'capitalize'
                        }}
                      />
                    </Box>
                    
                    <Typography variant="h6" component="h2" className="mb-2" style={{ fontWeight: '600' }}>
                      {course.courseName}
                    </Typography>
                    
                    <Typography variant="body2" color="textSecondary" className="mb-3">
                      {course.courseDescription}
                    </Typography>

                    <Box display="flex" alignItems="center" mb={2}>
                      <Star style={{ fontSize: 16, color: 'var(--warning-color)', marginRight: '4px' }} />
                      <Typography variant="body2" style={{ marginRight: '8px' }}>
                        {course.rating || 4.5}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        ({course.students || 1000}+ students)
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" mb={2}>
                      <AccessTime style={{ fontSize: 16, color: 'var(--text-secondary)', marginRight: '8px' }} />
                      <Typography variant="body2" color="textSecondary">
                        {course.duration || '8 weeks'}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center">
                      <Person style={{ fontSize: 16, color: 'var(--text-secondary)', marginRight: '8px' }} />
                      <Typography variant="body2" color="textSecondary">
                        {course.instructor || 'Expert Instructor'}
               </Typography>
                    </Box>
                  </CardContent>
                  
                  <CardActions className="p-3">
                    <Button 
                      fullWidth
                      variant="contained" 
                      color="primary"
                      onClick={() => handleEnroll(course._id)}
                      style={{ 
                        backgroundColor: 'var(--accent-color)',
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: '600'
                      }}
                    >
                      Enroll Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper className="p-5 text-center" style={{ borderRadius: '12px' }}>
            <Typography variant="h6" color="textSecondary" className="mb-2">
              No courses found matching your criteria
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Try adjusting your search terms or filters
            </Typography>
          </Paper>
        )}
            </Container>
        </div>
    );
};

export default AllCourses;