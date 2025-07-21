// scripts/decks.js
console.log('⚡ decks.js loaded');

document.addEventListener('DOMContentLoaded', () => {

  async function loadDecks() {
    console.log('➔ loadDecks() running…');
    try {
      const res = await fetch('/get-decks');
      if (!res.ok) throw new Error(res.statusText);
      const decks = await res.json();
      console.log('➔ decks payload:', decks);
      displayDecks(decks);
    } catch (err) {
      console.error('Error loading decks:', err);
    }
  }

  function displayDecks(decks) {
    const container = document.getElementById('flashcard-container');
    container.innerHTML = ''; // clear

    decks.forEach(deck => {
      const item = document.createElement('div');
      item.className = 'flashcard-item';
      item.innerHTML = `
        <div class="flashcard-info">
          <h3 class="subject">${deck.name}</h3>
          <p class="details">${deck.subject}</p>
        </div>
        <button class="delete-button" data-id="${deck.id}">
          <i class="fas fa-trash"></i>
        </button>
      `;
      container.appendChild(item);
    });

    // wire up delete if you have that
    container.querySelectorAll('.delete-button').forEach(btn => {
      btn.addEventListener('click', async e => {
        const id = btn.dataset.id;
        // your deleteFlashcard(id) logic…
      });
    });
  }

  loadDecks();
});
