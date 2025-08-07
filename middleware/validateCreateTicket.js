// middleware/validateCreateTicket.js
const { createTicketSchema } = require('../validations/ticketValidation');

function validateCreateTicket(req, res, next) {
  const { error, value } = createTicketSchema.validate(req.body, {
    stripUnknown: true,  // drop extra props
    convert:      true   // cast types (strings → numbers, dates, booleans)
  });

  if (error) {
    const msg = error.details.map(d => d.message).join('; ');
    return res.status(400).json({ error: msg });
  }

  // Attach the cleaned data
  req.validatedBody = value;
  next();
}

module.exports = validateCreateTicket;
