/*
  Fundamentals of Accounting - Juan Dela Cruz Computer Shop (adjusting entries, adjusted trial balance, financial statements)
  Written from the test paper photo. Has the usual Multiple Choice / Identification questions
  plus "Fill in the Table" worksheets (see `tables`).

  Table cell types:
    "text"        - fixed text shown to the student
    { sel: "X" }  - dropdown, correct answer is X (options come from `accounts`)
    { n: 123 }    - number input; use n: "" when the cell should be left blank
  Row options: { header: "Section" } for a section row, cls: "total" for a bold row.
*/
(function () {
  function fmt(n) {
    return n === "" ? "" : n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  var accounts = [
    "Cash", "Supplies", "Prepaid Insurance", "Equipment", "Accumulated Depreciation–Equipment",
    "Trucks", "Accumulated Depreciation–Trucks", "Accounts Payable", "Salaries Payable",
    "Juan Dela Cruz, Capital", "Juan Dela Cruz, Drawing", "Service Revenue",
    "Salaries Expense", "Rent Expense", "Truck Expense", "Miscellaneous Expense",
    "Supplies Expense", "Insurance Expense", "Depreciation Expense–Equipment", "Depreciation Expense–Trucks"
  ];

  // Trial balance as printed on the paper: [account, debit, credit]
  var tb = [
    ["Cash", 2825, ""],
    ["Supplies", 5820, ""],
    ["Prepaid Insurance", 2500, ""],
    ["Equipment", 44200, ""],
    ["Accumulated Depreciation–Equipment", "", 12050],
    ["Trucks", 45000, ""],
    ["Accumulated Depreciation–Trucks", "", 27100],
    ["Accounts Payable", "", 2015],
    ["Juan Dela Cruz, Capital", "", 32885],
    ["Juan Dela Cruz, Drawing", 5000, ""],
    ["Service Revenue", "", 75950],
    ["Salaries Expense", 28010, ""],
    ["Rent Expense", 8100, ""],
    ["Truck Expense", 6350, ""],
    ["Miscellaneous Expense", 2195, ""]
  ];

  // Worksheet: [account, TB Dr, TB Cr, Adj Dr, Adj Cr, Adjusted Dr, Adjusted Cr]
  var ws = [
    ["Cash", 2825, "", "", "", 2825, ""],
    ["Supplies", 5820, "", "", 4570, 1250, ""],
    ["Prepaid Insurance", 2500, "", "", 1000, 1500, ""],
    ["Equipment", 44200, "", "", "", 44200, ""],
    ["Accumulated Depreciation–Equipment", "", 12050, "", 5080, "", 17130],
    ["Trucks", 45000, "", "", "", 45000, ""],
    ["Accumulated Depreciation–Trucks", "", 27100, "", 3500, "", 30600],
    ["Accounts Payable", "", 2015, "", "", "", 2015],
    ["Juan Dela Cruz, Capital", "", 32885, "", "", "", 32885],
    ["Juan Dela Cruz, Drawing", 5000, "", "", "", 5000, ""],
    ["Service Revenue", "", 75950, "", "", "", 75950],
    ["Salaries Expense", 28010, "", 900, "", 28910, ""],
    ["Rent Expense", 8100, "", "", "", 8100, ""],
    ["Truck Expense", 6350, "", "", "", 6350, ""],
    ["Miscellaneous Expense", 2195, "", "", "", 2195, ""],
    ["Supplies Expense", "", "", 4570, "", 4570, ""],
    ["Insurance Expense", "", "", 1000, "", 1000, ""],
    ["Depreciation Expense–Equipment", "", "", 5080, "", 5080, ""],
    ["Depreciation Expense–Trucks", "", "", 3500, "", 3500, ""],
    ["Salaries Payable", "", "", "", 900, "", 900]
  ];

  var wsRows = ws.map(function (r) {
    return { cells: [r[0], fmt(r[1]), fmt(r[2]), { n: r[3] }, { n: r[4] }, { n: r[5] }, { n: r[6] }] };
  });
  wsRows.push({ cls: "total", cells: ["Totals", "150,000.00", "150,000.00", { n: 15050 }, { n: 15050 }, { n: 159480 }, { n: 159480 }] });

  function dr(acct, amt, label) { return { cells: [label || "", { sel: acct }, { n: amt }, { n: "" }] }; }
  function cr(acct, amt) { return { cells: ["", { sel: acct }, { n: "" }, { n: amt }] }; }

  window.QUIZ_SUBJECTS = window.QUIZ_SUBJECTS || [];
  window.QUIZ_SUBJECTS.push({
    id: "accounting",
    title: "Fundamentals of Accounting",
    description: "Juan Dela Cruz Computer Shop: adjusting entries, worksheet, income statement and balance sheet.",
    accounts: accounts,

    problem: {
      title: "Juan Dela Cruz Computer Shop – Trial Balance, December 30, 2025",
      instructions: [
        "Journalize and post the adjusting entries.",
        "Prepare a worksheet (posting the adjustments and the adjusted trial balance).",
        "Complete the worksheet, then prepare the income statement and balance sheet."
      ],
      tb: tb.map(function (r) { return [r[0], fmt(r[1]), fmt(r[2])]; }).concat([["Total", "150,000.00", "150,000.00"]]),
      data: [
        "a. Supplies on hand at December 30 is ₱1,250.",
        "b. Insurance premiums expired during this year are ₱1,000.",
        "c. Depreciation of equipment during the year is ₱5,080.",
        "d. Depreciation of trucks during the year is ₱3,500.",
        "e. Wages accrued but not paid at December 31, 2025 are ₱900."
      ]
    },

    tables: [
      {
        id: "journal",
        title: "1. Adjusting entries (journal)",
        intro: "Pick the account and type the amount. Put the debit line first, then the credit line. The accrued wages use the Salaries accounts from the trial balance.",
        columns: ["Entry", "Account", "Debit (₱)", "Credit (₱)"],
        rows: [
          dr("Supplies Expense", 4570, "(a)"), cr("Supplies", 4570),
          dr("Insurance Expense", 1000, "(b)"), cr("Prepaid Insurance", 1000),
          dr("Depreciation Expense–Equipment", 5080, "(c)"), cr("Accumulated Depreciation–Equipment", 5080),
          dr("Depreciation Expense–Trucks", 3500, "(d)"), cr("Accumulated Depreciation–Trucks", 3500),
          dr("Salaries Expense", 900, "(e)"), cr("Salaries Payable", 900)
        ]
      },
      {
        id: "worksheet",
        title: "2. Worksheet: adjustments and adjusted trial balance",
        intro: "The trial balance columns are given. Fill in the adjustments and the adjusted balances. Leave a cell blank when the account has no amount on that side.",
        columns: ["Account", "Trial Balance Dr", "Trial Balance Cr", "Adjustments Dr", "Adjustments Cr", "Adjusted Dr", "Adjusted Cr"],
        wide: true,
        rows: wsRows
      },
      {
        id: "income",
        title: "3. Income statement",
        intro: "Use the adjusted balances.",
        columns: ["Juan Dela Cruz Computer Shop", "Amount (₱)"],
        rows: [
          { header: "Revenue" },
          { cells: ["Service Revenue", { n: 75950 }] },
          { header: "Expenses" },
          { cells: ["Salaries Expense", { n: 28910 }] },
          { cells: ["Rent Expense", { n: 8100 }] },
          { cells: ["Truck Expense", { n: 6350 }] },
          { cells: ["Miscellaneous Expense", { n: 2195 }] },
          { cells: ["Supplies Expense", { n: 4570 }] },
          { cells: ["Insurance Expense", { n: 1000 }] },
          { cells: ["Depreciation Expense–Equipment", { n: 5080 }] },
          { cells: ["Depreciation Expense–Trucks", { n: 3500 }] },
          { cls: "total", cells: ["Total Expenses", { n: 59705 }] },
          { cls: "total", cells: ["Net Income", { n: 16245 }] }
        ]
      },
      {
        id: "equity",
        title: "4. Statement of owner's equity",
        intro: "Needed to get the ending capital for the balance sheet.",
        columns: ["Juan Dela Cruz, Capital", "Amount (₱)"],
        rows: [
          { cells: ["Beginning capital", { n: 32885 }] },
          { cells: ["Add: Net income", { n: 16245 }] },
          { cells: ["Less: Drawing", { n: 5000 }] },
          { cls: "total", cells: ["Ending capital", { n: 44130 }] }
        ]
      },
      {
        id: "balance",
        title: "5. Balance sheet",
        intro: "Type the contra accounts (accumulated depreciation) as positive numbers.",
        columns: ["Juan Dela Cruz Computer Shop", "Amount (₱)"],
        rows: [
          { header: "Assets" },
          { cells: ["Cash", { n: 2825 }] },
          { cells: ["Supplies", { n: 1250 }] },
          { cells: ["Prepaid Insurance", { n: 1500 }] },
          { cells: ["Equipment", { n: 44200 }] },
          { cells: ["Less: Accumulated Depreciation–Equipment", { n: 17130 }] },
          { cells: ["Trucks", { n: 45000 }] },
          { cells: ["Less: Accumulated Depreciation–Trucks", { n: 30600 }] },
          { cls: "total", cells: ["Total Assets", { n: 47045 }] },
          { header: "Liabilities" },
          { cells: ["Accounts Payable", { n: 2015 }] },
          { cells: ["Salaries Payable", { n: 900 }] },
          { cls: "total", cells: ["Total Liabilities", { n: 2915 }] },
          { header: "Owner's Equity" },
          { cells: ["Juan Dela Cruz, Capital (ending)", { n: 44130 }] },
          { cls: "total", cells: ["Total Liabilities and Owner's Equity", { n: 47045 }] }
        ]
      }
    ],

    topics: [
      {
        name: "Adjusting Entries",
        questions: [
          { q: "Supplies on hand at year end are ₱1,250, and the Supplies account shows ₱5,820. How much is the supplies expense?", a: "₱4,570", d: ["₱1,250", "₱5,820", "₱7,070"] },
          { q: "Which account is debited to record the supplies used up during the year?", a: "Supplies Expense", d: ["Supplies", "Prepaid Insurance", "Cash"] },
          { q: "Which account is credited when insurance premiums expire?", a: "Prepaid Insurance", d: ["Insurance Expense", "Cash", "Accounts Payable"] },
          { q: "Prepaid Insurance is ₱2,500 and ₱1,000 expired. What is the Prepaid Insurance balance after adjustment?", a: "₱1,500", d: ["₱2,500", "₱1,000", "₱3,500"] },
          { q: "What is the adjusted balance of Accumulated Depreciation–Equipment? (Unadjusted ₱12,050; depreciation for the year ₱5,080)", a: "₱17,130", d: ["₱5,080", "₱12,050", "₱7,000"] },
          { q: "What is the adjusted balance of Accumulated Depreciation–Trucks? (Unadjusted ₱27,100; depreciation for the year ₱3,500)", a: "₱30,600", d: ["₱3,500", "₱27,100", "₱23,600"] },
          { q: "Which account is credited to record wages that have accrued but are not yet paid?", a: "Salaries Payable", alt: ["Wages Payable"], d: ["Salaries Expense", "Cash", "Accounts Payable"] },
          { q: "What is the adjusted balance of Salaries Expense after recording the ₱900 accrued wages? (Unadjusted ₱28,010)", a: "₱28,910", d: ["₱900", "₱28,010", "₱27,110"] },
          { q: "What is the total of the adjustments column on each side of the worksheet?", a: "₱15,050", d: ["₱9,480", "₱14,150", "₱16,050"] },
          { q: "Accrued wages are an example of which type of adjusting entry?", a: "Accrued expense", alt: ["Accrued expenses"], d: ["Prepaid expense", "Accrued revenue", "Unearned revenue"] },
          { q: "Supplies and prepaid insurance are examples of which type of adjusting entry?", a: "Prepaid expenses", alt: ["Prepaid expense", "Deferred expenses", "Deferred expense", "Deferral", "Deferrals"], d: ["Accrued expenses", "Accrued revenues", "Unearned revenues"] },
          { q: "What is the normal balance of Accumulated Depreciation?", a: "Credit", d: ["Debit", "Either debit or credit", "No balance"] },
          { q: "Why are adjusting entries made at the end of the period?", a: "To record revenues and expenses in the period they belong to", d: ["To close the books for the next year", "To correct arithmetic mistakes in the ledger", "To increase the net income"], only: "mc" }
        ]
      },
      {
        name: "Adjusted Trial Balance",
        questions: [
          { q: "What is the total of the adjusted trial balance on each side?", a: "₱159,480", d: ["₱150,000", "₱165,050", "₱154,430"] },
          { q: "What is the Supplies balance shown in the adjusted trial balance?", a: "₱1,250", d: ["₱4,570", "₱5,820", "₱7,070"] },
          { q: "Which new accounts appear in the adjusted trial balance that were not in the unadjusted one? (Name the liability account.)", a: "Salaries Payable", alt: ["Wages Payable"], d: ["Accounts Payable", "Supplies Expense", "Prepaid Insurance"] }
        ]
      },
      {
        name: "Financial Statements",
        questions: [
          { q: "What are the total expenses on the income statement?", a: "₱59,705", d: ["₱45,555", "₱56,205", "₱60,605"] },
          { q: "What is the net income for the year?", a: "₱16,245", d: ["₱30,395", "₱17,145", "₱11,245"] },
          { q: "What is the ending capital of Juan Dela Cruz? (Beginning ₱32,885 plus net income less drawing ₱5,000)", a: "₱44,130", d: ["₱49,130", "₱32,885", "₱27,885"] },
          { q: "What are the total assets on the balance sheet?", a: "₱47,045", d: ["₱61,195", "₱47,945", "₱46,145"] },
          { q: "What are the total liabilities on the balance sheet?", a: "₱2,915", d: ["₱2,015", "₱900", "₱3,915"] },
          { q: "What is the book value (carrying amount) of the Trucks?", a: "₱14,400", d: ["₱45,000", "₱30,600", "₱17,900"] },
          { q: "What is the book value (carrying amount) of the Equipment?", a: "₱27,070", d: ["₱44,200", "₱17,130", "₱32,150"] },
          { q: "What are total liabilities plus owner's equity on the balance sheet?", a: "₱47,045", d: ["₱44,130", "₱2,915", "₱159,480"] },
          { q: "Which financial statement reports revenues and expenses for a period of time?", a: "Income statement", alt: ["Income Statement", "Statement of comprehensive income"], d: ["Balance sheet", "Statement of owner's equity", "Trial balance"] },
          { q: "Which financial statement shows assets, liabilities and owner's equity on a specific date?", a: "Balance sheet", alt: ["Balance Sheet", "Statement of financial position"], d: ["Income statement", "Statement of owner's equity", "Worksheet"] }
        ]
      }
    ]
  });
})();
