import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Tabs, Tab, Spinner } from 'react-bootstrap';
import { Paper, Typography } from '@material-ui/core';
import {
  Users,
  MessageSquare,
  FileText,
  Eye,
  TrendingUp,
  Calendar,
  BarChart2,
  PieChart,
  Activity
} from 'react-feather';

const AnalyticsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch(`/analytics/forum/stats?timeRange=${timeRange}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      } else {
        setError('Failed to load analytics data');
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle, change }) => (
    <Card className="h-100 border-0 shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className={`${color} p-3 rounded`}>
            <Icon size={24} className="text-white" />
          </div>
          {change && (
            <div className={`text-${change > 0 ? 'success' : 'danger'} small`}>
              <TrendingUp size={16} className="me-1" />
              {Math.abs(change)}%
            </div>
          )}
        </div>
        <h3 className="mb-1 fw-bold">{value}</h3>
        <p className="text-muted mb-0">{title}</p>
        {subtitle && <small className="text-muted">{subtitle}</small>}
      </Card.Body>
    </Card>
  );

  const MetricRow = ({ label, value, percentage, color = 'primary' }) => (
    <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
      <span className="fw-medium">{label}</span>
      <div className="d-flex align-items-center">
        <div className="me-3">
          <span className="fw-bold">{value}</span>
        </div>
        <div className="progress flex-grow-1" style={{ width: '100px', height: '8px' }}>
          <div 
            className={`progress-bar bg-${color}`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="ms-2 small text-muted">{percentage}%</span>
      </div>
    </div>
  );

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="alert alert-danger">
          <strong>Error:</strong> {error}
          <button className="btn btn-primary ms-3" onClick={fetchAnalyticsData}>
            Retry
          </button>
        </div>
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
              Analytics Dashboard
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Detailed insights into platform performance and user engagement
            </Typography>
          </div>
          <div className="d-flex align-items-center">
            <label className="me-2">Time Range:</label>
            <select 
              className="form-select" 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
          </div>
        </div>
      </Paper>

      {/* Key Metrics */}
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <StatCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            icon={Users}
            color="bg-primary"
            subtitle="Registered users"
            change={12}
          />
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <StatCard
            title="Active Discussions"
            value={stats?.activeDiscussions || 0}
            icon={MessageSquare}
            color="bg-success"
            subtitle="Ongoing conversations"
            change={8}
          />
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <StatCard
            title="Total Replies"
            value={stats?.totalReplies || 0}
            icon={FileText}
            color="bg-info"
            subtitle="Community engagement"
            change={15}
          />
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <StatCard
            title="Total Views"
            value={stats?.totalViews || 0}
            icon={Eye}
            color="bg-warning"
            subtitle="Content reach"
            change={22}
          />
        </Col>
      </Row>

      {/* Detailed Analytics */}
      <Row className="mb-4">
        <Col lg={8} className="mb-3">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-white">
              <div className="d-flex align-items-center">
                <BarChart2 className="me-2" size={20} />
                <h6 className="mb-0">User Engagement Trends</h6>
              </div>
            </Card.Header>
            <Card.Body>
                               <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                   <div className="text-center text-muted">
                     <BarChart2 size={64} className="mb-3" />
                     <p>Chart visualization would be implemented here</p>
                     <small>Using libraries like Chart.js or Recharts</small>
                   </div>
                 </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} className="mb-3">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-white">
              <div className="d-flex align-items-center">
                <PieChart className="me-2" size={20} />
                <h6 className="mb-0">User Distribution</h6>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                <div className="text-center text-muted">
                  <PieChart size={64} className="mb-3" />
                  <p>Pie chart would be implemented here</p>
                  <small>Showing user roles distribution</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Category and Activity Analysis */}
      <Row className="mb-4">
        <Col lg={6} className="mb-3">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-white">
              <div className="d-flex align-items-center">
                <FileText className="me-2" size={20} />
                <h6 className="mb-0">Discussion Categories</h6>
              </div>
            </Card.Header>
            <Card.Body>
              {stats?.topCategories && stats.topCategories.length > 0 ? (
                <div>
                  {stats.topCategories.map((category, index) => {
                    const percentage = Math.round((category.count / stats.totalDiscussions) * 100);
                    return (
                      <MetricRow
                        key={index}
                        label={category._id}
                        value={category.count}
                        percentage={percentage}
                        color={index === 0 ? 'success' : index === 1 ? 'primary' : 'info'}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-muted py-4">
                  <FileText size={48} className="mb-2" />
                  <p>No category data available</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} className="mb-3">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-white">
              <div className="d-flex align-items-center">
                <Activity className="me-2" size={20} />
                <h6 className="mb-0">Activity Summary</h6>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="space-y-3">
                <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                  <div>
                    <div className="fw-medium">New Users (7d)</div>
                    <small className="text-muted">User registrations</small>
                  </div>
                  <Badge bg="success" className="fs-6">
                    {stats?.newUsers || 0}
                  </Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                  <div>
                    <div className="fw-medium">New Discussions (7d)</div>
                    <small className="text-muted">Discussion threads</small>
                  </div>
                  <Badge bg="info" className="fs-6">
                    {stats?.recentDiscussions || 0}
                  </Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                  <div>
                    <div className="fw-medium">New Replies (7d)</div>
                    <small className="text-muted">Community responses</small>
                  </div>
                  <Badge bg="primary" className="fs-6">
                    {stats?.recentReplies || 0}
                  </Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                  <div>
                    <div className="fw-medium">Pending Approvals</div>
                    <small className="text-muted">Awaiting moderation</small>
                  </div>
                  <Badge bg="warning" className="fs-6">
                    {stats?.pendingApprovals || 0}
                  </Badge>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Top Contributors Table */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white">
              <div className="d-flex align-items-center">
                <Users className="me-2" size={20} />
                <h6 className="mb-0">Top Contributors</h6>
              </div>
            </Card.Header>
            <Card.Body>
              {stats?.topContributors && stats.topContributors.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>User</th>
                        <th>Role</th>
                        <th>Discussions</th>
                        <th>Contribution %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.topContributors.map((contributor, index) => {
                        const contributionPercentage = Math.round((contributor.discussionCount / stats.totalDiscussions) * 100);
                        return (
                          <tr key={index}>
                            <td>
                              <Badge bg={index === 0 ? 'warning' : index === 1 ? 'secondary' : 'light'} className="text-dark">
                                #{index + 1}
                              </Badge>
                            </td>
                            <td>
                              <div className="fw-medium">{contributor.userName}</div>
                              <small className="text-muted">{contributor.email}</small>
                            </td>
                            <td>
                              <Badge bg={contributor.role === 'Admin' ? 'danger' : contributor.role === 'Lecturer' ? 'primary' : 'success'}>
                                {contributor.role}
                              </Badge>
                            </td>
                            <td className="fw-bold">{contributor.discussionCount}</td>
                            <td>
                              <div className="progress" style={{ height: '8px' }}>
                                <div 
                                  className="progress-bar bg-primary" 
                                  style={{ width: `${contributionPercentage}%` }}
                                ></div>
                              </div>
                              <small className="text-muted">{contributionPercentage}%</small>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center text-muted py-4">
                  <Users size={48} className="mb-2" />
                  <p>No contributor data available</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AnalyticsPage;
