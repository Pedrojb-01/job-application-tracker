function validateRequiredString(value, fieldName, maxLength) {
  if (!value || typeof value !== 'string' || value.trim() === '') {
    return `${fieldName} is required`;
  }
  if (value.trim().length > maxLength) {
    return `${fieldName} must be at most ${maxLength} characters`;
  }
  return null;
}

function validateOptionalString(value, fieldName, maxLength) {
  if (value === undefined || value === null) return null;
  if (typeof value !== 'string') return `${fieldName} must be a string`;
  if (value.length > maxLength) return `${fieldName} must be at most ${maxLength} characters`;
  return null;
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function validateUUID(value) {
  if (!value || typeof value !== 'string') return false;
  return UUID_PATTERN.test(value);
}

function validateEnum(value, fieldName, allowedValues) {
  if (value === undefined || value === null) return null;
  if (!allowedValues.includes(value)) {
    return `${fieldName} must be one of: ${allowedValues.join(', ')}`;
  }
  return null;
}

function validateRequiredEnum(value, fieldName, allowedValues) {
  if (value === undefined || value === null || value === '') {
    return `${fieldName} is required`;
  }
  return validateEnum(value, fieldName, allowedValues);
}

function validateDate(value, fieldName) {
  if (value === undefined || value === null) return null;
  const parsed = new Date(value);
  if (isNaN(parsed.getTime())) {
    return `${fieldName} must be a valid date`;
  }
  return null;
}

module.exports = {
  validateRequiredString,
  validateOptionalString,
  validateUUID,
  validateEnum,
  validateRequiredEnum,
  validateDate,
};