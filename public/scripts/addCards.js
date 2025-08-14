document.getElementById('createBtn').addEventListener('click', async () => {
      const payload = {
        deckName: document.getElementById('deckName').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        difficulty: document.getElementById('difficulty').value,
        question: document.getElementById('question').value.trim(),
        a1: document.getElementById('a1').value.trim(),
        a2: document.getElementById('a2').value.trim(),
        a3: document.getElementById('a3').value.trim(),
        a4: document.getElementById('a4').value.trim(),
        answer: document.getElementById('answer').value
      };
      try {
        const res = await fetch('/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error(res.statusText);
        alert('Flashcard created!');
        // clear form
        document.querySelectorAll('#deckName, #subject, #question, #a1, #a2, #a3, #a4').forEach(i => i.value = '');
      } catch (err) {
        console.error(err);
        alert('Failed to create flashcard.');
      }
    });

    // simple filter for decks (optional UX)
    document.getElementById('deckFilter').addEventListener('input', e => {
      // could hook into a deck list; placeholder for future
    });