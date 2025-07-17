const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gnhhkqqahqwdfszpiyfb.supabase.co';
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
        .from('Flashcards')
        .insert({ id: id, subject: subject, difficulty: difficulty, answer: answer, question: question, a1: a1, a2: a2, a3: a3, a4: a4 });
        if (error) {
            console.error('Error adding flashcard:', error);
            throw error;
        }
    }

    static async getFlashcards() {
        const { data, error } = await supabase
        .from('Flashcards')
        .select('*');
        if (error) {
            console.error('Error fetching flashcards:', error);
            throw error;
        }
        return new data.map(flashcardData => new flashcard(
            flashcardData.id, 
            flashcardData.subject,
            flashcardData.difficulty,
            flashcardData.question, 
            flashcardData.a1, 
            flashcardData.a2,
            flashcardData.a3, 
            flashcardData.a4, 
            flashcardData.answer));
    }


    static async deleteFlashcard(id) {
        const { error } = await supabase
        .from('Flashcards')
        .delete()
        .eq('id', id);
        if (error) {
            console.error('Error deleting flashcard:', error);
            throw error;
        }
    }
}


module.exports = {
    Flashcard
};