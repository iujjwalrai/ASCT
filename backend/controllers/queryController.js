const Query = require('../models/Query'); // Adjust path as needed
const mongoose = require('mongoose');

// Generate unique ticket ID
const generateTicketId = async () => {
  const currentYear = new Date().getFullYear();
  const count = await Query.countDocuments({
    createdAt: { $gte: new Date(`${currentYear}-01-01`) }
  });
  return `TKT-${currentYear}-${String(count + 1).padStart(3, '0')}`;
};

// Create new query
const createQuery = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id; 

    // Validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required'
      });
    }

    if (!title.trim() || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Title and description cannot be empty'
      });
    }

    // Generate ticket ID
    const ticketId = await generateTicketId();

    // Create new query
    const newQuery = new Query({
      userId,
      title: title.trim(),
      description: description.trim(),
      ticketId,
      status: 'open'
    });

    const savedQuery = await newQuery.save();

    res.status(201).json({
      success: true,
      message: 'Query created successfully',
      data: savedQuery
    });

  } catch (error) {
    console.error('Error creating query:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get all queries for a user
const getUserQueries = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, search, page = 1, limit = 10 } = req.query;

    // Build filter object
    let filter = { userId };

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { ticketId: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get queries with pagination
    const queries = await Query.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalQueries = await Query.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: queries,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalQueries / parseInt(limit)),
        totalQueries,
        hasNextPage: skip + queries.length < totalQueries,
        hasPrevPage: parseInt(page) > 1
      }
    });

  } catch (error) {
    console.error('Error fetching queries:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get single query by ID
const getQueryById = async (req, res) => {
  try {
    const { queryId } = req.params;
    const userId = req.user.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(queryId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid query ID'
      });
    }

    const query = await Query.findOne({ _id: queryId, userId });

    if (!query) {
      return res.status(404).json({
        success: false,
        message: 'Query not found'
      });
    }

    res.status(200).json({
      success: true,
      data: query
    });

  } catch (error) {
    console.error('Error fetching query:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get query by ticket ID
const getQueryByTicketId = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const userId = req.user.id;

    const query = await Query.findOne({ ticketId, userId });

    if (!query) {
      return res.status(404).json({
        success: false,
        message: 'Query not found'
      });
    }

    res.status(200).json({
      success: true,
      data: query
    });

  } catch (error) {
    console.error('Error fetching query:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update query status (for admin/support staff)
const updateQueryStatus = async (req, res) => {
  try {
    const { queryId } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['open', 'in-progress', 'closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: open, in-progress, closed'
      });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(queryId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid query ID'
      });
    }

    const query = await Query.findByIdAndUpdate(
      queryId,
      { status },
      { new: true }
    );

    if (!query) {
      return res.status(404).json({
        success: false,
        message: 'Query not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Query status updated successfully',
      data: query
    });

  } catch (error) {
    console.error('Error updating query status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete query (soft delete - change status to deleted)
const deleteQuery = async (req, res) => {
  try {
    const { queryId } = req.params;
    const userId = req.user.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(queryId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid query ID'
      });
    }

    const query = await Query.findOneAndDelete({ _id: queryId, userId });

    if (!query) {
      return res.status(404).json({
        success: false,
        message: 'Query not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Query deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting query:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get query statistics
const getQueryStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const stats = await Query.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalQueries = await Query.countDocuments({ userId });

    // Format stats
    const formattedStats = {
      total: totalQueries,
      open: 0,
      'in-progress': 0,
      closed: 0
    };

    stats.forEach(stat => {
      formattedStats[stat._id] = stat.count;
    });

    res.status(200).json({
      success: true,
      data: formattedStats
    });

  } catch (error) {
    console.error('Error fetching query stats:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  createQuery,
  getUserQueries,
  getQueryById,
  getQueryByTicketId,
  updateQueryStatus,
  deleteQuery,
  getQueryStats
};