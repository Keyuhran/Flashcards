 const Deck = require('../models/deck');

async function getDecks(req, res) {
  try {
    const email = req.session.userEmail;
    if (!email) return res.status(401).json({ error: 'Not logged in' });

    const decks = await Deck.getDecks(email);
    res.status(200).json(decks);
  } catch (error) {
    console.error('Error fetching decks:', error);
    res.status(500).json({ error: 'Failed to fetch decks' });
  }
}

async function addDeck(req, res) {
    try {
        const { id, name, subject } = req.body;
        await Deck.addDeck(id, name, subject);
        res.status(201).json({ message: 'Deck added successfully' });
    } catch (error) {
        console.error('Error uploading deck:', error);
        res.status(500).json({ error: 'Failed to upload deck' });
    }
}


module.exports = {
    getDecks,
    addDeck
}