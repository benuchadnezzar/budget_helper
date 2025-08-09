function getSpreadsheetTodayAtNoon() {
    const timeZone = SpreadsheetApp.getActive().getSpreadsheetTimeZone();
    const now = new Date();
    const dateString = Utilities.formatDate(now, timeZone, "yyyy-MM-dd");
    return new Date(`${dateString}T12:00:00`);
  }
  
  function createMonthlySheet() {
    /**
     * Update these ranges to match your spreadsheet layout
     * 
     * These ranges define which cells should be reset to 0 when creating a new monthly sheet.
     * Each range should correspond to a category or section in your budget spreadsheet.
     * 
     * Examples of what these might represent:
     * - Income categories
     * - Expense categories  
     * - Budget amounts
     * - Savings goals
     * - Debt payments
     * - Investment amounts
     */
    const ranges = [
      // 'YOUR_RANGE_HERE',  //
    ];

    // Get current month and year
    const today = getSpreadsheetTodayAtNoon();
    const monthName = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();
    const currentMonthName = `${monthName} ${year}`;

    // Get past month and current year
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const pastMonth = yesterday.toLocaleString('default', { month: 'long' });
    const pastYear = yesterday.getFullYear();
    const pastMonthName = `${pastMonth} ${pastYear}`;

    // Create ss object
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Create new sheet if no sheet matches currentMonthName
    if (!ss.getSheetByName(currentMonthName)) {
      let sourceSheet = ss.getSheetByName(pastMonthName);
      
      // If past month sheet doesn't exist, try to find any existing sheet to copy from
      if (!sourceSheet) {
        const allSheets = ss.getSheets();
        // Look for any sheet that might serve as a template (preferably recent ones)
        for (let i = allSheets.length - 1; i >= 0; i--) {
          const sheet = allSheets[i];
          // Skip the current month sheet if it somehow exists
          if (sheet.getName() !== currentMonthName) {
            sourceSheet = sheet;
            break;
          }
        }
      }
      
      // If still no source sheet found, create a new one from scratch
      if (!sourceSheet) {
        ss.insertSheet(currentMonthName);
        // Set the new sheet as active
        ss.setActiveSheet(ss.getSheetByName(currentMonthName));
      } else {
        const newSheet = sourceSheet.copyTo(ss);
        newSheet.setName(currentMonthName);
        
        // Move newSheet to end
        ss.setActiveSheet(newSheet);
        ss.moveActiveSheet(ss.getSheets().length);
      }
    }
  
    // Reset categories to 0
    if (ranges.length === 0) {
      console.log('No ranges defined. Please add your spreadsheet ranges to the ranges array above.');
      return;
    }
    
    for (let i = 0; i < ranges.length; i++) {
      const sheet = ss.getActiveSheet();
      try {
        const range = sheet.getRange(ranges[i]);
        const numRows = range.getNumRows();
        const numCols = range.getNumColumns();
        const zeros = Array.from({ length: numRows }, () => Array(numCols).fill(0));
        
        range.setValues(zeros);
      } catch (error) {
        // If range doesn't exist (e.g., new sheet from scratch), skip it
        console.log(`Range ${ranges[i]} not found in sheet ${sheet.getName()}, skipping...`);
      }
    }
  }