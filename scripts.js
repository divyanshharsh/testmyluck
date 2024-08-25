document.getElementById('jsonForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const jsonInput = document.getElementById('jsonInput').value;
  const errorDiv = document.getElementById('error');
  const responseDiv = document.getElementById('response');
  const charactersSection = document.getElementById('characters');
  const numbersSection = document.getElementById('numbers');
  const highestAlphabetSection = document.getElementById('highestAlphabet');

  errorDiv.textContent = '';
  responseDiv.style.display = 'none';

  try {
    const data = JSON.parse(jsonInput);
    const numbers = data.data.filter(item => !isNaN(item));
    const alphabets = data.data.filter(item => isNaN(item));
    const highestAlphabet = alphabets.length ? [alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b)] : [];

    charactersSection.querySelector('p').textContent = JSON.stringify(alphabets);
    numbersSection.querySelector('p').textContent = JSON.stringify(numbers);
    highestAlphabetSection.querySelector('p').textContent = JSON.stringify(highestAlphabet);

    responseDiv.style.display = 'block';
  } catch (err) {
    errorDiv.textContent = 'Invalid JSON input';
  }
});

document.querySelectorAll('#response input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    const section = document.getElementById(this.value);
    section.style.display = this.checked ? 'block' : 'none';
  });
});
