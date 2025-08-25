import React, { useState, useEffect } from "react";
import { Col, Container, Row, Card, Badge, Alert, Spinner, Tabs, Tab } from "react-bootstrap";
import SidebarAdmin from "./SidebarAdmin/SidebarAdmin";
import Styles from "./AdminDashboard.module.css";
import { Paper, Typography, Grid, Box } from "@material-ui/core";
import MainSidebar from "./MainSidebar/MainSidebar";
import AnalyticsPage from "./AnalyticsPage";
import ModerationDashboard from "./ModerationDashboard";
import { useLocation } from "react-router-dom";
import { 
  Users, 
  MessageSquare, 
  FileText, 
  Eye, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Activity,
  BarChart2,
  UserPlus,
  MessageCircle
} from "react-feather";

const AdminDashboard = () => {
  const location = useLocation();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Check URL parameters for tab
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['overview', 'analytics', 'moderation'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  useEffect(() => {
    if (activeTab === "overview") {
      fetchDashboardData();
    }
  }, [activeTab]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      
      // Fetch forum statistics
      const statsResponse = await fetch('/analytics/forum/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.stats);
      }

      // Fetch recent activity
      const activityResponse = await fetch('/analytics/activity/feed', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (activityResponse.ok) {
        const activityData = await activityResponse.json();
        setRecentActivity(activityData.activities || []);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleTabSelect = (key) => {
    setActiveTab(key);
    // Update URL without page reload
    const newUrl = `/admin-dashboard${key !== 'overview' ? `?tab=${key}` : ''}`;
    window.history.pushState({}, '', newUrl);
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <Card className={`${Styles.statCard} h-100`}>
      <Card.Body className="d-flex align-items-center">
        <div className={`${Styles.iconContainer} ${color} me-3`}>
          <Icon size={24} />
        </div>
        <div>
          <Card.Title className="mb-1 fw-bold fs-4">{value}</Card.Title>
          <Card.Text className="text-muted mb-0">{title}</Card.Text>
          {subtitle && <small className="text-muted">{subtitle}</small>}
        </div>
      </Card.Body>
    </Card>
  );

  const OverviewTab = () => (
    <>
      {/* Key Statistics */}
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <StatCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            icon={Users}
            color="bg-primary"
            subtitle="Registered users"
          />
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <StatCard
            title="Total Discussions"
            value={stats?.totalDiscussions || 0}
            icon={MessageSquare}
            color="bg-success"
            subtitle="Discussion threads"
          />
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <StatCard
            title="Total Replies"
            value={stats?.totalReplies || 0}
            icon={FileText}
            color="bg-info"
            subtitle="Community responses"
          />
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <StatCard
            title="Total Views"
            value={stats?.totalViews || 0}
            icon={Eye}
            color="bg-warning"
            subtitle="Content reach"
          />
        </Col>
      </Row>

      {/* Recent Activity and Quick Stats */}
      <Row className="mb-4">
        <Col lg={8} className="mb-3">
          <Paper className="p-4 h-100">
            <Typography variant="h6" className="mb-3 d-flex align-items-center">
              <Activity className="me-2" size={20} />
              Recent Activity
            </Typography>
            {recentActivity.length > 0 ? (
              <div>
                {recentActivity.slice(0, 5).map((activity, index) => (
                  <div key={index} className="d-flex align-items-center py-2 border-bottom">
                    <div className={`${activity.type === 'user' ? 'bg-success' : 'bg-primary'} p-2 rounded-circle me-3`}>
                      {activity.type === 'user' ? <UserPlus size={16} className="text-white" /> : <MessageCircle size={16} className="text-white" />}
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-medium">{activity.description}</div>
                      <small className="text-muted">{new Date(activity.timestamp).toLocaleString()}</small>
                    </div>
                    <Badge bg={activity.type === 'user' ? 'success' : 'primary'}>
                      {activity.type === 'user' ? 'User' : 'Content'}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted py-4">
                <Activity size={48} className="mb-2" />
                <p>No recent activity</p>
              </div>
            )}
          </Paper>
        </Col>
        <Col lg={4} className="mb-3">
          <Paper className="p-4 h-100">
            <Typography variant="h6" className="mb-3 d-flex align-items-center">
              <BarChart2 className="me-2" size={20} />
              Quick Stats
            </Typography>
            <div className="space-y-3">
              <div className="d-flex justify-content-between align-items-center">
                <span>Pending Approvals</span>
                <Badge bg="warning" className="fs-6">
                  {stats?.pendingApprovals || 0}
                </Badge>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span>New Users (7d)</span>
                <Badge bg="success" className="fs-6">
                  {stats?.newUsers || 0}
                </Badge>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span>New Discussions (7d)</span>
                <Badge bg="info" className="fs-6">
                  {stats?.recentDiscussions || 0}
                </Badge>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span>New Replies (7d)</span>
                <Badge bg="primary" className="fs-6">
                  {stats?.recentReplies || 0}
                </Badge>
              </div>
            </div>
          </Paper>
        </Col>
      </Row>

      {/* Top Categories and Contributors */}
      <Row className="mb-4">
        <Col lg={6} className="mb-3">
          <Paper className="p-4 h-100">
            <Typography variant="h6" className="mb-3">
              Top Discussion Categories
            </Typography>
            {stats?.topCategories && stats.topCategories.length > 0 ? (
              <div>
                {stats.topCategories.map((category, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <span className="fw-medium">{category._id}</span>
                    <Badge bg="secondary">{category.count}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted py-4">
                <FileText size={48} className="mb-2" />
                <p>No category data available</p>
              </div>
            )}
          </Paper>
        </Col>
        <Col lg={6} className="mb-3">
          <Paper className="p-4 h-100">
            <Typography variant="h6" className="mb-3">
              Top Contributors
            </Typography>
            {stats?.topContributors && stats.topContributors.length > 0 ? (
              <div>
                {stats.topContributors.slice(0, 5).map((contributor, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <div>
                      <div className="fw-medium">{contributor.userName}</div>
                      <small className="text-muted">{contributor.role}</small>
                    </div>
                    <Badge bg="primary">{contributor.discussionCount} posts</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted py-4">
                <Users size={48} className="mb-2" />
                <p>No contributor data available</p>
              </div>
            )}
          </Paper>
        </Col>
      </Row>

      {/* System Status */}
      <Row className="mb-4">
        <Col>
          <Paper className="p-4">
            <Typography variant="h6" className="mb-3 d-flex align-items-center">
              <CheckCircle className="me-2" size={20} />
              System Status
            </Typography>
            <Row>
              <Col md={3} className="text-center mb-3">
                <div className="bg-success p-3 rounded-circle d-inline-block mb-2">
                  <CheckCircle size={24} className="text-white" />
                </div>
                <h6 className="mb-1">System Online</h6>
                <small className="text-muted">All systems operational</small>
              </Col>
              <Col md={3} className="text-center mb-3">
                <div className="bg-info p-3 rounded-circle d-inline-block mb-2">
                  <Users size={24} className="text-white" />
                </div>
                <h6 className="mb-1">Active Users</h6>
                <small className="text-muted">{stats?.activeUsers || 0} online</small>
              </Col>
              <Col md={3} className="text-center mb-3">
                <div className="bg-warning p-3 rounded-circle d-inline-block mb-2">
                  <Clock size={24} className="text-white" />
                </div>
                <h6 className="mb-1">Response Time</h6>
                <small className="text-muted">&lt; 200ms average</small>
              </Col>
              <Col md={3} className="text-center mb-3">
                <div className="bg-primary p-3 rounded-circle d-inline-block mb-2">
                  <TrendingUp size={24} className="text-white" />
                </div>
                <h6 className="mb-1">Uptime</h6>
                <small className="text-muted">99.9% this month</small>
              </Col>
            </Row>
          </Paper>
        </Col>
      </Row>
    </>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "analytics":
        return <AnalyticsPage />;
      case "moderation":
        return <ModerationDashboard />;
      default:
        return <OverviewTab />;
    }
  };

  if (loading && activeTab === "overview") {
    return (
      <Container fluid>
        <Row>
          <Col md={2} sm={12} className="d-none d-md-block">
            <MainSidebar />
          </Col>
          <Col md={10} className={Styles.main__body}>
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
              <Spinner animation="border" variant="primary" />
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error && activeTab === "overview") {
    return (
      <Container fluid>
        <Row>
          <Col md={2} sm={12} className="d-none d-md-block">
            <MainSidebar />
          </Col>
          <Col md={10} className={Styles.main__body}>
            <Container>
              <Alert variant="danger">
                <Alert.Heading>Error Loading Dashboard</Alert.Heading>
                <p>{error}</p>
                <button className="btn btn-primary" onClick={fetchDashboardData}>
                  Retry
                </button>
              </Alert>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col md={2} sm={12} className="d-none d-md-block">
          <MainSidebar />
        </Col>
        <Col md={10} className={Styles.main__body}>
          <Container>
            {/* Tabs Navigation */}
            <Paper className="p-4 mb-4">
              <Tabs
                activeKey={activeTab}
                onSelect={handleTabSelect}
                className="mb-0"
              >
                <Tab eventKey="overview" title="Overview">
                  <div className="mt-3">
                    {renderTabContent()}
                  </div>
                </Tab>
                <Tab eventKey="analytics" title="Analytics">
                  <div className="mt-3">
                    {renderTabContent()}
                  </div>
                </Tab>
                <Tab eventKey="moderation" title="Moderation">
                  <div className="mt-3">
                    {renderTabContent()}
                  </div>
                </Tab>
              </Tabs>
            </Paper>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
