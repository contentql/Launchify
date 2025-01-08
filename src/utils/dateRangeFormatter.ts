/**
 * Formats a Date object into a string in the format 'MM/DD/YYYY'.
 * @param {Date} date - The date to be formatted.
 * @returns {string} The formatted date string in 'MM/DD/YYYY' format.
 * @throws {Error} Throws an error if the date is invalid.
 */
function formatDate(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date provided.')
  }

  const day = String(date.getDate()).padStart(2, '0') // Ensure 2-digit day
  const month = String(date.getMonth() + 1).padStart(2, '0') // Ensure 2-digit month (0-based index)
  const year = date.getFullYear()

  return `${month}/${day}/${year}` // Changed to MM/DD/YYYY format
}

/**
 * Converts start and end dates into a date range string in the format 'MM/DD/YYYY-MM/DD/YYYY'.
 * @param {Date} startDate - The start date.
 * @param {Date} endDate - The end date.
 * @returns {string} The formatted date range string in 'MM/DD/YYYY-MM/DD/YYYY' format.
 * @throws {Error} Throws an error if either start or end date is invalid.
 */
export const convertDateRange = (startDate: Date, endDate: Date): string => {
  if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
    throw new Error('Both start and end dates must be valid Date objects.')
  }

  const formattedStartDate = formatDate(startDate)
  const formattedEndDate = formatDate(endDate)

  return `${formattedStartDate}-${formattedEndDate}` // Return in MM/DD/YYYY-MM/DD/YYYY format
}
