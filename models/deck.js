const path = require('path');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bzmntipyptrbuojeqhxv.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);



class Deck {
    constructor(id, name, subject) {
        this.id = id;
        this.name = name;
        this.subject = subject;
        
    }


    static async addDeck(id, name, subject) {
        const { error } = await supabase
        .from('decks')
        .insert({ id: id, name: name, subject: subject });
        if (error) {
            console.error('Error adding deck:', error);
            throw error;
        }
    }

    static async getDecks(user_email) {
    const { data, error } = await supabase
      .from('decks')
      .select('id, name, subject')
      .eq('user_email', user_email);

    if (error) {
      console.error('Error fetching decks:', error);
      throw error;
    }
    return data.map(d => new Deck(d.id, d.name, d.subject));
  }
}

module.exports = Deck;