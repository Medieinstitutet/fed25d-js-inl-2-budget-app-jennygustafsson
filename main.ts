import './style.scss';
import categoriesData from './categories.json';
import type { Transaction, TransactionList } from './models';

console.log('Main.ts körs - TypeScript ovanpå JavaScript');

// Fyll kategorilistorna från JSON
function populateCategorySelects(): void {
  const expenseSelect = document.getElementById('expenseCategory');
  const incomeSelect = document.getElementById('incomeCategory');
  const data = categoriesData as { expense: string[]; income: string[] };

  if (expenseSelect && data.expense) {
    data.expense.forEach((name: string) => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      expenseSelect.appendChild(option);
    });
  }

  if (incomeSelect && data.income) {
    data.income.forEach((name: string) => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      incomeSelect.appendChild(option);
    });
  }
}

// Nyckel för localStorage
const STORAGE_KEY = 'budgetItems';

// Array för att lagra budgetposter (använder interfacet i array-kontext)
let budgetItems: TransactionList = loadFromStorage();

// Ladda från localStorage – returnerar TransactionList (typad funktion #1)
function loadFromStorage(): TransactionList {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored ? JSON.parse(stored) : []) as TransactionList;
  } catch (e) {
    console.error('Kunde inte ladda från localStorage:', e);
    return [];
  }
}

// Spara till localStorage
function saveToStorage(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(budgetItems));
  } catch (e) {
    console.error('Kunde inte spara till localStorage:', e);
  }
}

// Funktion för att visa feedback
function setFeedback(message: string): void {
  alert(message);
}

// Beräkna balans (inkomster - utgifter) – typad funktion med TransactionList (typad funktion #2)
function calculateBalance(items: TransactionList): number {
  let totalIncome = 0;
  let totalExpenses = 0;

  items.forEach((item: Transaction) => {
    if (item.type === 'income') {
      totalIncome += item.amount;
    } else if (item.type === 'expense') {
      totalExpenses += item.amount;
    }
  });

  return totalIncome - totalExpenses;
}

// Funktion för att uppdatera balansen med färgkodning
function updateBalance(): void {
  const balance = calculateBalance(budgetItems);
  const balanceElement = document.getElementById('balanceAmount');

  if (balanceElement) {
    const formattedAmount = balance >= 0
      ? `+${balance.toFixed(2)} kr`
      : `${balance.toFixed(2)} kr`;

    balanceElement.textContent = formattedAmount;

    balanceElement.classList.remove('positive', 'negative');
    if (balance >= 0) {
      balanceElement.classList.add('positive');
    } else {
      balanceElement.classList.add('negative');
    }
  }
}

// Lägg till en transaktion – typad funktion med Transaction-interface
function addTransaction(
  type: Transaction['type'],
  amount: number,
  description: string,
  category: string
): void {
  const newTransaction: Transaction = {
    id: Date.now(),
    type,
    amount,
    description,
    category,
  };
  budgetItems.push(newTransaction);
  console.log(`${type === 'expense' ? 'Utgift' : 'Inkomst'} tillagd:`, { amount, description });
  saveToStorage();
  updateBalance();
}

// Funktion för att radera senaste utgiften
function deleteLastExpense(): void {
  for (let i = budgetItems.length - 1; i >= 0; i--) {
    if (budgetItems[i].type === 'expense') {
      const deleted: Transaction = budgetItems.splice(i, 1)[0];
      alert(`Utgift raderad: ${deleted.description} - ${deleted.amount.toFixed(2)} kr`);
      saveToStorage();
      updateBalance();
      return;
    }
  }
  alert('Ingen utgift att radera');
}

// Funktion för att radera senaste inkomsten
function deleteLastIncome(): void {
  for (let i = budgetItems.length - 1; i >= 0; i--) {
    if (budgetItems[i].type === 'income') {
      const deleted: Transaction = budgetItems.splice(i, 1)[0];
      alert(`Inkomst raderad: ${deleted.description} - ${deleted.amount.toFixed(2)} kr`);
      saveToStorage();
      updateBalance();
      return;
    }
  }
  alert('Ingen inkomst att radera');
}

// Hantera formulär för utgift
const expenseForm = document.getElementById('expenseForm');
const expenseAmountInput = document.getElementById('expenseAmount') as HTMLInputElement;
const expenseDescriptionInput = document.getElementById('expenseDescription') as HTMLInputElement;
const expenseCategorySelect = document.getElementById('expenseCategory') as HTMLSelectElement;

expenseForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const amount = parseFloat(expenseAmountInput.value);
  const description = expenseDescriptionInput.value.trim();
  const category = expenseCategorySelect.value;

  if (!Number.isFinite(amount) || amount <= 0) {
    setFeedback('Skriv ett belopp större än 0');
    return;
  }

  if (!description) {
    setFeedback('Skriv en beskrivning');
    return;
  }

  if (!category) {
    setFeedback('Välj en kategori');
    return;
  }

  addTransaction('expense', amount, description, category);
  (expenseForm as HTMLFormElement).reset();
});

// Hantera formulär för inkomst
const incomeForm = document.getElementById('incomeForm');
const incomeAmountInput = document.getElementById('incomeAmount') as HTMLInputElement;
const incomeDescriptionInput = document.getElementById('incomeDescription') as HTMLInputElement;
const incomeCategorySelect = document.getElementById('incomeCategory') as HTMLSelectElement;

incomeForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const amount = parseFloat(incomeAmountInput.value);
  const description = incomeDescriptionInput.value.trim();
  const category = incomeCategorySelect.value;

  if (!Number.isFinite(amount) || amount <= 0) {
    setFeedback('Skriv ett belopp större än 0');
    return;
  }

  if (!description) {
    setFeedback('Skriv en beskrivning');
    return;
  }

  if (!category) {
    setFeedback('Välj en kategori');
    return;
  }

  addTransaction('income', amount, description, category);
  (incomeForm as HTMLFormElement).reset();
});

// Event listeners för radera-knappar
const deleteLastExpenseBtn = document.getElementById('deleteLastExpense');
const deleteLastIncomeBtn = document.getElementById('deleteLastIncome');

if (deleteLastExpenseBtn) {
  deleteLastExpenseBtn.addEventListener('click', deleteLastExpense);
}

if (deleteLastIncomeBtn) {
  deleteLastIncomeBtn.addEventListener('click', deleteLastIncome);
}

// Initiera sidan: ladda kategorier från JSON och uppdatera balans
function init(): void {
  populateCategorySelects();
  updateBalance();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
