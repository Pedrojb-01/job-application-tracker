const { createApplication } = require('../services/applicationService');
const {
  validateRequiredString,
  validateOptionalString,
  validateUUID,
  validateRequiredEnum,
  validateDate,
} = require('../utils/validators');

const WORK_MODE_VALUES = ['REMOTE', 'ONSITE', 'HYBRID', 'NOT_INFORMED'];
const PRIORITY_VALUES = ['HIGH', 'MEDIUM', 'LOW'];

async function create(req, res) {
  try {
    const { id_user, company, role, link, work_mode, notes, priority, deadline } = req.body;

    if (!validateUUID(id_user)) return res.status(400).json({ message: 'id_user must be a valid UUID' });

    const companyError  = validateRequiredString(company, 'company', 150);
    const roleError     = validateRequiredString(role, 'role', 150);
    const linkError     = validateOptionalString(link, 'link', 255);
    const workModeError = validateRequiredEnum(work_mode, 'work_mode', WORK_MODE_VALUES);
    const notesError    = validateOptionalString(notes, 'notes', 700);
    const priorityError = validateRequiredEnum(priority, 'priority', PRIORITY_VALUES);

    if (companyError)  return res.status(400).json({ message: companyError });
    if (roleError)     return res.status(400).json({ message: roleError });
    if (linkError)     return res.status(400).json({ message: linkError });
    if (workModeError) return res.status(400).json({ message: workModeError });
    if (notesError)    return res.status(400).json({ message: notesError });
    if (priorityError) return res.status(400).json({ message: priorityError });

    if (deadline) {
      const whatError    = validateRequiredString(deadline.what, 'deadline.what', 100);
      const dueDateError = validateDate(deadline.due_date, 'deadline.due_date');
      if (whatError)    return res.status(400).json({ message: whatError });
      if (dueDateError) return res.status(400).json({ message: dueDateError });
    }

    const application = await createApplication({
      id_user, company, role, link, work_mode, notes, priority, deadline,
    });

    return res.status(201).json({ message: 'Application created successfully', application });

  } catch (error) {
    if (error.isAppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { create };