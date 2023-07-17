import fs from 'fs'

function escapeCSVValue (value) {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    value = value.replace(/"/g, '""')
    value = `"${value}"`
  }
  return value
}

function convertToCSV (data) {
  const headers = ['Title', 'VOD Service', 'Rating']
  const rows = data.map(({
    title,
    vodService,
    rating
  }) => {
    return [escapeCSVValue(title), escapeCSVValue(vodService), escapeCSVValue(rating.toString())]
  })
  const csvData = [headers, ...rows].map(row => row.join(',')).join('\n')
  return csvData
}

async function saveCSV (data, fileName) {
  try {
    const csvData = convertToCSV(data)
    await fs.promises.writeFile(fileName, csvData, 'utf8')
    console.log(`Results saved to ${fileName}`)
  } catch (error) {
    console.error('Error saving CSV:', error)
  }
}

export default saveCSV
