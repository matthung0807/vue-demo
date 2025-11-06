export function formatDate(cellValue) {
  if (!cellValue) return ''

  let strValue = cellValue
  if (cellValue instanceof Date) {
    strValue = cellValue.toISOString()
  } else {
    strValue = String(cellValue)
  }

  // Remove extra fractional seconds (more than 3 digits)
  strValue = strValue.replace(/\.(\d{3})\d*$/, '.$1')

  const date = new Date(strValue)
  if (isNaN(date)) return ''

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}`
}
