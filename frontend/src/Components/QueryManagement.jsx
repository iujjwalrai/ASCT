import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Eye, Edit, Trash2, BarChart3, Clock, CheckCircle, AlertCircle, X, RefreshCw, Calendar, User, Hash } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/images/Logo_Transparent_BG.png";
// Create axios instance with credentials
const api = axios.create({
  baseURL: `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/query`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

const QueryManagement = () => {
  const [queries, setQueries] = useState([]);
  const [stats, setStats] = useState({ total: 0, open: 0, 'in-progress': 0, closed: 0 });
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const navigate = useNavigate()
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalQueries: 0,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [createForm, setCreateForm] = useState({
    title: '',
    description: ''
  });

  // API utility functions
  const handleApiError = (error) => {
    if (error.response) {
      // Server responded with error status
      return error.response.data?.message || `Error: ${error.response.status}`;
    } else if (error.request) {
      // Request made but no response
      return 'Network error. Please check your connection.';
    } else {
      // Other error
      return 'An unexpected error occurred.';
    }
  };

  useEffect(() => {
    loadQueries();
    loadStats();
  }, [filters]);

  const loadQueries = async () => {
    setLoading(true);
    setError('');
    
    try {
      const queryParams = new URLSearchParams({
        page: filters.page.toString(),
        limit: filters.limit.toString(),
        ...(filters.status !== 'all' && { status: filters.status }),
        ...(filters.search && { search: filters.search })
      });

      const response = await api.get(`?${queryParams}`);
      
      if (response.data.success) {
        setQueries(response.data.data);
        setPagination(response.data.pagination);
      } else {
        setError(response.data.message || 'Failed to load queries');
      }
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await api.get('/stats');
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleCreateQuery = async () => {
    setError('');
    setSuccess('');

    if (!createForm.title.trim() || !createForm.description.trim()) {
      setError('Title and description are required');
      return;
    }

    try {
      const response = await api.post('', createForm);

      if (response.data.success) {
        setSuccess('Query created successfully!');
        setCreateForm({ title: '', description: '' });
        setShowCreateModal(false);
        loadQueries();
        loadStats();
      } else {
        setError(response.data.message || 'Failed to create query');
      }
    } catch (error) {
      setError(handleApiError(error));
    }
  };

  const handleStatusUpdate = async (queryId, newStatus) => {
    try {
      const response = await api.put(`/${queryId}/status`, { status: newStatus });

      if (response.data.success) {
        setSuccess('Status updated successfully!');
        loadQueries();
        loadStats();
      } else {
        setError(response.data.message || 'Failed to update status');
      }
    } catch (error) {
      setError(handleApiError(error));
    }
  };

  const handleDeleteQuery = async (queryId) => {
    if (!window.confirm('Are you sure you want to delete this query?')) {
      return;
    }

    try {
      const response = await api.delete(`/${queryId}`);

      if (response.data.success) {
        setSuccess('Query deleted successfully!');
        loadQueries();
        loadStats();
      } else {
        setError(response.data.message || 'Failed to delete query');
      }
    } catch (error) {
      setError(handleApiError(error));
    }
  };

  const viewQueryDetails = async (queryId) => {
    try {
      const response = await api.get(`/${queryId}`);
      if (response.data.success) {
        setSelectedQuery(response.data.data);
        setShowDetailsModal(true);
      } else {
        setError(response.data.message || 'Failed to load query details');
      }
    } catch (error) {
      setError(handleApiError(error));
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'closed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-red-900/30 text-red-300 border-red-800/50';
      case 'in-progress': return 'bg-yellow-900/30 text-yellow-300 border-yellow-800/50';
      case 'closed': return 'bg-green-900/30 text-green-300 border-green-800/50';
      default: return 'bg-gray-800 text-gray-300 border-gray-700';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-8 py-8">
      {/* Header */}
      <div className='flex justify-center mb-4 bg-gray-800 rounded-xl py-4'><img src={logo} alt="Logo" className='w-[110px]' /></div>
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 rounded-xl">
        <div className="flex md:flex-row md:justify-between md:items-center space-y-4 flex-col">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-8 h-8 text-blue-400" />
              Query Management |  ASCT - UP
            </h1>
            <p className="text-gray-400 mt-1">Manage and track your support queries | आपका सहयोग अपनों का सहारा</p>
          </div>
          <div className='flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0'>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              New Query
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg" onClick={()=> navigate("/advocates/dashboard")}>Go back to Dashboard</button>
          </div>
        </div>
      </div>

      {/* Alert Messages */}
      {(error || success) && (
        <div className="px-6 py-2">
          {error && (
            <div className="bg-red-900/50 border border-red-800 text-red-200 px-4 py-3 rounded-lg flex items-center justify-between">
              <span>{error}</span>
              <button onClick={clearMessages} className="text-red-300 hover:text-red-100">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          {success && (
            <div className="bg-green-900/50 border border-green-800 text-green-200 px-4 py-3 rounded-lg flex items-center justify-between">
              <span>{success}</span>
              <button onClick={clearMessages} className="text-green-300 hover:text-green-100">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Stats Cards */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-600 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Queries</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.total}</p>
              </div>
              <div className="bg-blue-600/20 p-3 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-600 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Open</p>
                <p className="text-3xl font-bold text-red-400 mt-1">{stats.open}</p>
              </div>
              <div className="bg-red-600/20 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-600 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">In Progress</p>
                <p className="text-3xl font-bold text-yellow-400 mt-1">{stats['in-progress']}</p>
              </div>
              <div className="bg-yellow-600/20 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-600 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Closed</p>
                <p className="text-3xl font-bold text-green-400 mt-1">{stats.closed}</p>
              </div>
              <div className="bg-green-600/20 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search queries..."
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value, page: 1})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value, page: 1})}
                className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              <button
                onClick={() => {loadQueries(); loadStats();}}
                disabled={loading}
                className="bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg px-4 py-2 text-white transition-colors flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Queries List */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
              <p className="text-gray-400">Loading queries...</p>
            </div>
          ) : queries.length === 0 ? (
            <div className="p-8 text-center">
              <BarChart3 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-2">No queries found</p>
              <p className="text-gray-500">Create your first query to get started</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700 border-b border-gray-600">
                    <tr>
                      <th className="text-left p-4 text-gray-300 font-medium">Ticket ID</th>
                      <th className="text-left p-4 text-gray-300 font-medium">Title</th>
                      <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                      <th className="text-left p-4 text-gray-300 font-medium">Created</th>
                      <th className="text-left p-4 text-gray-300 font-medium">Updated</th>
                      <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queries.map((query, index) => (
                      <tr key={query._id} className={`border-b border-gray-700 hover:bg-gray-700/50 transition-colors ${index % 2 === 0 ? 'bg-gray-800/50' : ''}`}>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Hash className="w-4 h-4 text-gray-400" />
                            <span className="font-mono text-blue-400">{query.ticketId}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="max-w-xs">
                            <p className="font-medium text-white truncate">{query.title}</p>
                            <p className="text-sm text-gray-400 truncate mt-1">{query.description}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(query.status)}`}>
                            {getStatusIcon(query.status)}
                            {query.status}
                          </span>
                        </td>
                        <td className="p-4 text-gray-400 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(query.createdAt)}
                          </div>
                        </td>
                        <td className="p-4 text-gray-400 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(query.updatedAt)}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => viewQueryDetails(query._id)}
                              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <select
                              value={query.status}
                              onChange={(e) => handleStatusUpdate(query._id, e.target.value)}
                              className="bg-gray-700 border border-gray-600 rounded text-xs px-2 py-1 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                              title="Update Status"
                            >
                              <option value="open">Open</option>
                              <option value="in-progress">In Progress</option>
                              <option value="closed">Closed</option>
                            </select>
                            <button
                              onClick={() => handleDeleteQuery(query._id)}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-colors"
                              title="Delete Query"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="p-4 border-t border-gray-700 flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    Showing {((pagination.currentPage - 1) * filters.limit) + 1} to {Math.min(pagination.currentPage * filters.limit, pagination.totalQueries)} of {pagination.totalQueries} queries
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setFilters({...filters, page: filters.page - 1})}
                      disabled={!pagination.hasPrevPage}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded border border-gray-600 text-sm"
                    >
                      Previous
                    </button>
                    <span className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                      {pagination.currentPage}
                    </span>
                    <button
                      onClick={() => setFilters({...filters, page: filters.page + 1})}
                      disabled={!pagination.hasNextPage}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded border border-gray-600 text-sm"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Create Query Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Create New Query</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={createForm.title}
                  onChange={(e) => setCreateForm({...createForm, title: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter query title..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={createForm.description}
                  onChange={(e) => setCreateForm({...createForm, description: e.target.value})}
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Describe your query in detail..."
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateQuery}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Create Query
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Query Details Modal */}
      {showDetailsModal && selectedQuery && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Query Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
                <Hash className="w-5 h-5 text-blue-400" />
                <span className="font-mono text-blue-400 text-lg">{selectedQuery.ticketId}</span>
                <span className={`ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedQuery.status)}`}>
                  {getStatusIcon(selectedQuery.status)}
                  {selectedQuery.status}
                </span>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Title</h4>
                <p className="text-white text-lg">{selectedQuery.title}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Description</h4>
                <p className="text-gray-300 leading-relaxed">{selectedQuery.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Created</h4>
                  <p className="text-gray-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedQuery.createdAt)}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Last Updated</h4>
                  <p className="text-gray-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedQuery.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryManagement;