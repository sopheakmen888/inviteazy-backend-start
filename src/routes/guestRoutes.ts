import { Router } from 'express';
import { getPreEventInsights, getPostEventInsights, getAllGuests, addGuest } from '../controllers/guestController';
// import {authenticateToken} from '../middlewares/authMiddleware'
const router = Router();

// Pre-event: Who's likely to attend
router.get('/events/:eventId/status/pre', getAllGuests);

// Post-event: Who attended and total contributions
router.get('/events/:eventId/status/post', getPostEventInsights);

// Get all guests for an event
router.get('/events/:eventId/guests', getAllGuests);

// Add guest to an event
router.post('/events/:eventId/guests', addGuest);

export default router;
