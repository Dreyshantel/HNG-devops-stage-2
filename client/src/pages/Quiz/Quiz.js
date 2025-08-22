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

  // Software Engineering focused quiz data
  const availableQuizzes = [
    {
      id: 1,
      title: "Introduction to Software Engineering",
      course: "Software Engineering 101",
      duration: 15,
      questions: 30,
      lecturer: "Dr. Jimoh",
      postedDate: "2025-01-20",
      description: "Test your knowledge of software development lifecycle, requirements analysis, and design principles."
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      course: "Computer Science Fundamentals",
      duration: 15,
      questions: 30,
      lecturer: "Dr. Adewole",
      postedDate: "2025-01-22",
      description: "Comprehensive test covering arrays, linked lists, trees, graphs, and algorithm complexity."
    },
    {
      id: 3,
      title: "Web Development Fundamentals",
      course: "Web Technologies",
      duration: 15,
      questions: 30,
      lecturer: "Prof. Akintola",
      postedDate: "2025-01-24",
      description: "Test your understanding of HTML, CSS, JavaScript, and web development concepts."
    }
  ];

  // Software Engineering focused quiz questions
  const softwareEngineeringQuestions = [
    {
      id: 1,
      question: "What is the first phase of the Software Development Life Cycle (SDLC)?",
      options: ["Design", "Requirements Analysis", "Implementation", "Testing"],
      correctAnswer: 1,
      explanation: "Requirements Analysis is the first phase where we gather and analyze user requirements."
    },
    {
      id: 2,
      question: "Which design pattern is used to create objects without specifying their exact class?",
      options: ["Singleton", "Factory", "Observer", "Strategy"],
      correctAnswer: 1,
      explanation: "The Factory pattern creates objects without specifying their exact class."
    },
    {
      id: 3,
      question: "What is the time complexity of binary search on a sorted array?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 1,
      explanation: "Binary search has O(log n) time complexity as it divides the search space in half each iteration."
    },
    {
      id: 4,
      question: "Which principle states that software entities should be open for extension but closed for modification?",
      options: ["DRY", "SOLID", "Open/Closed", "Single Responsibility"],
      correctAnswer: 2,
      explanation: "The Open/Closed Principle states that software entities should be open for extension but closed for modification."
    },
    {
      id: 5,
      question: "What does DRY stand for in software development?",
      options: ["Don't Repeat Yourself", "Do Repeat Yourself", "Design Right Yesterday", "Data Recovery Yield"],
      correctAnswer: 0,
      explanation: "DRY stands for 'Don't Repeat Yourself' - a principle to avoid code duplication."
    },
    {
      id: 6,
      question: "Which testing level focuses on testing individual components in isolation?",
      options: ["Integration Testing", "Unit Testing", "System Testing", "Acceptance Testing"],
      correctAnswer: 1,
      explanation: "Unit Testing focuses on testing individual components or functions in isolation."
    },
    {
      id: 7,
      question: "What is the purpose of a UML diagram in software engineering?",
      options: ["To write code", "To visualize system design", "To debug programs", "To compile code"],
      correctAnswer: 1,
      explanation: "UML diagrams are used to visualize, specify, construct, and document software systems."
    },
    {
      id: 8,
      question: "Which algorithm is used for finding the shortest path in a weighted graph?",
      options: ["Breadth-First Search", "Depth-First Search", "Dijkstra's Algorithm", "Binary Search"],
      correctAnswer: 2,
      explanation: "Dijkstra's Algorithm is used to find the shortest path between nodes in a weighted graph."
    },
    {
      id: 9,
      question: "What is the main purpose of version control systems like Git?",
      options: ["To compile code", "To track changes in source code", "To run tests", "To deploy applications"],
      correctAnswer: 1,
      explanation: "Version control systems track changes in source code and enable collaboration among developers."
    },
    {
      id: 10,
      question: "Which software architecture pattern separates concerns into Model, View, and Controller?",
      options: ["MVC", "MVP", "MVVM", "Repository"],
      correctAnswer: 0,
      explanation: "MVC (Model-View-Controller) separates application logic into three interconnected components."
    },
    {
      id: 11,
      question: "What is the purpose of a constructor in object-oriented programming?",
      options: ["To destroy objects", "To initialize object state", "To inherit from parent class", "To override methods"],
      correctAnswer: 1,
      explanation: "A constructor is a special method used to initialize object state when creating new instances."
    },
    {
      id: 12,
      question: "Which testing technique involves testing with invalid or unexpected inputs?",
      options: ["Positive Testing", "Negative Testing", "Regression Testing", "Performance Testing"],
      correctAnswer: 1,
      explanation: "Negative Testing involves testing with invalid or unexpected inputs to ensure proper error handling."
    },
    {
      id: 13,
      question: "What is the primary goal of software maintenance?",
      options: ["To add new features", "To fix bugs and improve performance", "To rewrite the entire system", "To change programming languages"],
      correctAnswer: 1,
      explanation: "Software maintenance focuses on fixing bugs, improving performance, and adapting to changing requirements."
    },
    {
      id: 14,
      question: "Which data structure operates on a LIFO principle?",
      options: ["Queue", "Stack", "Tree", "Graph"],
      correctAnswer: 1,
      explanation: "A Stack operates on LIFO (Last In, First Out) principle."
    },
    {
      id: 15,
      question: "What is the purpose of an interface in object-oriented programming?",
      options: ["To create objects", "To define a contract for classes", "To store data", "To handle exceptions"],
      correctAnswer: 1,
      explanation: "An interface defines a contract that implementing classes must follow."
    },
    {
      id: 16,
      question: "Which software development methodology emphasizes iterative development?",
      options: ["Waterfall", "Agile", "Spiral", "V-Model"],
      correctAnswer: 1,
      explanation: "Agile methodology emphasizes iterative development with frequent feedback and adaptation."
    },
    {
      id: 17,
      question: "What is the purpose of exception handling in programming?",
      options: ["To improve performance", "To handle runtime errors gracefully", "To compile code faster", "To reduce memory usage"],
      correctAnswer: 1,
      explanation: "Exception handling allows programs to handle runtime errors gracefully without crashing."
    },
    {
      id: 18,
      question: "Which design principle suggests that a class should have only one reason to change?",
      options: ["Open/Closed Principle", "Single Responsibility Principle", "Liskov Substitution Principle", "Interface Segregation Principle"],
      correctAnswer: 1,
      explanation: "The Single Responsibility Principle states that a class should have only one reason to change."
    },
    {
      id: 19,
      question: "What is the purpose of a database index?",
      options: ["To store data", "To improve query performance", "To backup data", "To encrypt data"],
      correctAnswer: 1,
      explanation: "Database indexes improve query performance by providing faster data access paths."
    },
    {
      id: 20,
      question: "Which testing approach involves testing the entire system as a whole?",
      options: ["Unit Testing", "Integration Testing", "System Testing", "Acceptance Testing"],
      correctAnswer: 2,
      explanation: "System Testing involves testing the entire system as a whole to verify it meets requirements."
    },
    {
      id: 21,
      question: "What is the purpose of a software requirement specification (SRS)?",
      options: ["To write code", "To document what the system should do", "To test the system", "To deploy the system"],
      correctAnswer: 1,
      explanation: "An SRS documents what the system should do, not how it should do it."
    },
    {
      id: 22,
      question: "Which algorithm has the best average-case time complexity for sorting?",
      options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
      correctAnswer: 1,
      explanation: "Quick Sort has the best average-case time complexity of O(n log n) for sorting."
    },
    {
      id: 23,
      question: "What is the purpose of a software prototype?",
      options: ["To replace the final system", "To explore requirements and design", "To test performance", "To document the system"],
      correctAnswer: 1,
      explanation: "A prototype helps explore requirements and design before building the final system."
    },
    {
      id: 24,
      question: "Which testing technique involves testing with boundary values?",
      options: ["Equivalence Partitioning", "Boundary Value Analysis", "Decision Table Testing", "State Transition Testing"],
      correctAnswer: 1,
      explanation: "Boundary Value Analysis involves testing with boundary values to find edge case defects."
    },
    {
      id: 25,
      question: "What is the purpose of a software architecture pattern?",
      options: ["To write code", "To provide reusable solutions to common problems", "To debug programs", "To compile code"],
      correctAnswer: 1,
      explanation: "Software architecture patterns provide reusable solutions to common design problems."
    },
    {
      id: 26,
      question: "Which data structure is best for implementing a priority queue?",
      options: ["Array", "Linked List", "Heap", "Stack"],
      correctAnswer: 2,
      explanation: "A Heap is the best data structure for implementing a priority queue due to its efficient operations."
    },
    {
      id: 27,
      question: "What is the purpose of code review in software development?",
      options: ["To compile code", "To improve code quality and find defects", "To deploy applications", "To run tests"],
      correctAnswer: 1,
      explanation: "Code review improves code quality, finds defects, and shares knowledge among team members."
    },
    {
      id: 28,
      question: "Which software testing level focuses on user acceptance?",
      options: ["Unit Testing", "Integration Testing", "System Testing", "Acceptance Testing"],
      correctAnswer: 3,
      explanation: "Acceptance Testing focuses on whether the system meets user requirements and is ready for use."
    },
    {
      id: 29,
      question: "What is the purpose of a software design pattern?",
      options: ["To write code", "To provide proven solutions to common design problems", "To debug programs", "To compile code"],
      correctAnswer: 1,
      explanation: "Design patterns provide proven solutions to common software design problems."
    },
    {
      id: 30,
      question: "Which principle suggests that software should be designed to be easily extended?",
      options: ["Single Responsibility", "Open/Closed", "Liskov Substitution", "Interface Segregation"],
      correctAnswer: 1,
      explanation: "The Open/Closed Principle suggests that software should be open for extension but closed for modification."
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
    if (currentQuestionIndex < softwareEngineeringQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const submitQuiz = () => {
    const totalQuestions = softwareEngineeringQuestions.length;
    const correctAnswers = softwareEngineeringQuestions.reduce((count, question) => {
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
    const currentQuestion = softwareEngineeringQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / softwareEngineeringQuestions.length) * 100;

    return (
      <div>
        <CommonHeader title={`Quiz: ${currentQuiz.title}`} />
        <Container maxWidth="md" className="mt-4">
          {/* Quiz Header */}
          <Paper className="p-3 mb-3" style={{ backgroundColor: 'var(--light-color)' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" style={{ color: 'var(--primary-color)' }}>
                Question {currentQuestionIndex + 1} of {softwareEngineeringQuestions.length}
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
            
            {currentQuestionIndex === softwareEngineeringQuestions.length - 1 ? (
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
              {softwareEngineeringQuestions.map((_, index) => (
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
                {softwareEngineeringQuestions.map((question, index) => (
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
           Lecturer-Posted Quizzes
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
                   <Box>
                     <Typography variant="body2" style={{ color: 'var(--text-secondary)' }}>
                       <strong>Posted by:</strong> {quiz.lecturer}
                     </Typography>
                     <Typography variant="body2" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                       Posted: {quiz.postedDate}
                     </Typography>
                   </Box>
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
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h4" style={{ color: 'var(--success-color)' }}>12</Typography>
                <Typography variant="body2">Quizzes Taken</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h4" style={{ color: 'var(--accent-color)' }}>85%</Typography>
                <Typography variant="body2">Average Score</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
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
