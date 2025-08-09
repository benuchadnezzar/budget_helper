const SOURCE_SHEET_ID = ""; // Add the ID for your input sheet
const TARGET_SHEET_ID = ""; // Add the ID for your master budget sheet

function syncBudgetToMaster() {
  const sourceSS = SpreadsheetApp.openById(SOURCE_SHEET_ID);
  const targetSS = SpreadsheetApp.openById(TARGET_SHEET_ID);

  const currentYear = new Date().getFullYear();
  const months = sourceSS.getSheets()
    .map(s => s.getName())
    .filter(name => new RegExp(`\\b(?:January|February|March|April|May|June|July|August|September|October|November|December) ${currentYear}\\b`).test(name));

  const categorySumsYear = {};

  months.forEach(month => {
    const sourceSheet = sourceSS.getSheetByName(month);
    const targetSheet = targetSS.getSheetByName(month);
    if (!sourceSheet || !targetSheet) return;

    const data = sourceSheet.getDataRange().getValues();
    const headers = data[0];
    const amountIndex = headers.indexOf('Amount');
    const categoryIndex = headers.indexOf('Category');

    const monthlySums = {};
    for (let i = 1; i < data.length; i++) {
      const amount = parseFloat(data[i][amountIndex]) || 0;
      const category = data[i][categoryIndex];
      if (!category) continue;

      monthlySums[category] = (monthlySums[category] || 0) + amount;
      categorySumsYear[category] = (categorySumsYear[category] || 0) + amount;
    }

    const targetData = targetSheet.getDataRange().getValues();
    for (let r = 0; r < targetData.length; r++) {
      const catB = targetData[r][1]; // col B
      const catE = targetData[r][4]; // col E

      if (monthlySums.hasOwnProperty(catB)) targetSheet.getRange(r + 1, 3).setValue(monthlySums[catB]); // col C
      if (monthlySums.hasOwnProperty(catE)) targetSheet.getRange(r + 1, 6).setValue(monthlySums[catE]); // col F
    }
  });

  const yearlySheet = targetSS.getSheetByName('Personal Yearly Budget');
  const yearlyData = yearlySheet.getDataRange().getValues();
  for (let r = 0; r < yearlyData.length; r++) {
    const catB = yearlyData[r][1];
    const catE = yearlyData[r][4];

    if (categorySumsYear.hasOwnProperty(catB)) yearlySheet.getRange(r + 1, 3).setValue(categorySumsYear[catB]); // col C
    if (categorySumsYear.hasOwnProperty(catE)) yearlySheet.getRange(r + 1, 6).setValue(categorySumsYear[catE]); // col F
  }
}