const path = require('path');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bzmntipyptrbuojeqhxv.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);


class Flashcard {
    constructor(id, subject, difficulty, question, a1, a2, a3, a4, answer) {
        this.id = id;
        this.subject = subject;
        this.difficulty = difficulty;
        this.question = question;
        this.a1 = a1;
        this.a2 = a2;
        this.a3 = a3;
        this.a4 = a4;
        this.answer = answer;
    }

    static async addFlashcard(id, subject, difficulty, answer, question, a1, a2, a3, a4,) {
        const { error } = await supabase
        .from('flashcards')
        .insert({ id: id, subject: subject, difficulty: difficulty, answer: answer, question: question, a1: a1, a2: a2, a3: a3, a4: a4 });
        if (error) {
            console.error('Error adding flashcard:', error);
            throw error;
        }
    }

    static async getFlashcards(deckName) {
        const { data, error } = await supabase
        .from('flashcards')
        .select('id, subject, difficulty, question, a1, a2, a3, a4, answer')
        .eq('deck_name', deckName);

        if (error) {
        console.error('Error fetching flashcards:', error);
        throw error;
        }
        return data.map(d => new Flashcard(
        d.id, d.subject, d.difficulty, d.question,
        d.a1, d.a2, d.a3, d.a4, d.answer
        ));
    }



    static async deleteFlashcard(id) {
        const { error } = await supabase
        .from('flashcards')
        .delete()
        .eq('id', id);
        if (error) {
            console.error('Error deleting flashcard:', error);
            throw error;
        }
    }
}

module.exports = Flashcard;