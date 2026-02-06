// Importera SCSS
import './style.scss';

// Hantera formulär för utgift
const expenseForm = document.getElementById('expenseForm');
const expenseAmountInput = document.getElementById('expenseAmount');
const expenseDescriptionInput = document.getElementById('expenseDescription');

expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const amount = parseFloat(expenseAmountInput.value);
  const description = expenseDescriptionInput.value.trim();
  
  if (amount <= 0) {
    alert('Beloppet måste vara större än 0');
    return;
  }
  
  if (!description) {
    alert('Beskrivning krävs');
    return;
  }
  
  // Här kan du spara eller hantera utgiften
  console.log('Utgift:', { amount, description });
  
  // Återställ formuläret
  expenseForm.reset();
  
  // Visuell feedback
  alert(`Utgift tillagd: ${description} - ${amount} kr`);
});

// Hantera formulär för inkomst
const incomeForm = document.getElementById('incomeForm');
const incomeAmountInput = document.getElementById('incomeAmount');
const incomeDescriptionInput = document.getElementById('incomeDescription');

incomeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const amount = parseFloat(incomeAmountInput.value);
  const description = incomeDescriptionInput.value.trim();
  
  if (amount <= 0) {
    alert('Beloppet måste vara större än 0');
    return;
  }
  
  if (!description) {
    alert('Beskrivning krävs');
    return;
  }
  
  // Här kan du spara eller hantera inkomsten
  console.log('Inkomst:', { amount, description });
  
  // Återställ formuläret
  incomeForm.reset();
  
  // Visuell feedback
  alert(`Inkomst tillagd: ${description} - ${amount} kr`);
});
