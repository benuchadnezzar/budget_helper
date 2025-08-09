# Budget Helper - Google Apps Script System

This system helps you track and manage your personal budget using Google Sheets and Google Apps Script. It consists of two main workbooks and three script files that work together to automate budget tracking and reporting.

## Overview

The system uses two Google Sheets workbooks:
1. **Input Workbook** - Where you enter daily transactions
2. **Master Budget Workbook** - Where you view charts, monthly summaries, and yearly totals

## Files

### Script Files

1. **`inputSheetFunctions.gs`** - Handles input automation and monthly sheet creation
2. **`chartSheetFunctions.gs`** - Manages the master budget workbook structure
3. **`inputToChartSync.gs`** - Syncs data from input workbook to master budget workbook

## Setup Instructions

### Step 1: Create Your Workbooks

1. **Input Workbook** - Create a new Google Sheet for daily transaction input
2. **Master Budget Workbook** - Create a new Google Sheet for charts and summaries

### Step 2: Set Up the Input Workbook

1. **Create an "Input" sheet** with the following structure:
   - Column A: Amount (for transaction amounts)
   - Column B: Category (dropdown with your budget categories)
   - Row 2: Input row (where you'll enter transactions)

2. **Set up category dropdown**:
   - Select cell B2
   - Go to Data > Data validation
   - Set criteria to "List of items"
   - Add your budget categories separated by commas (e.g., `Groceries, Dining, Gas, Entertainment, Utilities`)

3. **Create monthly sheets**:
   - The system will automatically create monthly sheets (e.g., "January 2024", "February 2024")
   - Each monthly sheet will have columns: Date, Amount, Category

### Step 3: Set Up the Master Budget Workbook

1. **Create monthly summary sheets**:
   - Create sheets named "January 2024", "February 2024", etc.
   - Set up your budget categories in columns B and E
   - Leave columns C and F empty for the script to populate with totals
   - **Add your charts in columns D and G** - these columns are reserved for your visualizations

2. **Create a yearly summary sheet**:
   - Name it "Personal Yearly Budget"
   - Set up your budget categories in columns B and E
   - Leave columns C and F empty for the script to populate with yearly totals
   - **Add your charts in columns D and G** - these columns are reserved for your visualizations

### Step 4: Configure the Scripts

1. **Open Google Apps Script**:
   - Go to [script.google.com](https://script.google.com)
   - Create a new project

2. **Add the script files**:
   - Copy the contents of each `.gs` file into separate script files in your project
   - Update the `SOURCE_SHEET_ID` and `TARGET_SHEET_ID` in `inputToChartSync.gs` with your actual workbook IDs

3. **Set up triggers** (optional):
   - For `inputSheetFunctions.gs`: Set up an "onEdit" trigger to run automatically when you edit the input sheet
   - For `chartSheetFunctions.gs`: Set up a time-based trigger to run monthly for sheet creation

## How to Use

### Daily Transaction Entry

1. **Enter transactions**:
   - Go to the "Input" sheet in your input workbook
   - Enter the amount in cell A2
   - Select the category from the dropdown in cell B2
   - The transaction will automatically be moved to the current month's sheet

2. **View monthly data**:
   - Navigate to the current month's sheet (e.g., "January 2024")
   - All your transactions for the month will be listed there

### Syncing Data to Master Budget

1. **Run the sync function**:
   - In Google Apps Script, run the `syncBudgetToMaster()` function from `inputToChartSync.gs`
   - This will sync all current year's data to your master budget workbook

2. **View summaries**:
   - Check your monthly sheets in the master budget workbook for category totals
   - Check the "Personal Yearly Budget" sheet for yearly totals

## Key Features

### Automatic Features
- **Auto-categorization**: Transactions are automatically categorized based on your dropdown selection
- **Monthly sheet creation**: New monthly sheets are created automatically
- **Data syncing**: One-click sync from input to master budget workbook
- **Current year processing**: Only processes the current year's data automatically

### Manual Features
- **Category management**: You control your budget categories via dropdown
- **Chart creation**: You build your own charts and visualizations in columns D and G
- **Budget limits**: You set your own budget limits and goals
- **Formatting**: You control all formatting including conditional formatting

## Important Notes

### What You Need to Do
1. **Define your categories**: Add your budget categories to the dropdown in the input sheet
2. **Set up charts**: Create charts and visualizations in columns D and G of the master budget workbook
3. **Add budget limits**: If you want budget caps, you'll need to add these manually
4. **Format your sheets**: Add conditional formatting, colors, and styling as needed
5. **Set up triggers**: Configure automatic triggers if you want hands-off operation

### What the Scripts Do
1. **Automate data entry**: Move transactions from input to monthly sheets
2. **Create monthly sheets**: Automatically create new monthly sheets
3. **Sync data**: Transfer totals from input workbook to master budget workbook
4. **Calculate totals**: Sum up spending by category for each month and year

### Limitations
- **No budget enforcement**: The system tracks spending but doesn't enforce budget limits
- **Manual chart creation**: You need to create your own charts and visualizations in columns D and G
- **Basic formatting**: You control all formatting and styling
- **Category management**: You need to manually update categories in the dropdown

## Troubleshooting

### Common Issues
1. **Script not running**: Check that you've set up the correct sheet IDs
2. **Categories not updating**: Make sure the dropdown is set up correctly in the input sheet
3. **Data not syncing**: Verify that both workbooks exist and have the correct sheet names
4. **Monthly sheets not creating**: Check that the script has permission to create sheets

### Getting Help
- Check the Google Apps Script logs for error messages
- Verify that all sheet names match exactly (including spaces and capitalization)
- Ensure you have edit permissions on both workbooks

## Future Enhancements

Potential improvements you could add:
- Budget limit enforcement
- Automatic chart generation
- Email notifications for budget overruns
- Export functionality for tax purposes
- Mobile-friendly input forms
- Integration with bank accounts (requires additional APIs)

## Support

This is a personal project designed for individual use. The scripts are provided as-is and may require customization for your specific needs. 