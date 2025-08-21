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
    category: 'general',
    tags: ''
  });
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    description: '',
    subject: 'physics',
    difficulty: 'beginner'
  });

  // Mock forum data
  const forumPosts = [
    {
      id: 1,
      title: "Understanding Newton's Laws of Motion",
      content: "I've been studying physics and I'm having trouble understanding the practical applications of Newton's laws. Can anyone share some real-world examples?",
      author: "Sarah Johnson",
      authorAvatar: "SJ",
      category: "physics",
      tags: ["physics", "mechanics", "newton-laws"],
      likes: 24,
      dislikes: 2,
      comments: 8,
      timestamp: "2 hours ago",
      isQuestion: true,
      difficulty: "beginner",
      bookmarked: false
    },
    {
      id: 2,
      title: "Calculus Integration Techniques",
      content: "Here's a comprehensive guide to different integration techniques I compiled while studying for my calculus exam. Hope this helps fellow students!",
      author: "Mike Chen",
      authorAvatar: "MC",
      category: "mathematics",
      tags: ["calculus", "integration", "study-guide"],
      likes: 45,
      dislikes: 1,
      comments: 12,
      timestamp: "5 hours ago",
      isQuestion: false,
      difficulty: "intermediate",
      bookmarked: false
    },
    {
      id: 3,
      title: "Chemistry Lab Safety Tips",
      content: "Important safety reminders for the upcoming chemistry lab session. Always wear protective gear and follow proper procedures.",
      author: "Emily Davis",
      authorAvatar: "ED",
      category: "chemistry",
      tags: ["chemistry", "lab-safety", "tips"],
      likes: 31,
      dislikes: 0,
      comments: 5,
      timestamp: "1 day ago",
      isQuestion: false,
      difficulty: "beginner",
      bookmarked: false
    },
    {
      id: 4,
      title: "Help with Organic Chemistry Mechanisms",
      content: "I'm struggling with understanding SN1 and SN2 reactions. Can someone explain the key differences and when to use each mechanism?",
      author: "Alex Rodriguez",
      authorAvatar: "AR",
      category: "chemistry",
      tags: ["organic-chemistry", "reaction-mechanisms", "help"],
      likes: 18,
      dislikes: 3,
      comments: 15,
      timestamp: "2 days ago",
      isQuestion: true,
      difficulty: "advanced",
      bookmarked: false
    }
  ];

  const categories = [
    { value: 'all', label: 'All Topics', icon: <Forum /> },
    { value: 'physics', label: 'Physics', icon: <School /> },
    { value: 'mathematics', label: 'Mathematics', icon: <TrendingUp /> },
    { value: 'chemistry', label: 'Chemistry', icon: <EmojiObjects /> },
    { value: 'biology', label: 'Biology', icon: <Group /> },
    { value: 'general', label: 'General Discussion', icon: <QuestionAnswer /> }
  ];

  const subjects = [
    { value: 'physics', label: 'Physics' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'engineering', label: 'Engineering' }
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
    // Here you would typically send the post to your backend
    console.log('New post:', newPost);
    setNewPost({ title: '', content: '', category: 'general', tags: '' });
    setShowNewPostDialog(false);
  };

  const handleNewQuestion = () => {
    // Here you would typically send the question to your backend
    console.log('New question:', newQuestion);
    setNewQuestion({ title: '', description: '', subject: 'physics', difficulty: 'beginner' });
    setShowQuestionDialog(false);
  };

  const handleLike = (postId) => {
    setForumPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  const handleDislike = (postId) => {
    setForumPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, dislikes: post.dislikes + 1 }
          : post
      )
    );
  };

  const handleComment = (postId) => {
    // Open comment dialog for the specific post
    setSelectedPostId(postId);
    setShowCommentDialog(true);
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

  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    const colors = {
      physics: 'var(--accent-color)',
      mathematics: 'var(--success-color)',
      chemistry: 'var(--warning-color)',
      biology: 'var(--primary-color)',
      'computer-science': 'var(--danger-color)',
      engineering: 'var(--secondary-color)'
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
                      <IconButton size="small" onClick={() => handleLike(post.id)}>
                        <ThumbUp fontSize="small" />
                      </IconButton>
                      <Typography variant="body2">{post.likes}</Typography>
                    </Box>
                    
                    <Box display="flex" alignItems="center" gap={1}>
                      <IconButton size="small" onClick={() => handleDislike(post.id)}>
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
                  <ListItem key={category.value} button>
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
            className="mb-3"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCommentDialog(false)}>
            Cancel
          </Button>
          <Button 
            onClick={() => {
              // Here you would typically send the comment to your backend
              setShowCommentDialog(false);
            }}
            variant="contained"
            style={{ backgroundColor: 'var(--accent-color)' }}
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
