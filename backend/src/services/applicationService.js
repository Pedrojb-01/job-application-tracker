const prisma = require('../utils/client');

async function createApplication(data) {
  const {
    id_user,
    company,
    role,
    link,
    work_mode,
    notes,
    priority,
    deadline, 
  } = data;

  const applicationData = {
    id_user,
    company: company.trim(),
    role: role.trim(),
    link: link ? link.trim() : null,
    work_mode,
    notes: notes ? notes.trim() : null,
    priority,
  };

  if (deadline) {
    applicationData.status = 'ACTION_PENDING';
    applicationData.deadlines = {
      create: {
        what: deadline.what.trim(),
        due_date: new Date(deadline.due_date),
      },
    };
  }

  const application = await prisma.application.create({
    data: applicationData,
    include: { deadlines: true },
  });

  return application;
}

module.exports = { createApplication };