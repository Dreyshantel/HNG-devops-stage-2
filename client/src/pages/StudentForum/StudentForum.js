import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  Avatar,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Fab,
  Tooltip
} from '@material-ui/core';
import {
  Add,
  ThumbUp,
  ThumbDown,
  Comment,
  Share,
  Bookmark,
  Delete,
  Search,
  TrendingUp,
  School,
  Group,
  EmojiObjects,
  QuestionAnswer,
  Forum
} from '@material-ui/icons';
import { useSelector } from 'react-redux';
import CommonHeader from '../../components/Common/CommonHeader';
import './StudentForum.css';

const StudentForum = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [showQuestionDialog, setShowQuestionDialog] = useState(false);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'software-engineering',
    tags: ''
  });
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    description: '',
    subject: 'software-engineering',
    difficulty: 'beginner'
  });
  const [newComment, setNewComment] = useState('');
  const [expandedPosts, setExpandedPosts] = useState(new Set()); // Track which posts show comments
  const [userReactions, setUserReactions] = useState({}); // Track user likes/dislikes for each post

  // Mock forum data - Software Engineering Topics
  const [forumPosts, setForumPosts] = useState([
    {
      id: 1,
      title: "Quality Assurance Best Practices in Software Development",
      content: "I'm working on implementing QA processes in our development team. What are the most effective testing strategies and tools you've used for ensuring code quality?",
      author: "Sarah Johnson",
      authorAvatar: "SJ",
      category: "quality-assurance",
      tags: ["qa", "testing", "software-quality", "best-practices"],
      likes: 24,
      dislikes: 2,
      comments: 8,
      timestamp: "2 hours ago",
      isQuestion: true,
      difficulty: "beginner",
      bookmarked: false,
      commentList: [
        {
          id: 1,
          author: "Mike Chen",
          authorAvatar: "MC",
          content: "I've found that implementing automated testing with Jest and Cypress has significantly improved our code quality. Unit tests for critical functions and integration tests for user flows.",
          timestamp: "1 hour ago",
          likes: 5
        },
        {
          id: 2,
          author: "Emily Davis",
          authorAvatar: "ED",
          content: "Code review is crucial! We use GitHub's pull request system and require at least two approvals before merging. This catches many issues early.",
          timestamp: "45 minutes ago",
          likes: 3
        }
      ]
    },
    {
      id: 2,
      title: "Embedded Systems Programming with C++",
      content: "Here's a comprehensive guide to embedded systems development I compiled while working on IoT projects. Covers real-time constraints, memory management, and hardware interfacing.",
      author: "Mike Chen",
      authorAvatar: "MC",
      category: "embedded-systems",
      tags: ["embedded", "cpp", "iot", "real-time", "hardware"],
      likes: 45,
      dislikes: 1,
      comments: 12,
      timestamp: "5 hours ago",
      isQuestion: false,
      difficulty: "intermediate",
      bookmarked: false,
      commentList: [
        {
          id: 1,
          author: "Alex Rodriguez",
          authorAvatar: "AR",
          content: "Great guide! I especially liked the section on memory management. Have you worked with FreeRTOS? It's excellent for real-time constraints.",
          timestamp: "4 hours ago",
          likes: 8
        },
        {
          id: 2,
          author: "Lisa Wang",
          authorAvatar: "LW",
          content: "This is exactly what I needed for my robotics project. The hardware interfacing examples are very practical.",
          timestamp: "3 hours ago",
          likes: 6
        }
      ]
    },
    {
      id: 3,
      title: "Software Architecture Patterns for Scalable Applications",
      content: "Important architectural considerations for building scalable software systems. Microservices vs Monolith, when to use each approach, and implementation strategies.",
      author: "Emily Davis",
      authorAvatar: "ED",
      category: "software-architecture",
      tags: ["architecture", "microservices", "scalability", "design-patterns"],
      likes: 31,
      dislikes: 0,
      comments: 5,
      timestamp: "1 day ago",
      isQuestion: false,
      difficulty: "beginner",
      bookmarked: false,
      commentList: [
        {
          id: 1,
          author: "David Kim",
          authorAvatar: "DK",
          content: "I've been using the Repository pattern with CQRS for my current project. It's working well for separating read and write operations.",
          timestamp: "23 hours ago",
          likes: 4
        }
      ]
    },
    {
      id: 4,
      title: "Machine Learning Integration in Software Applications",
      content: "I'm struggling with integrating ML models into production software. Can someone explain the best practices for model deployment, versioning, and monitoring?",
      author: "Alex Rodriguez",
      authorAvatar: "AR",
      category: "machine-learning",
      tags: ["ml", "ai", "deployment", "production", "monitoring"],
      likes: 18,
      dislikes: 3,
      comments: 15,
      timestamp: "2 days ago",
      isQuestion: true,
      difficulty: "advanced",
      bookmarked: false,
      commentList: [
        {
          id: 1,
          author: "Sarah Johnson",
          authorAvatar: "SJ",
          content: "I recommend using MLflow for model versioning and deployment. It integrates well with existing CI/CD pipelines and provides excellent monitoring capabilities.",
          timestamp: "2 days ago",
          likes: 12
        },
        {
          id: 2,
          author: "Mike Chen",
          authorAvatar: "MC",
          content: "Don't forget about A/B testing for model performance! We use feature flags to gradually roll out new models.",
          timestamp: "1 day ago",
          likes: 9
        }
      ]
    },
    {
      id: 5,
      title: "DevOps Pipeline Optimization Strategies",
      content: "How to streamline CI/CD pipelines for faster deployments? Looking for tips on reducing build times, automated testing, and deployment strategies.",
      author: "Lisa Wang",
      authorAvatar: "LW",
      category: "devops",
      tags: ["devops", "ci-cd", "automation", "deployment"],
      likes: 32,
      dislikes: 1,
      comments: 9,
      timestamp: "3 days ago",
      isQuestion: true,
      difficulty: "intermediate",
      bookmarked: false,
      commentList: [
        {
          id: 1,
          author: "Emily Davis",
          authorAvatar: "ED",
          content: "We've had great success with Docker layer caching and parallel test execution. Also, consider using GitHub Actions for simpler pipeline management.",
          timestamp: "3 days ago",
          likes: 7
        }
      ]
    },
    {
      id: 6,
      title: "Database Design for Software Engineering Projects",
      content: "Best practices for designing databases in software engineering. Normalization, indexing strategies, and performance optimization techniques.",
      author: "David Kim",
      authorAvatar: "DK",
      category: "database-design",
      tags: ["database", "sql", "normalization", "performance", "indexing"],
      likes: 28,
      dislikes: 2,
      comments: 11,
      timestamp: "4 days ago",
      isQuestion: false,
      difficulty: "intermediate",
      bookmarked: false,
      commentList: [
        {
          id: 1,
          author: "Alex Rodriguez",
          authorAvatar: "AR",
          content: "Great overview! I'd add that considering the read/write ratio is crucial for choosing between different database types.",
          timestamp: "4 days ago",
          likes: 6
        }
      ]
    }
  ]);

  const categories = [
    { value: 'all', label: 'All Topics', icon: <Forum /> },
    { value: 'quality-assurance', label: 'Quality Assurance', icon: <School /> },
    { value: 'embedded-systems', label: 'Embedded Systems', icon: <TrendingUp /> },
    { value: 'software-architecture', label: 'Software Architecture', icon: <EmojiObjects /> },
    { value: 'machine-learning', label: 'Machine Learning', icon: <Group /> },
    { value: 'devops', label: 'DevOps', icon: <QuestionAnswer /> },
    { value: 'database-design', label: 'Database Design', icon: <Forum /> },
    { value: 'general', label: 'General Discussion', icon: <QuestionAnswer /> }
  ];

  const subjects = [
    { value: 'quality-assurance', label: 'Quality Assurance' },
    { value: 'embedded-systems', label: 'Embedded Systems' },
    { value: 'software-architecture', label: 'Software Architecture' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'devops', label: 'DevOps' },
    { value: 'database-design', label: 'Database Design' },
    { value: 'software-engineering', label: 'Software Engineering' },
    { value: 'web-development', label: 'Web Development' }
  ];

  const difficulties = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleNewPost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const newPostObj = {
        id: Date.now(), // Simple ID generation
        title: newPost.title.trim(),
        content: newPost.content.trim(),
        author: "Current User", // This would come from user context
        authorAvatar: "CU",
        category: newPost.category,
        tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        likes: 0,
        dislikes: 0,
        comments: 0,
        timestamp: "Just now",
        isQuestion: false,
        difficulty: "beginner",
        bookmarked: false,
        commentList: []
      };

      // Add the new post to the forum
      setForumPosts(prevPosts => [newPostObj, ...prevPosts]);

      // Reset form and close dialog
      setNewPost({ title: '', content: '', category: 'software-engineering', tags: '' });
      setShowNewPostDialog(false);
    }
  };

  const handleNewQuestion = () => {
    if (newQuestion.title.trim() && newQuestion.description.trim()) {
      const newQuestionObj = {
        id: Date.now(), // Simple ID generation
        title: newQuestion.title.trim(),
        content: newQuestion.description.trim(),
        author: "Current User", // This would come from user context
        authorAvatar: "CU",
        category: newQuestion.subject,
        tags: [newQuestion.subject, newQuestion.difficulty],
        likes: 0,
        dislikes: 0,
        comments: 0,
        timestamp: "Just now",
        isQuestion: true,
        difficulty: newQuestion.difficulty,
        bookmarked: false,
        commentList: []
      };

      // Add the new question to the forum
      setForumPosts(prevPosts => [newQuestionObj, ...prevPosts]);

      // Reset form and close dialog
      setNewQuestion({ title: '', description: '', subject: 'software-engineering', difficulty: 'beginner' });
      setShowQuestionDialog(false);
    }
  };

  const handleLike = (postId) => {
    const currentReaction = userReactions[postId];
    
    // If user already liked this post, remove the like
    if (currentReaction === 'like') {
      setForumPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, likes: post.likes - 1 }
            : post
        )
      );
      setUserReactions(prev => {
        const newReactions = { ...prev };
        delete newReactions[postId];
        return newReactions;
      });
    } 
    // If user disliked this post, remove dislike and add like
    else if (currentReaction === 'dislike') {
      setForumPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, dislikes: post.dislikes - 1, likes: post.likes + 1 }
            : post
        )
      );
      setUserReactions(prev => ({ ...prev, [postId]: 'like' }));
    }
    // If user hasn't reacted, add like
    else {
      setForumPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, likes: post.likes + 1 }
            : post
        )
      );
      setUserReactions(prev => ({ ...prev, [postId]: 'like' }));
    }
  };

  const handleDislike = (postId) => {
    const currentReaction = userReactions[postId];
    
    // If user already disliked this post, remove the dislike
    if (currentReaction === 'dislike') {
      setForumPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, dislikes: post.dislikes - 1 }
            : post
        )
      );
      setUserReactions(prev => {
        const newReactions = { ...prev };
        delete newReactions[postId];
        return newReactions;
      });
    } 
    // If user liked this post, remove like and add dislike
    else if (currentReaction === 'like') {
      setForumPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, likes: post.likes - 1, dislikes: post.dislikes + 1 }
            : post
        )
      );
      setUserReactions(prev => ({ ...prev, [postId]: 'dislike' }));
    }
    // If user hasn't reacted, add dislike
    else {
      setForumPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, dislikes: post.dislikes + 1 }
            : post
        )
      );
      setUserReactions(prev => ({ ...prev, [postId]: 'dislike' }));
    }
  };

  const handleComment = (postId) => {
    // Open comment dialog for the specific post
    setSelectedPostId(postId);
    setShowCommentDialog(true);
  };

  const handleAddComment = () => {
    if (newComment.trim() && selectedPostId) {
      const newCommentObj = {
        id: Date.now(), // Simple ID generation
        author: "Current User", // This would come from user context
        authorAvatar: "CU",
        content: newComment.trim(),
        timestamp: "Just now",
        likes: 0
      };

      setForumPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === selectedPostId 
            ? { 
                ...post, 
                commentList: [...(post.commentList || []), newCommentObj]
              }
            : post
        )
      );

      // Reset comment form and close dialog
      setNewComment('');
      setShowCommentDialog(false);
      setSelectedPostId(null);
    }
  };

  const toggleComments = (postId) => {
    setExpandedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };



  const handleShare = (postId) => {
    const post = forumPosts.find(p => p.id === postId);
    if (post && navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content.substring(0, 100) + '...',
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${post.title}\n\n${post.content}\n\nShared from SEN LMS Forum`);
      alert('Post content copied to clipboard!');
    }
  };

  const handleBookmark = (postId) => {
    setForumPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, bookmarked: !post.bookmarked }
          : post
      )
    );
  };

  const handleDeletePost = (postId) => {
    // Show confirmation dialog before deleting
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      setForumPosts(prevPosts => 
        prevPosts.filter(post => post.id !== postId)
      );
      
      // Also remove any user reactions for this post
      setUserReactions(prev => {
        const newReactions = { ...prev };
        delete newReactions[postId];
        return newReactions;
      });
      
      // Remove from expanded posts if it was expanded
      setExpandedPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    }
  };

  const handleDeleteComment = (postId, commentId) => {
    // Show confirmation dialog before deleting
    if (window.confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
      setForumPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                comments: post.comments - 1,
                commentList: post.commentList.filter(comment => comment.id !== commentId)
              }
            : post
        )
      );
    }
  };

  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    const colors = {
      'quality-assurance': 'var(--accent-color)',
      'embedded-systems': 'var(--success-color)',
      'software-architecture': 'var(--warning-color)',
      'machine-learning': 'var(--primary-color)',
      'devops': 'var(--danger-color)',
      'database-design': 'var(--secondary-color)',
      'software-engineering': 'var(--info-color)',
      'web-development': 'var(--success-color)',
      'general': 'var(--text-secondary)'
    };
    return colors[category] || 'var(--text-secondary)';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'var(--success-color)',
      intermediate: 'var(--warning-color)',
      advanced: 'var(--danger-color)'
    };
    return colors[difficulty] || 'var(--text-secondary)';
  };

  return (
    <div className="student-forum">
      <CommonHeader title="Student Knowledge Forum" />
      
      <Container maxWidth="lg" className="mt-4">
        {/* Header Section */}
        <Paper className="p-4 mb-4 text-center" style={{ 
          background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
          color: 'white',
          borderRadius: '16px'
        }}>
          <Typography variant="h4" className="mb-2">
            🧠 Knowledge Sharing Hub
          </Typography>
          <Typography variant="body1">
            Connect with fellow students, ask questions, share insights, and learn together
          </Typography>
        </Paper>

        {/* Search and Filter Bar */}
        <Paper className="p-3 mb-4">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search posts, questions, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <Search style={{ marginRight: '8px', color: 'var(--text-secondary)' }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      <Box display="flex" alignItems="center">
                        {category.icon}
                        <span style={{ marginLeft: '8px' }}>{category.label}</span>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => setShowNewPostDialog(true)}
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                <Add style={{ marginRight: '8px' }} />
                New Post
              </Button>
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
            variant="fullWidth"
          >
            <Tab label="All Posts" />
            <Tab label="Questions" />
            <Tab label="Study Guides" />
            <Tab label="Discussions" />
          </Tabs>
        </Paper>

        {/* Forum Posts */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {filteredPosts.map((post) => (
              <Card key={post.id} className="mb-3 forum-post-card">
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar style={{ 
                      backgroundColor: getCategoryColor(post.category),
                      marginRight: '12px'
                    }}>
                      {post.authorAvatar}
                    </Avatar>
                    <Box flex={1}>
                      <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                        {post.title}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" style={{ color: 'var(--text-secondary)' }}>
                          by {post.author} • {post.timestamp}
                        </Typography>
                        {post.isQuestion && (
                          <Chip
                            label={post.difficulty}
                            size="small"
                            style={{
                              backgroundColor: getDifficultyColor(post.difficulty),
                              color: 'white',
                              textTransform: 'capitalize'
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>

                  <Typography variant="body1" className="mb-3">
                    {post.content}
                  </Typography>

                  <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                    {post.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        variant="outlined"
                        style={{ borderColor: getCategoryColor(post.category) }}
                      />
                    ))}
                  </Box>

                  <Box display="flex" alignItems="center" gap={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleLike(post.id)}
                        style={{ 
                          color: userReactions[post.id] === 'like' ? '#1976d2' : 'inherit',
                          backgroundColor: userReactions[post.id] === 'like' ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
                          border: userReactions[post.id] === 'like' ? '1px solid #1976d2' : '1px solid transparent',
                          borderRadius: '50%',
                          transition: 'all 0.2s ease-in-out'
                        }}
                      >
                        <ThumbUp fontSize="small" />
                      </IconButton>
                      <Typography variant="body2">{post.likes}</Typography>
                    </Box>
                    
                    <Box display="flex" alignItems="center" gap={1}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDislike(post.id)}
                        style={{ 
                          color: userReactions[post.id] === 'dislike' ? '#1976d2' : 'inherit',
                          backgroundColor: userReactions[post.id] === 'dislike' ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
                          border: userReactions[post.id] === 'dislike' ? '1px solid #1976d2' : '1px solid transparent',
                          borderRadius: '50%',
                          transition: 'all 0.2s ease-in-out'
                        }}
                      >
                        <ThumbDown fontSize="small" />
                      </IconButton>
                      <Typography variant="body2">{post.dislikes}</Typography>
                    </Box>
                    
                    <Box display="flex" alignItems="center" gap={1}>
                      <IconButton size="small" onClick={() => handleComment(post.id)}>
                        <Comment fontSize="small" />
                      </IconButton>
                      <Typography variant="body2">{post.comments}</Typography>
                    </Box>
                    
                    <IconButton size="small" onClick={() => handleShare(post.id)}>
                      <Share fontSize="small" />
                    </IconButton>
                    
                    <IconButton 
                      size="small" 
                      onClick={() => handleBookmark(post.id)}
                      style={{ color: post.bookmarked ? 'var(--accent-color)' : 'inherit' }}
                    >
                      <Bookmark fontSize="small" />
                    </IconButton>
                    
                    {/* Delete Post Button - Only show for posts created by current user */}
                    {post.author === "Current User" && (
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeletePost(post.id)}
                        style={{ color: 'var(--danger-color)' }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
                  </Box>

                  {/* Comments Section */}
                  <Box mt={2} pt={2} borderTop="1px solid var(--border-color)">
                    <Box display="flex" alignItems="center" justifyContent="flex-end" mb={2}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => toggleComments(post.id)}
                        style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
                      >
                        {expandedPosts.has(post.id) ? 'Hide Comments' : 'View Comments'}
                      </Button>
                    </Box>
                    
                    {post.commentList && post.commentList.length > 0 && expandedPosts.has(post.id) && (
                      <Box>
                        {post.commentList.map((comment) => (
                          <Box key={comment.id} mb={2} pl={2} borderLeft="3px solid var(--accent-color)">
                            <Box display="flex" alignItems="center" mb={1}>
                              <Avatar 
                                size="small" 
                                style={{ 
                                  width: 24, 
                                  height: 24, 
                                  fontSize: '0.75rem',
                                  backgroundColor: 'var(--accent-color)',
                                  marginRight: '8px'
                                }}
                              >
                                {comment.authorAvatar}
                              </Avatar>
                              <Typography variant="body2" style={{ fontWeight: 'bold', marginRight: '8px' }}>
                                {comment.author}
                              </Typography>
                              <Typography variant="caption" style={{ color: 'var(--text-secondary)' }}>
                                {comment.timestamp}
                              </Typography>
                            </Box>
                            <Typography variant="body2" style={{ color: 'var(--text-primary)' }}>
                              {comment.content}
                            </Typography>
                            
                            {/* Delete Comment Button - Only show for comments created by current user */}
                            {comment.author === "Current User" && (
                              <Box mt={1} textAlign="right">
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleDeleteComment(post.id, comment.id)}
                                  style={{ color: 'var(--danger-color)', padding: '2px' }}
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              </Box>
                            )}
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Quick Actions */}
            <Paper className="p-3 mb-3">
              <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
                Quick Actions
              </Typography>
              <Button
                variant="contained"
                fullWidth
                className="mb-2"
                onClick={() => setShowQuestionDialog(true)}
                style={{ backgroundColor: 'var(--success-color)' }}
              >
                Ask a Question
              </Button>
              <Button
                variant="outlined"
                fullWidth
                className="mb-2"
                onClick={() => setShowNewPostDialog(true)}
                style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
              >
                Share Knowledge
              </Button>
            </Paper>

            {/* Popular Topics */}
            <Paper className="p-3 mb-3">
              <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
                Popular Topics
              </Typography>
              <List>
                {categories.slice(1).map((category) => (
                  <ListItem 
                    key={category.value} 
                    button
                    onClick={() => {
                      if (category.value === 'general') {
                        // Navigate to general discussion page
                        window.location.href = '/general-discussion';
                      } else {
                        // Filter by category
                        setSelectedCategory(category.value);
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: getCategoryColor(category.value) }}>
                        {category.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={category.label}
                      secondary={`${Math.floor(Math.random() * 50) + 10} posts`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Recent Activity */}
            <Paper className="p-3">
              <Typography variant="h6" className="mb-3" style={{ color: 'var(--primary-color)' }}>
                Recent Activity
              </Typography>
              <List>
                {forumPosts.slice(0, 3).map((post) => (
                  <ListItem key={post.id} dense>
                    <ListItemText
                      primary={post.title}
                      secondary={`${post.author} • ${post.timestamp}`}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* New Post Dialog */}
      <Dialog 
        open={showNewPostDialog} 
        onClose={() => setShowNewPostDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="mb-3"
          />
          <TextField
            fullWidth
            label="Content"
            multiline
            rows={4}
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            className="mb-3"
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                >
                  {categories.slice(1).map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Tags (comma separated)"
                value={newPost.tags}
                onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                placeholder="physics, mechanics, help"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNewPostDialog(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleNewPost}
            variant="contained"
            disabled={!newPost.title.trim() || !newPost.content.trim()}
            style={{ backgroundColor: 'var(--accent-color)' }}
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>

      {/* New Question Dialog */}
      <Dialog 
        open={showQuestionDialog} 
        onClose={() => setShowQuestionDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Ask a Question</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Question Title"
            value={newQuestion.title}
            onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
            className="mb-3"
          />
          <TextField
            fullWidth
            label="Question Description"
            multiline
            rows={4}
            value={newQuestion.description}
            onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
            className="mb-3"
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Subject</InputLabel>
                <Select
                  value={newQuestion.subject}
                  onChange={(e) => setNewQuestion({ ...newQuestion, subject: e.target.value })}
                >
                  {subjects.map((subject) => (
                    <MenuItem key={subject.value} value={subject.value}>
                      {subject.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Difficulty Level</InputLabel>
                <Select
                  value={newQuestion.difficulty}
                  onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                >
                  {difficulties.map((difficulty) => (
                    <MenuItem key={difficulty.value} value={difficulty.value}>
                      {difficulty.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowQuestionDialog(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleNewQuestion}
            variant="contained"
            disabled={!newQuestion.title.trim() || !newQuestion.description.trim()}
            style={{ backgroundColor: 'var(--success-color)' }}
          >
            Ask Question
          </Button>
        </DialogActions>
      </Dialog>

      {/* Comment Dialog */}
      <Dialog 
        open={showCommentDialog} 
        onClose={() => setShowCommentDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Your Comment"
            multiline
            rows={4}
            placeholder="Share your thoughts on this post..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-3"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setShowCommentDialog(false);
            setNewComment('');
            setSelectedPostId(null);
          }}>
            Cancel
          </Button>
          <Button 
            onClick={handleAddComment}
            variant="contained"
            style={{ backgroundColor: 'var(--accent-color)' }}
            disabled={!newComment.trim()}
          >
            Post Comment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Tooltip title="Quick Actions" placement="left">
        <Fab
          color="primary"
          aria-label="add"
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            backgroundColor: 'var(--accent-color)'
          }}
          onClick={() => setShowNewPostDialog(true)}
        >
          <Add />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default StudentForum;
