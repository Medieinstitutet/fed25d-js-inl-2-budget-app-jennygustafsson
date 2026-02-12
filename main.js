import './style.scss';
import categoriesData from './categories.json';

console.log('Main.js körs');

// Fyll kategorilistorna från JSON
function populateCategorySelects() {
  const expenseSelect = document.getElementById('expenseCategory');
  const incomeSelect = document.getElementById('incomeCategory');

  if (expenseSelect && categoriesData.expense) {
    categoriesData.expense.forEach((name) => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      expenseSelect.appendChild(option);
    });
  }

  if (incomeSelect && categoriesData.income) {
    categoriesData.income.forEach((name) => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      incomeSelect.appendChild(option);
    });
  }
}

// Nyckel för localStorage
const STORAGE_KEY = 'budgetItems';

// Array för att lagra budgetposter
let budgetItems = loadFromStorage();

// Spara till localStorage
function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(budgetItems));
  } catch (e) {
    console.error('Kunde inte spara till localStorage:', e);
  }
}

// Ladda från localStorage
function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Kunde inte ladda från localStorage:', e);
    return [];
  }
}

// Funktion för att visa feedback
function setFeedback(message) {
  alert(message);
}

// Funktion för att beräkna balans (inkomster - utgifter)
function calculateBalance() {
  let totalIncome = 0;
  let totalExpenses = 0;

  budgetItems.forEach(item => {
    if (item.type === 'income') {
      totalIncome += item.amount;
    } else if (item.type === 'expense') {
      totalExpenses += item.amount;
    }
  });

  return totalIncome - totalExpenses;
}

// Funktion för att uppdatera balansen med färgkodning
function updateBalance() {
  const balance = calculateBalance();
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

// Funktion för att lägga till en transaktion
function addTransaction(type, amount, description, category) {
  budgetItems.push({
    type: type,
    amount: amount,
    description: description,
    category: category,
    id: Date.now()
  });
  console.log(`${type === 'expense' ? 'Utgift' : 'Inkomst'} tillagd:`, { amount, description });
  saveToStorage();
  updateBalance();
}

// Funktion för att radera senaste utgiften
function deleteLastExpense() {
  for (let i = budgetItems.length - 1; i >= 0; i--) {
    if (budgetItems[i].type === 'expense') {
      const deleted = budgetItems.splice(i, 1)[0];
      alert(`Utgift raderad: ${deleted.description} - ${deleted.amount.toFixed(2)} kr`);
      saveToStorage();
      updateBalance();
      return;
    }
  }
  alert('Ingen utgift att radera');
}

// Funktion för att radera senaste inkomsten
function deleteLastIncome() {
  for (let i = budgetItems.length - 1; i >= 0; i--) {
    if (budgetItems[i].type === 'income') {
      const deleted = budgetItems.splice(i, 1)[0];
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
const expenseAmountInput = document.getElementById('expenseAmount');
const expenseDescriptionInput = document.getElementById('expenseDescription');
const expenseCategorySelect = document.getElementById('expenseCategory');

expenseForm.addEventListener('submit', (e) => {
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
  expenseForm.reset();
});

// Hantera formulär för inkomst
const incomeForm = document.getElementById('incomeForm');
const incomeAmountInput = document.getElementById('incomeAmount');
const incomeDescriptionInput = document.getElementById('incomeDescription');
const incomeCategorySelect = document.getElementById('incomeCategory');

incomeForm.addEventListener('submit', (e) => {
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
  incomeForm.reset();
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
function init() {
  populateCategorySelects();
  updateBalance();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Exportera funktioner och variabler för TypeScript (ovanpå JavaScript-koden)
export { 
  budgetItems, 
  loadFromStorage, 
  calculateBalance, 
  addTransaction,
  saveToStorage,
  updateBalance,
  populateCategorySelects,
  deleteLastExpense,
  deleteLastIncome,
  setFeedback
};
