const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gnhhkqqahqwdfszpiyfb.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);


async function addFlashcard(id, subject, difficulty, answer, question, a1, a2, a3, a4,) {
    const { error } = await supabase
    .from('Flashcards')
    .insert({ id: id, subject: subject, difficulty: difficulty, answer: answer, question: question, a1: a1, a2: a2, a3: a3, a4: a4 });
    return error;
}

module.exports = {
    addFlashcard
};