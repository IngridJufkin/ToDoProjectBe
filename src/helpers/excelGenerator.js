var xl = require('excel4node');

module.exports = async function (result, res) {
  let wb = new xl.Workbook();
  let ws = wb.addWorksheet('Sheet 1');

  const style = wb.createStyle({
    font: {
      color: '#000000',
      size: 12,
    },
    numberFormat: '$#,##0.00; ($#,##0.00); -',
  });

  ws.column(1).setWidth(30);

  ws.cell(1, 1).string('Todo').style(style);
  ws.cell(1, 2).string('Status').style(style);
  ws.cell(1, 3).string('Priority').style(style);

  let row = 1

  for await (const item of result.todoTasks) { 
    row++

    ws.cell(row, 1).string(item.title).style(style);
    ws.cell(row, 2).string('Todo').style(style);
    ws.cell(row, 3).string(item.priority.toLowerCase()).style(style);
  }

  for await (const item of result.doneTasks) {
    row++

    ws.cell(row, 1).string(item.title).style(style);
    ws.cell(row, 2).string('Done').style(style);
    ws.cell(row, 3).string(item.priority.toLowerCase()).style(style);
  }

  wb.write('Excel.xlsx', res);
}