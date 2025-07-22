// public/scripts/flashcards.js
console.log('⚡ flashcards.js loaded');

const params   = new URLSearchParams(window.location.search);
const deckName = params.get('deckName');

document.addEventListener('DOMContentLoaded', () => {

  async function loadCards() {
    console.log(`➔ Fetching cards for deck: ${deckName}`);
    try {
      const res = await fetch(
        `/get-flashcards?deckName=${encodeURIComponent(deckName)}`
      );
      if (!res.ok) throw new Error(res.statusText);
      const flashcards = await res.json();
      console.log('➔ cards payload:', flashcards);
      displayFlashcards(flashcards);
    } catch (err) {
      console.error('Error loading flashcards:', err);
    }
  }

  function displayFlashcards(flashcards) {
    const container = document.getElementById('flashcard-container');
    container.innerHTML = ''; // clear

    flashcards.forEach(card => {
      const item = document.createElement('div');
      item.className = 'flashcard-item';
      item.innerHTML = `
        <div class="flashcard-info">
          <h3 class="subject">${card.subject}</h3>
          <p class="details">${card.question}</p>
        </div>
        <button class="delete-button" data-id="${card.id}">
          <i class="fas fa-trash"></i>
        </button>
      `;
      container.appendChild(item);
    });

    // wire delete
    container.querySelectorAll('.delete-button').forEach(btn => {
      btn.addEventListener('click', async e => {
        e.stopPropagation();
        const id = btn.dataset.id;
        await fetch(`/delete-flashcard?id=${id}`, { method: 'DELETE' });
        loadCards();  // refresh
      });
    });
  }

  loadCards();
});
