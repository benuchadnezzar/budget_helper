function onEdit(e) {
    const sheet = e.source.getActiveSheet();
    const range = e.range;
  
    if (sheet.getName() === "Input") {
      const editedRow = range.getRow();
      const editedColumn = range.getColumn();
  
      if (editedRow === 2 && (editedColumn === 1 || editedColumn === 2)) {
        const amount = sheet.getRange("A2").getValue();
        const category = sheet.getRange("B2").getValue();
        if (amount && category) {
          cutAndPaste();
        }
      }
    }
  }
  
  function cutAndPaste() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const inputSheet = ss.getSheetByName("Input");
  
    const today = new Date();
    const monthName = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();
    const currentMonthName = `${monthName} ${year}`;
    
    const amount = inputSheet.getRange("A2").getValue();
    const category = inputSheet.getRange("B2").getValue();
    if (!amount || !category) return;
  
    let monthlySheet = ss.getSheetByName(currentMonthName);
    if (!monthlySheet) {
      monthlySheet = ss.insertSheet(currentMonthName);
      monthlySheet.appendRow(['Date', 'Amount', 'Category']);
    }
  
    const dateOnly = Utilities.formatDate(today, ss.getSpreadsheetTimeZone(), 'MM/dd/yyyy');
    monthlySheet.appendRow([dateOnly, amount, category]);
    inputSheet.getRange("A2:B2").clearContent();
  }
  
  function getSpreadsheetTodayAtNoon() {
    const timeZone = SpreadsheetApp.getActive().getSpreadsheetTimeZone();
    const now = new Date();
    const dateString = Utilities.formatDate(now, timeZone, "yyyy-MM-dd");
    return new Date(`${dateString}T12:00:00`);
  }
  
  function createMonthlySheet() {
    // Get current month and year
    const today = getSpreadsheetTodayAtNoon();
    const monthName = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();
    const currentMonthName = `${monthName} ${year}`

    // Get previous month
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const priorMonth = yesterday.toLocaleString('default', { month: 'long' });
    const priorYear = yesterday.getFullYear();
    const priorMonthName = `${priorMonth} ${priorYear}`;

    // Create ss object
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Create new sheet if no sheet matches currentMonthName
    if (!ss.getSheetByName(currentMonthName)) {
      const sourceSheet = ss.getSheetByName(priorMonthName);
      if (sourceSheet) {
        const newSheet = sourceSheet.copyTo(ss);
        newSheet.setName(currentMonthName);

        ss.setActiveSheet(newSheet);
        ss.moveActiveSheet(ss.getSheets().length);

        const lastRow = newSheet.getLastRow();
        const lastColumn = newSheet.getLastColumn();

        if (lastRow > 1 && lastColumn > 0) {
          newSheet.getRange(2, 1, lastRow - 1, lastColumn).clearContent();
        }
      }
    }
  }