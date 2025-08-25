import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Badge, Alert } from 'react-bootstrap';
import { X, Plus, File, Link, Code } from 'react-feather';

const CreateDiscussionModal = ({ show, onHide, onDiscussionCreated, courseId, currentUser }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General',
    tags: '',
    attachments: [],
    links: [],
    codeSnippets: []
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newLink, setNewLink] = useState({ title: '', url: '', description: '' });
  const [newCodeSnippet, setNewCodeSnippet] = useState({ language: '', code: '', description: '' });

  const categories = ['General', 'Academic', 'Technical', 'Social', 'Announcement'];
  const programmingLanguages = [
    'JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift',
    'TypeScript', 'HTML', 'CSS', 'SQL', 'Bash', 'PowerShell', 'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      filename: file.name,
      fileType: file.type,
      fileSize: file.size,
      file: file // Store the actual file for upload
    }));
    
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const addLink = () => {
    if (newLink.title && newLink.url) {
      setFormData(prev => ({
        ...prev,
        links: [...prev.links, { ...newLink }]
      }));
      setNewLink({ title: '', url: '', description: '' });
    }
  };

  const removeLink = (index) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const addCodeSnippet = () => {
    if (newCodeSnippet.language && newCodeSnippet.code) {
      setFormData(prev => ({
        ...prev,
        codeSnippets: [...prev.codeSnippets, { ...newCodeSnippet }]
      }));
      setNewCodeSnippet({ language: '', code: '', description: '' });
    }
  };

  const removeCodeSnippet = (index) => {
    setFormData(prev => ({
      ...prev,
      codeSnippets: prev.codeSnippets.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('auth_token');
      
      // Prepare form data for file uploads
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('content', formData.content);
      submitData.append('courseId', courseId);
      submitData.append('category', formData.category);
      
      // Add tags as comma-separated string
      if (formData.tags.trim()) {
        submitData.append('tags', formData.tags);
      }

      // Add files
      formData.attachments.forEach((attachment, index) => {
        if (attachment.file) {
          submitData.append(`attachments`, attachment.file);
        }
      });

      // Add links and code snippets as JSON
      if (formData.links.length > 0) {
        submitData.append('links', JSON.stringify(formData.links));
      }
      if (formData.codeSnippets.length > 0) {
        submitData.append('codeSnippets', JSON.stringify(formData.codeSnippets));
      }

      const response = await fetch('/discussions/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData
      });

      if (response.ok) {
        const data = await response.json();
        onDiscussionCreated(data.discussion);
        handleClose();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create discussion');
      }
    } catch (error) {
      console.error('Error creating discussion:', error);
      setError('An error occurred while creating the discussion');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      content: '',
      category: 'General',
      tags: '',
      attachments: [],
      links: [],
      codeSnippets: []
    });
    setError('');
    setNewLink({ title: '', url: '', description: '' });
    setNewCodeSnippet({ language: '', code: '', description: '' });
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New Discussion</Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Title *</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter discussion title..."
                  maxLength={200}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Content *</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Describe your discussion..."
              rows={6}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="Enter tags separated by commas..."
            />
            <Form.Text className="text-muted">
              Use tags to help others find your discussion (e.g., javascript, react, tutorial)
            </Form.Text>
          </Form.Group>

          {/* File Attachments */}
          <Form.Group className="mb-3">
            <Form.Label>Attachments</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.zip,.rar"
            />
            <Form.Text className="text-muted">
              Supported formats: PDF, DOC, TXT, Images, Archives (max 10MB each)
            </Form.Text>
            
            {formData.attachments.length > 0 && (
              <div className="mt-2">
                {formData.attachments.map((attachment, index) => (
                  <Badge key={index} bg="secondary" className="me-2 mb-1">
                    <File size={12} className="me-1" />
                    {attachment.filename}
                    <Button
                      variant="link"
                      size="sm"
                      className="text-white p-0 ms-2"
                      onClick={() => removeAttachment(index)}
                    >
                      <X size={12} />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </Form.Group>

          {/* Links Section */}
          <div className="mb-3">
            <Form.Label>Links</Form.Label>
            <Row className="mb-2">
              <Col md={4}>
                <Form.Control
                  type="text"
                  placeholder="Link title"
                  value={newLink.title}
                  onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  type="url"
                  placeholder="URL"
                  value={newLink.url}
                  onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  value={newLink.description}
                  onChange={(e) => setNewLink(prev => ({ ...prev, description: e.target.value }))}
                />
              </Col>
              <Col md={1}>
                <Button variant="outline-primary" size="sm" onClick={addLink}>
                  <Plus size={16} />
                </Button>
              </Col>
            </Row>
            
            {formData.links.length > 0 && (
              <div className="mt-2">
                {formData.links.map((link, index) => (
                  <Badge key={index} bg="info" className="me-2 mb-1">
                    <Link size={12} className="me-1" />
                    {link.title}
                    <Button
                      variant="link"
                      size="sm"
                      className="text-white p-0 ms-2"
                      onClick={() => removeLink(index)}
                    >
                      <X size={12} />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Code Snippets Section */}
          <div className="mb-3">
            <Form.Label>Code Snippets</Form.Label>
            <Row className="mb-2">
              <Col md={3}>
                <Form.Select
                  value={newCodeSnippet.language}
                  onChange={(e) => setNewCodeSnippet(prev => ({ ...prev, language: e.target.value }))}
                >
                  <option value="">Select Language</option>
                  {programmingLanguages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Control
                  as="textarea"
                  placeholder="Code snippet"
                  value={newCodeSnippet.code}
                  onChange={(e) => setNewCodeSnippet(prev => ({ ...prev, code: e.target.value }))}
                  rows={3}
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  value={newCodeSnippet.description}
                  onChange={(e) => setNewCodeSnippet(prev => ({ ...prev, description: e.target.value }))}
                />
              </Col>
              <Col md={1}>
                <Button variant="outline-success" size="sm" onClick={addCodeSnippet}>
                  <Plus size={16} />
                </Button>
              </Col>
            </Row>
            
            {formData.codeSnippets.length > 0 && (
              <div className="mt-2">
                {formData.codeSnippets.map((snippet, index) => (
                  <Badge key={index} bg="success" className="me-2 mb-1">
                    <Code size={12} className="me-1" />
                    {snippet.language}
                    <Button
                      variant="link"
                      size="sm"
                      className="text-white p-0 ms-2"
                      onClick={() => removeCodeSnippet(index)}
                    >
                      <X size={12} />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Discussion'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateDiscussionModal;

