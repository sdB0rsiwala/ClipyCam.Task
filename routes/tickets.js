// routes/tickets.js

import express from 'express';
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  deleteTicket
} from '../models/ticketModel.js';

const router = express.Router();

// CREATE a new ticket
router.post('/', async (req, res) => {
  try {
    const ticketId = await createTicket(req.body);
    res.status(201).json({ success: true, ticketId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await getAllTickets();
    res.json({ success: true, tickets });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET a ticket by ID
router.get('/:id', async (req, res) => {
  try {
    const ticket = await getTicketById(req.params.id);
    if (ticket) {
      res.json({ success: true, ticket });
    } else {
      res.status(404).json({ success: false, message: 'Ticket not found' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE ticket status
router.put('/:id/status', async (req, res) => {
  try {
    const updated = await updateTicketStatus(req.params.id, req.body.status_id);
    res.json({ success: true, updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE a ticket
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteTicket(req.params.id);
    res.json({ success: true, deleted });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
