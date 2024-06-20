/**
 * Sanitizes a string by replacing special characters with their corresponding HTML entities.
 * @param {string} string - The string to sanitize.
 * @returns {string} The sanitized string.
 */
export const sanitize = (string: string): string => {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  }
  const reg: RegExp = /[&<>"'/]/gi
  return string.replace(reg, (match: string) => map[match])
}

/**
 * Checks if a string has a minimum length.
 * @param {string} value - The string to check.
 * @param {number} min - The minimum length.
 * @returns {boolean} Whether the string has a minimum length.
 */
export const hasValidMin = (value: string, min: number): boolean => {
  return value.length >= min
}
