import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Badge,
  Tabs,
  Tab
} from '@material-ui/core';
import {
  Send,
  Search,
  Add,
  MoreVert,
  AttachFile,
  EmojiEmotions,
  VideoCall,
  Phone,
  Block,
  Report,
  Archive,
  Delete,
  Reply,
  Forward
} from '@material-ui/icons';
import CommonHeader from '../../components/Common/CommonHeader';
import './Messages.css';

const Messages = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const [newChatData, setNewChatData] = useState({
    recipient: '',
    subject: '',
    message: ''
  });

  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Lecturer',
      subject: 'Physics 101',
      lastMessage: 'Please submit your lab report by Friday',
      timestamp: '2 hours ago',
      unread: 2,
      avatar: 'SJ',
      online: true,
      messages: [
        {
          id: 1,
          sender: 'Dr. Sarah Johnson',
          content: 'Hello! I wanted to discuss your recent quiz performance.',
          timestamp: '2 days ago',
          isOwn: false
        },
        {
          id: 2,
          sender: 'You',
          content: 'Hi Dr. Johnson, thank you for reaching out. I\'d be happy to discuss it.',
          timestamp: '1 day ago',
          isOwn: true
        },
        {
          id: 3,
          sender: 'Dr. Sarah Johnson',
          content: 'Great! Can we meet tomorrow at 2 PM in my office?',
          timestamp: '1 day ago',
          isOwn: false
        },
        {
          id: 4,
          sender: 'You',
          content: 'That works perfectly for me. I\'ll see you then.',
          timestamp: '1 day ago',
          isOwn: true
        },
        {
          id: 5,
          sender: 'Dr. Sarah Johnson',
          content: 'Please submit your lab report by Friday',
          timestamp: '2 hours ago',
          isOwn: false
        }
      ]
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Student',
      subject: 'Study Group',
      lastMessage: 'Are you free to study calculus tonight?',
      timestamp: '1 day ago',
      unread: 0,
      avatar: 'MC',
      online: false,
      messages: [
        {
          id: 1,
          sender: 'Mike Chen',
          content: 'Hey! Are you free to study calculus tonight?',
          timestamp: '1 day ago',
          isOwn: false
        }
      ]
    },
    {
      id: 3,
      name: 'Dr. Robert Williams',
      role: 'Lecturer',
      subject: 'Chemistry Lab',
      lastMessage: 'Your experiment results look excellent!',
      timestamp: '3 days ago',
      unread: 0,
      avatar: 'RW',
      online: false,
      messages: [
        {
          id: 1,
          sender: 'Dr. Robert Williams',
          content: 'Your experiment results look excellent! Great work on the titration.',
          timestamp: '3 days ago',
          isOwn: false
        }
      ]
    }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleChatSelect = (conversation) => {
    setSelectedChat(conversation);
  };

  const handleSendMessage = () => {
    if (messageText.trim() && selectedChat) {
      const newMessage = {
        id: Date.now(),
        sender: 'You',
        content: messageText,
        timestamp: 'Just now',
        isOwn: true
      };
      
      // Update the conversation with the new message
      const updatedConversations = conversations.map(conv => 
        conv.id === selectedChat.id 
          ? { ...conv, messages: [...conv.messages, newMessage], lastMessage: messageText, timestamp: 'Just now' }
          : conv
      );
      
      // In a real app, you would update the state here
      console.log('Message sent:', messageText);
      setMessageText('');
    }
  };

  const handleNewChat = () => {
    if (newChatData.recipient && newChatData.message) {
      console.log('New chat created:', newChatData);
      setNewChatData({ recipient: '', subject: '', message: '' });
      setShowNewChat(false);
    }
  };

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="messages-page">
      <CommonHeader title="Messages" />
      
      <Container maxWidth="lg" className="mt-4">
        {/* Header Section */}
        <Paper className="p-4 mb-4 text-center" style={{ 
          background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
          color: 'white',
          borderRadius: '16px'
        }}>
          <Typography variant="h4" className="mb-2">
            💬 Communication Hub
          </Typography>
          <Typography variant="body1">
            Connect with lecturers, fellow students, and stay updated on your academic journey
          </Typography>
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
            <Tab label="All Messages" />
            <Tab label="Lecturers" />
            <Tab label="Students" />
            <Tab label="Study Groups" />
          </Tabs>
        </Paper>

        <Grid container spacing={3}>
          {/* Conversations List */}
          <Grid item xs={12} md={4}>
            <Paper className="p-3">
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" style={{ color: 'var(--primary-color)' }}>
                  Conversations
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Add />}
                  onClick={() => setShowNewChat(true)}
                  style={{ backgroundColor: 'var(--accent-color)' }}
                >
                  New Chat
                </Button>
              </Box>
              
              <TextField
                fullWidth
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <Search style={{ marginRight: '8px', color: 'var(--text-secondary)' }} />
                }}
                className="mb-3"
                size="small"
              />
              
              <List style={{ maxHeight: '600px', overflow: 'auto' }}>
                {filteredConversations.map((conversation) => (
                  <React.Fragment key={conversation.id}>
                    <ListItem 
                      button 
                      onClick={() => handleChatSelect(conversation)}
                      selected={selectedChat?.id === conversation.id}
                      style={{ borderRadius: '8px', marginBottom: '4px' }}
                    >
                      <ListItemAvatar>
                        <Badge
                          color="primary"
                          variant="dot"
                          invisible={!conversation.online}
                        >
                          <Avatar style={{ backgroundColor: 'var(--accent-color)' }}>
                            {conversation.avatar}
                          </Avatar>
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                              {conversation.name}
                            </Typography>
                            {conversation.unread > 0 && (
                              <Chip
                                label={conversation.unread}
                                size="small"
                                style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="caption" color="textSecondary">
                              {conversation.role} • {conversation.subject}
                            </Typography>
                            <Typography variant="body2" noWrap>
                              {conversation.lastMessage}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {conversation.timestamp}
                            </Typography>
                          </Box>
                        }
                      />
                      <IconButton size="small">
                        <MoreVert />
                      </IconButton>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Chat Area */}
          <Grid item xs={12} md={8}>
            {selectedChat ? (
              <Paper className="chat-area">
                {/* Chat Header */}
                <Box p={2} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center">
                      <Avatar style={{ backgroundColor: 'var(--accent-color)', marginRight: '12px' }}>
                        {selectedChat.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                          {selectedChat.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {selectedChat.role} • {selectedChat.subject}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton size="small" style={{ marginRight: '8px' }}>
                        <VideoCall />
                      </IconButton>
                      <IconButton size="small" style={{ marginRight: '8px' }}>
                        <Phone />
                      </IconButton>
                      <IconButton size="small">
                        <MoreVert />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>

                {/* Messages */}
                <Box p={2} style={{ height: '400px', overflow: 'auto' }}>
                  {selectedChat.messages.map((message) => (
                    <Box
                      key={message.id}
                      display="flex"
                      justifyContent={message.isOwn ? 'flex-end' : 'flex-start'}
                      mb={2}
                    >
                      <Box
                        maxWidth="70%"
                        p={2}
                        style={{
                          backgroundColor: message.isOwn ? 'var(--accent-color)' : 'var(--light-color)',
                          color: message.isOwn ? 'white' : 'inherit',
                          borderRadius: '12px',
                          wordWrap: 'break-word'
                        }}
                      >
                        <Typography variant="body2">
                          {message.content}
                        </Typography>
                        <Typography variant="caption" style={{ opacity: 0.7, marginTop: '4px', display: 'block' }}>
                          {message.timestamp}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Message Input */}
                <Box p={2} style={{ borderTop: '1px solid var(--border-color)' }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <IconButton size="small">
                      <AttachFile />
                    </IconButton>
                    <IconButton size="small">
                      <EmojiEmotions />
                    </IconButton>
                    <TextField
                      fullWidth
                      placeholder="Type your message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      variant="outlined"
                      size="small"
                      style={{ marginRight: '8px' }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      style={{ backgroundColor: 'var(--accent-color)' }}
                    >
                      <Send />
                    </Button>
                  </Box>
                </Box>
              </Paper>
            ) : (
              <Paper className="p-4 text-center" style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box>
                  <Typography variant="h6" color="textSecondary" className="mb-2">
                    Select a conversation to start messaging
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Choose from your existing conversations or start a new one
                  </Typography>
                </Box>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* New Chat Dialog */}
      <Dialog 
        open={showNewChat} 
        onClose={() => setShowNewChat(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Start New Conversation</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Recipient (Name or Email)"
            value={newChatData.recipient}
            onChange={(e) => setNewChatData({ ...newChatData, recipient: e.target.value })}
            className="mb-3"
            margin="dense"
          />
          <TextField
            fullWidth
            label="Subject"
            value={newChatData.subject}
            onChange={(e) => setNewChatData({ ...newChatData, subject: e.target.value })}
            className="mb-3"
            margin="dense"
          />
          <TextField
            fullWidth
            label="Initial Message"
            multiline
            rows={4}
            value={newChatData.message}
            onChange={(e) => setNewChatData({ ...newChatData, message: e.target.value })}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNewChat(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleNewChat}
            variant="contained"
            style={{ backgroundColor: 'var(--accent-color)' }}
          >
            Start Chat
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Messages;