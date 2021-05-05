const { jsPDF } = require('jspdf')
require('jspdf-autotable')

module.exports = async function (result, res) {
  const doc = new jsPDF('p', 'mm');

  let startX = 15
  let startY = 20

  const header = [
    { header: 'Title', dataKey: 'title' },
    { header: 'Priority', dataKey: 'priority' },
  ]

  if (result.todoTasks.length > 0) {
    doc.text("Todo", startX, startY);
    startY += 5

    const table = doc.autoTable(header, result.todoTasks, {
      startY,
      didDrawPage (HookData) {
        return HookData.table
      }
    })

    startY = table.lastAutoTable.finalY + 16
  }

  if (result.doneTasks.length > 0) {
    doc.text("Done", startX, startY);
    startY += 5

    doc.autoTable(header, result.doneTasks, {
      startY
    })
  }

  res.setHeader('Content-Disposition', 'filename="' + encodeURIComponent(`TODO.pdf`) + '"')
  res.setHeader('Content-Type', 'application/pdf')
  res.end(doc.output(), 'binary')
}