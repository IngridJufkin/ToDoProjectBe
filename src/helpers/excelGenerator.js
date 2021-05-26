var xl = require('excel4node');

module.exports = async function (result, res) {
  let wb = new xl.Workbook();
  let ws = wb.addWorksheet('Sheet 1');

  const style = wb.createStyle({
    font: {
      color: '#000000',
      size: 12,
    },
    numberFormat: '###; (###.); -',
  });

  ws.column(2).setWidth(30);

  ws.cell(1, 1).string('Task number').style(style);
  ws.cell(1, 2).string('Todo').style(style);
  ws.cell(1, 3).string('Status').style(style);
  ws.cell(1, 4).string('Priority').style(style);
  ws.cell(6, 2).string('Total Tasks').style(style);

  let row = 1;
  let todoStart = row+1;

  for await (const item of result.todoTasks) { 
    row++
  
    ws.cell(row, 1).number(row-1).style(style);
    ws.cell(row, 2).string(item.title).style(style);
    ws.cell(row, 3).string('Todo').style(style);
    ws.cell(row, 4).string(item.priority.charAt(0).toUpperCase() + item.priority.toLowerCase().slice(1)).style(style);
  }

  let todoEnd = row;
  let doneStart = row+1;
 
  for await (const item of result.doneTasks) {
    row++
    
    ws.cell(row, 1).number(row-1).style(style);
    ws.cell(row, 2).string(item.title).style(style);
    ws.cell(row, 3).string('Done').style(style);
    ws.cell(row, 4).string(item.priority.charAt(0).toUpperCase() + item.priority.toLowerCase().slice(1)).style(style);
  }
 
let doneEnd = row;
if (doneEnd === todoEnd) {
    doneEnd = row+1
}

ws.cell(row+2, 1).string("Total Todo").style(style);
ws.cell(row+3, 1).string("Total Done").style(style);
ws.cell(row+4, 1).string("Total Tasks").style(style);

ws.cell(row+2,2).formula('SUM(A' + todoStart + ':A' +(todoEnd) + ')' ).style(style)
ws.cell(row+3,2).formula('SUM(A' + doneStart + ':A' +(doneEnd) + ')' ).style(style)

ws.cell(row+4,2).formula('SUM(A' + todoStart + ':A' +(doneEnd) + ')' ).style(style)

wb.write('Excel.xlsx', res);
}