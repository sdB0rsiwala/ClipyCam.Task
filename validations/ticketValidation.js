// validations/ticketValidation.js
const Joi = require('joi');

const createTicketSchema = Joi.object({
  type_id:               Joi.number().integer().required(),
  status_id:             Joi.number().integer().required(),
  estimated_duration_id: Joi.number().integer().required(),
  created_by:            Joi.number().integer().required(),
  assignee:              Joi.number().integer().required(),
  project_id:            Joi.number().integer().required(),
  location_id:           Joi.number().integer().required(),
  weather_id:            Joi.number().integer().required(),
  title:                 Joi.string().trim().min(1).required(),
  description:           Joi.string().allow('').optional(),
  due_date:              Joi.date().iso().required(),
  is_draft:              Joi.boolean().default(false),
  is_local:              Joi.boolean().default(false),
});

module.exports = { createTicketSchema };
