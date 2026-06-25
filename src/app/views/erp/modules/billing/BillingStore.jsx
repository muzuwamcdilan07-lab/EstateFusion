import React, { createContext, useContext, useMemo, useReducer } from "react";

const BillingStoreContext = createContext(null);

const nowISO = () => new Date().toISOString();

const createId = () =>
  Math.random().toString(16).slice(2) + "_" + Math.random().toString(16).slice(2);

const initialState = {
  arInvoices: [],
  arReceipts: [],
  apBills: [],
  cashEntries: [],
  journalEntries: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "AR_INVOICE_CREATE": {
      const invoice = action.payload;
      return { ...state, arInvoices: [invoice, ...state.arInvoices] };
    }
    case "AR_INVOICE_UPDATE": {
      const { id, patch } = action.payload;
      return {
        ...state,
        arInvoices: state.arInvoices.map((i) => (i.id === id ? { ...i, ...patch } : i)),
      };
    }
    case "AR_INVOICE_DELETE": {
      const id = action.payload;
      return { ...state, arInvoices: state.arInvoices.filter((i) => i.id !== id) };
    }
    case "AR_RECEIPT_CREATE": {
      const receipt = action.payload;
      return { ...state, arReceipts: [receipt, ...state.arReceipts] };
    }
    case "AP_BILL_CREATE": {
      const bill = action.payload;
      return { ...state, apBills: [bill, ...state.apBills] };
    }
    case "AP_BILL_UPDATE": {
      const { id, patch } = action.payload;
      return {
        ...state,
        apBills: state.apBills.map((b) => (b.id === id ? { ...b, ...patch } : b)),
      };
    }
    case "AP_BILL_DELETE": {
      const id = action.payload;
      return { ...state, apBills: state.apBills.filter((b) => b.id !== id) };
    }
    case "CASH_ENTRY_CREATE": {
      const entry = action.payload;
      return { ...state, cashEntries: [entry, ...state.cashEntries] };
    }
    case "JOURNAL_ENTRY_CREATE": {
      const entry = action.payload;
      return { ...state, journalEntries: [entry, ...state.journalEntries] };
    }
    default:
      return state;
  }
}

export function BillingStoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => {
    return {
      state,
      actions: {
        createArInvoice: ({ customerName, documentNo, amount, currency, dueDate }) => {
          const invoice = {
            id: createId(),
            type: "AR_INVOICE",
            customerName: customerName?.trim() || "",
            documentNo: documentNo?.trim() || "",
            amount: Number(amount) || 0,
            currency: currency || "ZAR",
            dueDate: dueDate || "",
            status: "DRAFT", // DRAFT | POSTED | VOID
            createdAt: nowISO(),
            postedAt: null,
          };
          dispatch({ type: "AR_INVOICE_CREATE", payload: invoice });
          return invoice;
        },
        updateArInvoice: (id, patch) => dispatch({ type: "AR_INVOICE_UPDATE", payload: { id, patch } }),
        deleteArInvoice: (id) => dispatch({ type: "AR_INVOICE_DELETE", payload: id }),

        createApBill: ({ supplierName, documentNo, amount, currency, dueDate }) => {
          const bill = {
            id: createId(),
            type: "AP_BILL",
            supplierName: supplierName?.trim() || "",
            documentNo: documentNo?.trim() || "",
            amount: Number(amount) || 0,
            currency: currency || "ZAR",
            dueDate: dueDate || "",
            status: "DRAFT",
            createdAt: nowISO(),
            postedAt: null,
          };
          dispatch({ type: "AP_BILL_CREATE", payload: bill });
          return bill;
        },
        updateApBill: (id, patch) => dispatch({ type: "AP_BILL_UPDATE", payload: { id, patch } }),
        deleteApBill: (id) => dispatch({ type: "AP_BILL_DELETE", payload: id }),

        createCashEntry: ({ book, description, amount, currency, date, reference }) => {
          const entry = {
            id: createId(),
            type: "CASH",
            book, // Home | Foreign | Reconciliation
            description: description?.trim() || "",
            amount: Number(amount) || 0,
            currency: currency || "ZAR",
            date: date || "",
            reference: reference?.trim() || "",
            createdAt: nowISO(),
          };
          dispatch({ type: "CASH_ENTRY_CREATE", payload: entry });
          return entry;
        },

        createJournalEntry: ({ journalType, memo, lines }) => {
          const entry = {
            id: createId(),
            type: "JOURNAL",
            journalType,
            memo: memo?.trim() || "",
            lines: Array.isArray(lines) ? lines : [],
            createdAt: nowISO(),
            postedAt: null,
            status: "POSTED", // for demo keep as posted
          };
          dispatch({ type: "JOURNAL_ENTRY_CREATE", payload: entry });
          return entry;
        },

        createArReceipt: ({ customerName, amount, currency, date, reference, arInvoiceId }) => {
          const receipt = {
            id: createId(),
            type: "AR_RECEIPT",
            customerName: customerName?.trim() || "",
            amount: Number(amount) || 0,
            currency: currency || "ZAR",
            date: date || "",
            reference: reference?.trim() || "",
            arInvoiceId: arInvoiceId || null,
            createdAt: nowISO(),
          };
          dispatch({ type: "AR_RECEIPT_CREATE", payload: receipt });
          return receipt;
        },
      },
    };
  }, [state]);

  return <BillingStoreContext.Provider value={value}>{children}</BillingStoreContext.Provider>;
}

export function useBillingStore() {
  const ctx = useContext(BillingStoreContext);
  if (!ctx) throw new Error("useBillingStore must be used within BillingStoreProvider");
  return ctx;
}

