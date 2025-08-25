import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Modal, Alert, Spinner, Table } from 'react-bootstrap';
import { Paper, Typography } from '@material-ui/core';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Eye, 
  MessageSquare,
  User,
  Clock,
  AlertTriangle,
  Filter
} from 'react-feather';

const ModerationDashboard = () => {
  const [pendingItems, setPendingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [moderationReason, setModerationReason] = useState('');

  // Mock data for demonstration purposes
  const mockPendingItems = [
    {
      _id: '1',
      type: 'discussion',
      title: 'Best practices for React hooks',
      content: 'I\'m having trouble understanding when to use useEffect vs useMemo. Can someone explain the differences and best practices?',
      author: { userName: 'John Doe', role: 'Student' },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      category: 'Programming'
    },
    {
      _id: '2',
      type: 'reply',
      title: 'Re: Database design patterns',
      content: 'Normalization is key for relational databases. Here are some examples...',
      author: { userName: 'Jane Smith', role: 'Lecturer' },
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      category: 'Database'
    }
  ];

  useEffect(() => {
    // Use mock data for now
    setPendingItems(mockPendingItems);
    setLoading(false);
  }, []);

  const handleModeration = (action, itemId) => {
    setPendingItems(prev => prev.filter(item => item._id !== itemId));
    setShowModal(false);
    setSelectedItem(null);
    setModerationReason('');
  };

  const openModerationModal = (item, action) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container fluid>
      {/* Header */}
      <Paper className="p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Typography variant="h4" className="text-primary mb-2">
              <Shield className="me-2" size={28} />
              Moderation Dashboard
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Review and moderate user-generated content to maintain platform quality
            </Typography>
          </div>
          <div className="d-flex align-items-center">
            <Filter className="me-2" size={20} />
            <select 
              className="form-select"
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="all">All Items</option>
              <option value="discussion">Discussions Only</option>
              <option value="reply">Replies Only</option>
            </select>
          </div>
        </div>
      </Paper>

      {/* Statistics */}
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <div className="bg-warning p-3 rounded-circle d-inline-block mb-3">
                <Clock size={24} className="text-white" />
              </div>
              <h4 className="mb-1">{pendingItems.length}</h4>
              <p className="text-muted mb-0">Pending Review</p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <div className="bg-primary p-3 rounded-circle d-inline-block mb-3">
                <MessageSquare size={24} className="text-white" />
              </div>
              <h4 className="mb-1">
                {pendingItems.filter(item => item.type === 'discussion').length}
              </h4>
              <p className="text-muted mb-0">Discussions</p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <div className="bg-info p-3 rounded-circle d-inline-block mb-3">
                <User size={24} className="text-white" />
              </div>
              <h4 className="mb-1">
                {pendingItems.filter(item => item.type === 'reply').length}
              </h4>
              <p className="text-muted mb-0">Replies</p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <div className="bg-success p-3 rounded-circle d-inline-block mb-3">
                <CheckCircle size={24} className="text-white" />
              </div>
              <h4 className="mb-1">0</h4>
              <p className="text-muted mb-0">Reviewed Today</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Pending Items */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white">
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="mb-0">
                  <AlertTriangle className="me-2" size={20} />
                  Items Pending Review
                </h6>
                <Badge bg="warning" className="fs-6">
                  {pendingItems.length} items
                </Badge>
              </div>
            </Card.Header>
            <Card.Body>
              {pendingItems.length > 0 ? (
                <div>
                  {pendingItems.map((item) => (
                    <Card key={item._id} className="mb-3 border-0 shadow-sm">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center mb-2">
                              <Badge bg={item.type === 'discussion' ? 'primary' : 'info'} className="me-2">
                                {item.type === 'discussion' ? 'Discussion' : 'Reply'}
                              </Badge>
                              <Badge bg="warning">Pending Review</Badge>
                              {item.category && (
                                <Badge bg="secondary" className="ms-2">{item.category}</Badge>
                              )}
                            </div>
                            <h6 className="mb-1">{item.title || item.content.substring(0, 100)}...</h6>
                            <p className="text-muted mb-2">
                              {item.content.length > 200 ? `${item.content.substring(0, 200)}...` : item.content}
                            </p>
                          </div>
                          <div className="text-end">
                            <small className="text-muted d-block">
                              <Clock size={14} className="me-1" />
                              {new Date(item.createdAt).toLocaleDateString()}
                            </small>
                          </div>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <User size={16} className="me-1 text-muted" />
                            <small className="text-muted me-3">{item.author?.userName || 'Unknown User'}</small>
                            <MessageSquare size={16} className="me-1 text-muted" />
                            <small className="text-muted">{item.author?.role || 'Unknown Role'}</small>
                          </div>
                          
                          <div>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                              onClick={() => openModerationModal(item, 'approve')}
                            >
                              <CheckCircle size={16} className="me-1" />
                              Approve
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="me-2"
                              onClick={() => openModerationModal(item, 'reject')}
                            >
                              <XCircle size={16} className="me-1" />
                              Reject
                            </Button>
                            <Button
                              variant="outline-info"
                              size="sm"
                              onClick={() => window.open(`/discussions/${item._id}`, '_blank')}
                            >
                              <Eye size={16} className="me-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted py-5">
                  <CheckCircle size={64} className="mb-3" />
                  <h5>All Caught Up!</h5>
                  <p>No items are currently pending review.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Moderation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedItem && (
              <>
                <Shield className="me-2" size={20} />
                Moderate {selectedItem.type === 'discussion' ? 'Discussion' : 'Reply'}
              </>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <div>
              <h6>Content Preview:</h6>
              <div className="bg-light p-3 rounded mb-3">
                <strong>{selectedItem.title || 'No title'}</strong>
                <p className="mb-0 mt-2">{selectedItem.content}</p>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Moderation Reason (Optional):</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={moderationReason}
                  onChange={(e) => setModerationReason(e.target.value)}
                  placeholder="Provide a reason for this action..."
                />
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          {selectedItem && (
            <>
              <Button 
                variant="success" 
                onClick={() => handleModeration('approve', selectedItem._id)}
              >
                <CheckCircle size={16} className="me-1" />
                Approve
              </Button>
              <Button 
                variant="danger" 
                onClick={() => handleModeration('reject', selectedItem._id)}
              >
                <XCircle size={16} className="me-1" />
                Reject
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ModerationDashboard;
