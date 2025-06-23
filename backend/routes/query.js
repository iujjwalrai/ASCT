const express = require('express');
const router = express.Router();
const {
  createQuery,
  getUserQueries,
  getQueryById,
  getQueryByTicketId,
  updateQueryStatus,
  deleteQuery,
  getQueryStats
} = require('../controllers/queryController'); // Adjust path as needed

// Middleware for authentication (implement according to your auth system)
const { auth } = require("../middleware/auth");

// Apply authentication middleware to all routes
router.use(auth);

// Routes
router.post('/', createQuery);                          // POST /api/queries
router.get('/', getUserQueries);                        // GET /api/queries
router.get('/stats', getQueryStats);                    // GET /api/queries/stats
router.get('/ticket/:ticketId', getQueryByTicketId);    // GET /api/queries/ticket/TKT-2024-001
router.get('/:queryId', getQueryById);                  // GET /api/queries/:queryId
router.put('/:queryId/status', updateQueryStatus);      // PUT /api/queries/:queryId/status
router.delete('/:queryId', deleteQuery);                // DELETE /api/queries/:queryId

module.exports = router;