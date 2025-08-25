import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Spinner } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Plus, 
  Search, 
  Filter, 
  SortAsc, 
  Eye, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown,
  Pin,
  Star
} from 'react-feather';
import CreateDiscussionModal from './CreateDiscussionModal';
import DiscussionCard from './DiscussionCard';
import './Forum.css';

const Forum = () => {
  const { courseId } = useParams();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
  
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('lastActivity');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    totalDiscussions: 0,
    totalReplies: 0,
    totalViews: 0
  });

  const categories = ['General', 'Academic', 'Technical', 'Social', 'Announcement'];
  const sortOptions = [
    { value: 'createdAt', label: 'Date Created' },
    { value: 'lastActivity', label: 'Last Activity' },
    { value: 'viewCount', label: 'Views' },
    { value: 'replyCount', label: 'Replies' }
  ];

  useEffect(() => {
    if (courseId) {
      fetchDiscussions();
      fetchStats();
    }
  }, [courseId, currentPage, selectedCategory, sortBy, sortOrder]);

  const fetchDiscussions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      
      let url = `/discussions/course/${courseId}?page=${currentPage}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }
      if (searchTerm) {
        url += `&q=${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setDiscussions(data.discussions);
        setTotalPages(data.totalPages);
      } else {
        console.error('Failed to fetch discussions');
      }
    } catch (error) {
      console.error('Error fetching discussions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/analytics/course/${courseId}/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchDiscussions();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    setCurrentPage(1);
  };

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  const handleDiscussionCreated = (newDiscussion) => {
    setDiscussions(prev => [newDiscussion, ...prev]);
    setShowCreateModal(false);
    fetchStats(); // Refresh stats
  };

  const handleDiscussionUpdated = (updatedDiscussion) => {
    setDiscussions(prev => 
      prev.map(d => d._id === updatedDiscussion._id ? updatedDiscussion : d)
    );
  };

  const handleDiscussionDeleted = (discussionId) => {
    setDiscussions(prev => prev.filter(d => d._id !== discussionId));
    fetchStats(); // Refresh stats
  };

  const canCreateDiscussion = user && (
    user.role === 'Lecturer' || 
    user.role === 'Admin' || 
    user.role === 'Student'
  );

  if (!courseId) {
    return (
      <Container className="mt-4">
        <div className="text-center">
          <h3>No Course Selected</h3>
          <p>Please select a course to view its forum.</p>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="forum-container">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-1">Course Forum</h2>
              <p className="text-muted mb-0">
                Engage with your peers and instructors
              </p>
            </div>
            {canCreateDiscussion && (
              <Button 
                variant="primary" 
                onClick={() => setShowCreateModal(true)}
                className="d-flex align-items-center gap-2"
              >
                <Plus size={16} />
                New Discussion
              </Button>
            )}
          </div>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body className="text-center">
              <h3 className="text-primary mb-1">{stats.totalDiscussions}</h3>
              <p className="text-muted mb-0">Total Discussions</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body className="text-center">
              <h3 className="text-success mb-1">{stats.totalReplies}</h3>
              <p className="text-muted mb-0">Total Replies</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body className="text-center">
              <h3 className="text-info mb-1">{stats.totalViews}</h3>
              <p className="text-muted mb-0">Total Views</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Search and Filters */}
      <Row className="mb-4">
        <Col md={8}>
          <Form onSubmit={handleSearch} className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Search discussions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" variant="outline-secondary">
              <Search size={16} />
            </Button>
          </Form>
        </Col>
        <Col md={4}>
          <div className="d-flex gap-2 justify-content-end">
            <Form.Select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-auto"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
            <Button
              variant="outline-secondary"
              onClick={() => handleSortChange(sortBy)}
              className="d-flex align-items-center"
            >
              <SortAsc size={16} />
            </Button>
          </div>
        </Col>
      </Row>

      {/* Category Filters */}
      <Row className="mb-4">
        <Col>
          <div className="category-filters">
            <Button
              variant={selectedCategory === '' ? 'primary' : 'outline-primary'}
              onClick={() => handleCategoryChange('')}
              className="me-2 mb-2"
            >
              All
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'outline-primary'}
                onClick={() => handleCategoryChange(category)}
                className="me-2 mb-2"
              >
                {category}
              </Button>
            ))}
          </div>
        </Col>
      </Row>

      {/* Discussions List */}
      <Row>
        <Col>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading discussions...</p>
            </div>
          ) : discussions.length === 0 ? (
            <div className="text-center py-5">
              <h4>No discussions found</h4>
              <p className="text-muted">
                {searchTerm || selectedCategory 
                  ? 'Try adjusting your search or filters'
                  : 'Be the first to start a discussion!'
                }
              </p>
              {canCreateDiscussion && (
                <Button 
                  variant="primary" 
                  onClick={() => setShowCreateModal(true)}
                >
                  Create First Discussion
                </Button>
              )}
            </div>
          ) : (
            <div className="discussions-list">
              {discussions.map(discussion => (
                <DiscussionCard
                  key={discussion._id}
                  discussion={discussion}
                  onUpdate={handleDiscussionUpdated}
                  onDelete={handleDiscussionDeleted}
                  currentUser={user}
                />
              ))}
            </div>
          )}
        </Col>
      </Row>

      {/* Pagination */}
      {totalPages > 1 && (
        <Row className="mt-4">
          <Col>
            <div className="d-flex justify-content-center">
              <div className="pagination-wrapper">
                <Button
                  variant="outline-primary"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="me-2"
                >
                  Previous
                </Button>
                
                <span className="mx-3">
                  Page {currentPage} of {totalPages}
                </span>
                
                <Button
                  variant="outline-primary"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      )}

      {/* Create Discussion Modal */}
      <CreateDiscussionModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onDiscussionCreated={handleDiscussionCreated}
        courseId={courseId}
        currentUser={user}
      />
    </Container>
  );
};

export default Forum;

