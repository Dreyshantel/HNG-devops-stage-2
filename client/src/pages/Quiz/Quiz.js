import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Box,
  Chip,
  LinearProgress,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  IconButton
} from '@material-ui/core';
import {
  CheckCircle,
  Cancel,
  Timer,
  Assignment,
  School,
  TrendingUp,
  Refresh
} from '@material-ui/icons';
import { useSelector } from 'react-redux';
import CommonHeader from '../../components/Common/CommonHeader';
import './Quiz.css';

const Quiz = () => {
  const { user } = useSelector((state) => state.auth);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [results, setResults] = useState(null);
  const [showReview, setShowReview] = useState(false);

  // Mock quiz data
  const availableQuizzes = [
    {
      id: 1,
      title: "Introduction to Physics",
      course: "Physics 101",
      duration: 30,
      questions: 20,
      difficulty: "Beginner",
      description: "Test your knowledge of basic physics concepts including mechanics, thermodynamics, and waves."
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      course: "Calculus II",
      duration: 45,
      questions: 25,
      difficulty: "Advanced",
      description: "Comprehensive test covering integration techniques, series, and multivariable calculus."
    },
    {
      id: 3,
      title: "Chemistry Fundamentals",
      course: "General Chemistry",
      duration: 25,
      questions: 15,
      difficulty: "Intermediate",
      description: "Test your understanding of atomic structure, chemical bonding, and reactions."
    }
  ];

  // Mock questions for Physics quiz
  const physicsQuestions = [
    {
      id: 1,
      question: "What is the SI unit of force?",
      options: ["Newton", "Joule", "Watt", "Pascal"],
      correctAnswer: 0,
      explanation: "The SI unit of force is the Newton (N), defined as the force needed to accelerate 1 kg at 1 m/s²."
    },
    {
      id: 2,
      question: "Which of the following is a vector quantity?",
      options: ["Mass", "Temperature", "Velocity", "Time"],
      correctAnswer: 2,
      explanation: "Velocity is a vector quantity because it has both magnitude and direction."
    },
    {
      id: 3,
      question: "What is the formula for kinetic energy?",
      options: ["KE = mgh", "KE = ½mv²", "KE = mv", "KE = Fd"],
      correctAnswer: 1,
      explanation: "Kinetic energy is calculated using the formula KE = ½mv², where m is mass and v is velocity."
    },
    {
      id: 4,
      question: "Which law states that every action has an equal and opposite reaction?",
      options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Newton's Law of Gravitation"],
      correctAnswer: 2,
      explanation: "Newton's Third Law states that for every action, there is an equal and opposite reaction."
    }
  ];

  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0 && !quizCompleted) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            submitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft, quizCompleted]);

  const startQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setTimeLeft(quiz.duration * 60);
    setQuizStarted(true);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setResults(null);
    setShowReview(false);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < physicsQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const submitQuiz = () => {
    const totalQuestions = physicsQuestions.length;
    const correctAnswers = physicsQuestions.reduce((count, question) => {
      return selectedAnswers[question.id] === question.correctAnswer ? count + 1 : count;
    }, 0);
    
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F';
    
    setResults({
      score,
      grade,
      correctAnswers,
      totalQuestions,
      timeTaken: (currentQuiz.duration * 60) - timeLeft
    });
    
    setQuizCompleted(true);
    setQuizStarted(false);
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setResults(null);
    setShowReview(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (quizStarted && currentQuiz) {
    const currentQuestion = physicsQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / physicsQuestions.length) * 100;

    return (
      <div>
        <CommonHeader title={`Quiz: ${currentQuiz.title}`} />
        <Container maxWidth="md" className="mt-4">
          {/* Quiz Header */}
          <Paper className="p-3 mb-3" style={{ backgroundColor: 'var(--light-color)' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" style={{ color: 'var(--primary-color)' }}>
                Question {currentQuestionIndex + 1} of {physicsQuestions.length}
              </Typography>
              <Box display="flex" alignItems="center">
                <Timer style={{ marginRight: '8px', color: 'var(--accent-color)' }} />
                <Typography variant="h6" style={{ color: timeLeft < 300 ? 'var(--danger-color)' : 'var(--text-primary)' }}>
                  {formatTime(timeLeft)}
                </Typography>
              </Box>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              style={{ marginTop: '16px', height: 8, borderRadius: 4 }}
            />
          </Paper>

          {/* Question */}
          <Paper className="p-4 mb-3">
            <Typography variant="h6" className="mb-3">
              {currentQuestion.question}
            </Typography>
            
            <FormControl component="fieldset">
              <RadioGroup
                value={selectedAnswers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerSelect(currentQuestion.id, parseInt(e.target.value))}
              >
                {currentQuestion.options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={index}
                    control={<Radio />}
                    label={option}
                    style={{
                      margin: '8px 0',
                      padding: '12px',
                      border: selectedAnswers[currentQuestion.id] === index ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                      borderRadius: '8px',
                      backgroundColor: selectedAnswers[currentQuestion.id] === index ? 'var(--light-color)' : 'transparent'
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Paper>

          {/* Navigation */}
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Button
              variant="outlined"
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
              style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
            >
              Previous
            </Button>
            
            {currentQuestionIndex === physicsQuestions.length - 1 ? (
              <Button
                variant="contained"
                onClick={submitQuiz}
                style={{ backgroundColor: 'var(--success-color)' }}
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={nextQuestion}
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                Next Question
              </Button>
            )}
          </Box>

          {/* Question Navigation */}
          <Paper className="p-3">
            <Typography variant="subtitle2" className="mb-2">
              Question Navigation:
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {physicsQuestions.map((_, index) => (
                <Chip
                  key={index}
                  label={index + 1}
                  size="small"
                  onClick={() => setCurrentQuestionIndex(index)}
                  style={{
                    backgroundColor: index === currentQuestionIndex ? 'var(--accent-color)' : 'var(--light-color)',
                    color: index === currentQuestionIndex ? 'white' : 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </Box>
          </Paper>
        </Container>
      </div>
    );
  }

  if (quizCompleted && results) {
    return (
      <div>
        <CommonHeader title="Quiz Results" />
        <Container maxWidth="md" className="mt-4">
          <Paper className="p-4 text-center">
            <Typography variant="h4" className="mb-3" style={{ color: 'var(--primary-color)' }}>
              Quiz Completed!
            </Typography>
            
            <Box display="flex" justifyContent="center" mb={3}>
              <Chip
                icon={<School />}
                label={`Grade: ${results.grade}`}
                size="large"
                style={{
                  backgroundColor: results.grade === 'A' ? 'var(--success-color)' : 
                               results.grade === 'B' ? 'var(--accent-color)' : 
                               results.grade === 'C' ? 'var(--warning-color)' : 'var(--danger-color)',
                  color: 'white',
                  fontSize: '1.2rem',
                  padding: '20px'
                }}
              />
            </Box>

            <Grid container spacing={3} className="mb-4">
              <Grid item xs={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" style={{ color: 'var(--accent-color)' }}>
                      {results.score}%
                    </Typography>
                    <Typography variant="body2">Score</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" style={{ color: 'var(--success-color)' }}>
                      {results.correctAnswers}/{results.totalQuestions}
                    </Typography>
                    <Typography variant="body2">Correct</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" style={{ color: 'var(--warning-color)' }}>
                      {results.totalQuestions - results.correctAnswers}
                    </Typography>
                    <Typography variant="body2">Incorrect</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" style={{ color: 'var(--primary-color)' }}>
                      {Math.floor(results.timeTaken / 60)}:{String(results.timeTaken % 60).padStart(2, '0')}
                    </Typography>
                    <Typography variant="body2">Time Taken</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="center" gap={2}>
              <Button
                variant="contained"
                onClick={() => setShowReview(!showReview)}
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                {showReview ? 'Hide Review' : 'Review Answers'}
              </Button>
              <Button
                variant="outlined"
                onClick={resetQuiz}
                style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}
              >
                Take Another Quiz
              </Button>
            </Box>

            {showReview && (
              <Box mt={4}>
                <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
                  Answer Review
                </Typography>
                {physicsQuestions.map((question, index) => (
                  <Paper key={question.id} className="p-3 mb-2">
                    <Typography variant="body1" className="mb-2">
                      <strong>Q{index + 1}:</strong> {question.question}
                    </Typography>
                    <Box display="flex" alignItems="center" mb={1}>
                      {selectedAnswers[question.id] === question.correctAnswer ? (
                        <CheckCircle style={{ color: 'var(--success-color)', marginRight: '8px' }} />
                      ) : (
                        <Cancel style={{ color: 'var(--danger-color)', marginRight: '8px' }} />
                      )}
                      <Typography variant="body2">
                        Your answer: {question.options[selectedAnswers[question.id] || 0]}
                      </Typography>
                    </Box>
                    {selectedAnswers[question.id] !== question.correctAnswer && (
                      <Box display="flex" alignItems="center">
                        <CheckCircle style={{ color: 'var(--success-color)', marginRight: '8px' }} />
                        <Typography variant="body2">
                          Correct answer: {question.options[question.correctAnswer]}
                        </Typography>
                      </Box>
                    )}
                    <Typography variant="body2" style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                      <strong>Explanation:</strong> {question.explanation}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            )}
          </Paper>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <CommonHeader title="Quiz Center" />
      <Container maxWidth="lg" className="mt-4">
        <Typography variant="h4" className="mb-4" style={{ color: 'var(--primary-color)', textAlign: 'center' }}>
          Available Quizzes
        </Typography>
        
        <Grid container spacing={3}>
          {availableQuizzes.map((quiz) => (
            <Grid item xs={12} md={4} key={quiz.id}>
              <Paper className="p-4 h-100" style={{ borderRadius: '12px' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Assignment style={{ fontSize: 40, color: 'var(--accent-color)', marginRight: '16px' }} />
                  <Box>
                    <Typography variant="h6" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
                      {quiz.title}
                    </Typography>
                    <Typography variant="body2" style={{ color: 'var(--text-secondary)' }}>
                      {quiz.course}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="body2" className="mb-3">
                  {quiz.description}
                </Typography>
                
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Chip
                    label={quiz.difficulty}
                    size="small"
                    style={{
                      backgroundColor: quiz.difficulty === 'Beginner' ? 'var(--success-color)' : 
                                   quiz.difficulty === 'Intermediate' ? 'var(--warning-color)' : 'var(--danger-color)',
                      color: 'white'
                    }}
                  />
                  <Box textAlign="right">
                    <Typography variant="body2" style={{ color: 'var(--text-secondary)' }}>
                      Duration: {quiz.duration} min
                    </Typography>
                    <Typography variant="body2" style={{ color: 'var(--text-secondary)' }}>
                      Questions: {quiz.questions}
                    </Typography>
                  </Box>
                </Box>
                
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => startQuiz(quiz)}
                  style={{ backgroundColor: 'var(--accent-color)' }}
                >
                  Start Quiz
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Quiz Statistics */}
        <Paper className="p-4 mt-5">
          <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
            Your Quiz Performance
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box textAlign="center">
                <Typography variant="h4" style={{ color: 'var(--success-color)' }}>12</Typography>
                <Typography variant="body2">Quizzes Taken</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box textAlign="center">
                <Typography variant="h4" style={{ color: 'var(--accent-color)' }}>85%</Typography>
                <Typography variant="body2">Average Score</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box textAlign="center">
                <Typography variant="h4" style={{ color: 'var(--warning-color)' }}>8</Typography>
                <Typography variant="body2">Certificates Earned</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box textAlign="center">
                <Typography variant="h4" style={{ color: 'var(--primary-color)' }}>156</Typography>
                <Typography variant="body2">Study Hours</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default Quiz;
