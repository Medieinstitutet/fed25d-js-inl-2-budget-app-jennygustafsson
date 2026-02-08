import './style.scss';

console.log('Main.js körs');

// Array för att lagra budgetposter
let budgetItems = [];

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
function addTransaction(type, amount, description) {
  budgetItems.push({
    type: type,
    amount: amount,
    description: description,
    id: Date.now()
  });
  console.log(`${type === 'expense' ? 'Utgift' : 'Inkomst'} tillagd:`, { amount, description });
  updateBalance();
}

// Funktion för att radera senaste utgiften
function deleteLastExpense() {
  for (let i = budgetItems.length - 1; i >= 0; i--) {
    if (budgetItems[i].type === 'expense') {
      const deleted = budgetItems.splice(i, 1)[0];
      alert(`Utgift raderad: ${deleted.description} - ${deleted.amount.toFixed(2)} kr`);
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

expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const amount = parseFloat(expenseAmountInput.value);
  const description = expenseDescriptionInput.value.trim();

  if (!Number.isFinite(amount) || amount <= 0) {
    setFeedback('Skriv ett belopp större än 0');
    return;
  }

  if (!description) {
    setFeedback('Skriv en beskrivning');
    return;
  }

  addTransaction('expense', amount, description);
  expenseForm.reset();
});

// Hantera formulär för inkomst
const incomeForm = document.getElementById('incomeForm');
const incomeAmountInput = document.getElementById('incomeAmount');
const incomeDescriptionInput = document.getElementById('incomeDescription');

incomeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const amount = parseFloat(incomeAmountInput.value);
  const description = incomeDescriptionInput.value.trim();
  
  if (!Number.isFinite(amount) || amount <= 0) {
    setFeedback('Skriv ett belopp större än 0');
    return;
  }

  if (!description) {
    setFeedback('Skriv en beskrivning');
    return;
  }

  addTransaction('income', amount, description);
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

// Uppdatera balans när sidan laddas
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateBalance);
} else {
  updateBalance();
}
