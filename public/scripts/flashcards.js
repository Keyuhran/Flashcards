console.log('⚡ flashcards.js loaded');
document.addEventListener('DOMContentLoaded', () => {

    


    async function loadCards() {
        console.log('➔ loadCards() running…');
        console.log('➔ about to fetch /get-flashcards');
        try {
            const response = await fetch('/get-flashcards');
            console.log('➔ fetch returned:', response.status);
            if (!response.ok) throw new Error(response.statusText);
            const flashcards = await response.json();
            console.log('➔ JSON payload:', flashcards);
            displayFlashcards(flashcards);
        } catch (error) {
            console.error('Error loading flashcards:', error);
        }
    }

    function displayFlashcards(flashcards) {
        const flashcardContainer = document.getElementById('flashcard-container');
        flashcardContainer.innerHTML = ''; // Clear existing content

        flashcards.forEach(flashcard => {
            const flashcardItem = document.createElement('div');
            flashcardItem.className = 'flashcard-item';
            flashcardItem.innerHTML = `
                <h3>${flashcard.subject}</h3>
                <p>${flashcard.question}</p>
                <button class="delete-button" data-id="${flashcard.id}">Delete</button>
            `;
            flashcardContainer.appendChild(flashcardItem);
        });

        // Add event listeners to delete buttons
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (event) => {
                const id = event.target.getAttribute('data-id');
                await deleteFlashcard(id);
            });
        });
    }
 loadCards();
});

