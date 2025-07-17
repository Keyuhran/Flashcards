const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { createClient } = require (supabase)

const supabaseUrl = 'https://gnhhkqqahqwdfszpiyfb.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const Flashcard = require('../models/flashcard');

async function uploadFlashcard(req, res) {
    try {
        const { id, subject, difficulty, question, a1, a2, a3, a4, answer } = req.body;
        await Flashcard.addFlashcard(id, subject, difficulty, answer, question, a1, a2, a3, a4);
        res.status(201).json({ message: 'Flashcard added successfully' });
    } catch (error) {
        console.error('Error uploading flashcard:', error);
        res.status(500).json({ error: 'Failed to upload flashcard' });
    }
}

async function getFlashcards(req, res) {
    try {
        const flashcards = await Flashcard.getFlashcards();
        res.status(200).json(flashcards);
    } catch (error) {
        console.error('Error fetching flashcards:', error);
        res.status(500).json({ error: 'Failed to fetch flashcards' });
    }
}

async function deleteFlashcard(req, res) {
    try {
        const { id } = req.params;
        await Flashcard.deleteFlashcard(id);
        res.status(200).json({ message: 'Flashcard deleted successfully' });
    } catch (error) {
        console.error('Error deleting flashcard:', error);
        res.status(500).json({ error: 'Failed to delete flashcard' });
    }
}

module.exports = {
    uploadFlashcard,
    getFlashcards,
    deleteFlashcard
};



