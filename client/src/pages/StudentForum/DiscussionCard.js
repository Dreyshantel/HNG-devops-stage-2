import React, { useState } from 'react';
import { Card, Badge, Button, Dropdown, Modal, Form, Alert } from 'react-bootstrap';
import { 
  Eye, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Pin, 
  Star,
  File,
  Link,
  Code,
  Calendar,
  User
} from 'react-feather';
import { useHistory } from 'react-router-dom';

const DiscussionCard = ({ discussion, onUpdate, onDelete, currentUser }) => {
  const history = useHistory();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editForm, setEditForm] = useState({
    title: discussion.title,
    content: discussion.content,
    category: discussion.category,
    tags: discussion.tags.join(', ')
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canEdit = currentUser && (
    currentUser._id === discussion.author._id ||
    currentUser.role === 'Lecturer' ||
    currentUser.role === 'Admin'
  );

  const canDelete = currentUser && (
    currentUser._id === discussion.author._id ||
    currentUser.role === 'Lecturer' ||
    currentUser.role === 'Admin'
  );

  const canModerate = currentUser && (
    currentUser.role === 'Lecturer' ||
    currentUser.role === 'Admin'
  );

  const handleViewDiscussion = () => {
    history.push(`/discussion/${discussion._id}`);
  };

  const handleEdit = () => {
    setEditForm({
      title: discussion.title,
      content: discussion.content,
      category: discussion.category,
      tags: discussion.tags.join(', ')
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/discussions/${discussion._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: editForm.title,
          content: editForm.content,
          category: editForm.category,
          tags: editForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        })
      });

      if (response.ok) {
        const data = await response.json();
        onUpdate(data.discussion);
        setShowEditModal(false);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update discussion');
      }
    } catch (error) {
      console.error('Error updating discussion:', error);
      setError('An error occurred while updating the discussion');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/discussions/${discussion._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          reason: 'Deleted by user'
        })
      });

      if (response.ok) {
        onDelete(discussion._id);
        setShowDeleteModal(false);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to delete discussion');
      }
    } catch (error) {
      console.error('Error deleting discussion:', error);
      setError('An error occurred while deleting the discussion');
    } finally {
      setLoading(false);
    }
  };

  const handlePinToggle = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const action = discussion.isPinned ? 'unpin' : 'pin';
      
      const response = await fetch(`/discussions/${discussion._id}/toggle-pin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ action })
      });

      if (response.ok) {
        const data = await response.json();
        onUpdate(data.discussion);
      }
    } catch (error) {
      console.error('Error toggling pin status:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = () => {
    switch (discussion.status) {
      case 'active':
        return <Badge bg="success">Active</Badge>;
      case 'pending_approval':
        return <Badge bg="warning">Pending Approval</Badge>;
      case 'locked':
        return <Badge bg="danger">Locked</Badge>;
      case 'archived':
        return <Badge bg="secondary">Archived</Badge>;
      default:
        return <Badge bg="secondary">{discussion.status}</Badge>;
    }
  };

  const getCategoryBadge = () => {
    const categoryColors = {
      'General': 'primary',
      'Academic': 'info',
      'Technical': 'success',
      'Social': 'warning',
      'Announcement': 'danger'
    };
    
    return (
      <Badge bg={categoryColors[discussion.category] || 'secondary'}>
        {discussion.category}
      </Badge>
    );
  };

  return (
    <>
      <Card className={`discussion-card mb-3 ${discussion.isPinned ? 'border-primary' : ''}`}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div className="d-flex align-items-center gap-2">
              {discussion.isPinned && <Pin size={16} className="text-primary" />}
              <h5 className="card-title mb-0">{discussion.title}</h5>
            </div>
            
            <Dropdown>
              <Dropdown.Toggle variant="link" size="sm" className="p-0">
                <MoreVertical size={16} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleViewDiscussion}>
                  <Eye size={16} className="me-2" />
                  View Discussion
                </Dropdown.Item>
                
                {canEdit && (
                  <Dropdown.Item onClick={handleEdit}>
                    <Edit size={16} className="me-2" />
                    Edit
                  </Dropdown.Item>
                )}
                
                {canDelete && (
                  <Dropdown.Item onClick={() => setShowDeleteModal(true)} className="text-danger">
                    <Trash2 size={16} className="me-2" />
                    Delete
                  </Dropdown.Item>
                )}
                
                {canModerate && (
                  <Dropdown.Item onClick={handlePinToggle}>
                    {discussion.isPinned ? (
                      <>
                        <Pin size={16} className="me-2" />
                        Unpin
                      </>
                    ) : (
                      <>
                        <Pin size={16} className="me-2" />
                        Pin
                      </>
                    )}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="mb-2">
            {getStatusBadge()} {getCategoryBadge()}
          </div>

          <p className="card-text text-muted mb-3">
            {discussion.content.length > 200 
              ? `${discussion.content.substring(0, 200)}...` 
              : discussion.content
            }
          </p>

          {/* Tags */}
          {discussion.tags.length > 0 && (
            <div className="mb-3">
              {discussion.tags.map((tag, index) => (
                <Badge key={index} bg="light" text="dark" className="me-1">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Attachments, Links, and Code Snippets */}
          {(discussion.attachments.length > 0 || discussion.links.length > 0 || discussion.codeSnippets.length > 0) && (
            <div className="mb-3">
              {discussion.attachments.length > 0 && (
                <div className="d-flex align-items-center gap-1 me-3">
                  <File size={14} className="text-muted" />
                  <small className="text-muted">{discussion.attachments.length} file(s)</small>
                </div>
              )}
              
              {discussion.links.length > 0 && (
                <div className="d-flex align-items-center gap-1 me-3">
                  <Link size={14} className="text-muted" />
                  <small className="text-muted">{discussion.links.length} link(s)</small>
                </div>
              )}
              
              {discussion.codeSnippets.length > 0 && (
                <div className="d-flex align-items-center gap-1 me-3">
                  <Code size={14} className="text-muted" />
                  <small className="text-muted">{discussion.codeSnippets.length} code snippet(s)</small>
                </div>
              )}
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-1">
                <User size={14} className="text-muted" />
                <small className="text-muted">{discussion.author.userName}</small>
              </div>
              
              <div className="d-flex align-items-center gap-1">
                <Calendar size={14} className="text-muted" />
                <small className="text-muted">{formatDate(discussion.createdAt)}</small>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-1">
                <Eye size={14} className="text-muted" />
                <small className="text-muted">{discussion.viewCount}</small>
              </div>
              
              <div className="d-flex align-items-center gap-1">
                <MessageSquare size={14} className="text-muted" />
                <small className="text-muted">{discussion.replyCount}</small>
              </div>
              
              <Button 
                variant="outline-primary" 
                size="sm" 
                onClick={handleViewDiscussion}
              >
                View Discussion
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Discussion</Modal.Title>
        </Modal.Header>
        
        <Form onSubmit={handleEditSubmit}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                maxLength={200}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={editForm.category}
                onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="General">General</option>
                <option value="Academic">Academic</option>
                <option value="Technical">Technical</option>
                <option value="Social">Social</option>
                <option value="Announcement">Announcement</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={editForm.content}
                onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
                rows={6}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                value={editForm.tags}
                onChange={(e) => setEditForm(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="Enter tags separated by commas..."
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Discussion'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Discussion</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <p>Are you sure you want to delete this discussion? This action cannot be undone.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Discussion'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DiscussionCard;

