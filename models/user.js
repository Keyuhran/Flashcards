const path = require('path');
require('dotenv').config();
const argon2 = require('argon2');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bzmntipyptrbuojeqhxv.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);


class User {
    constructor(id,email, password, subject1, subject2, subject3, subject4, subject5, subject6, subject7, subject8, role) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.subject1 = subject1;
        this.subject2 = subject2;
        this.subject3 = subject3;
        this.subject4 = subject4;
        this.subject5 = subject5;
        this.subject6 = subject6;
        this.subject7 = subject7;
        this.subject8 = subject8;
        this.role = role; 

}

static async login(email, password) {
    try {
      // 1. Fetch the user row
      const { data, error } = await supabase
        .from('users')
        .select('id, email, password, subject1, subject2, subject3, subject4, subject5, subject6, subject7, subject8, role')
        .eq('email', email)
        .single();

      if (error) {
        console.error('Supabase error during login:', error);
        throw error;
      }
      if (!data) {
        throw new Error('Invalid email or password');
      }

      // 2. Verify password against stored hash
      const isValid = await argon2.verify(data.password, password);
      if (!isValid) {
        throw new Error('Invalid email or password');
      }

      // 3. All good—return a User instance
      return new User(
        data.id,
        data.email,
        data.password,
        data.subject1,
        data.subject2,
        data.subject3,
        data.subject4,
        data.subject5,
        data.subject6,
        data.subject7,
        data.subject8,
        data.role

      );

    } catch (err) {
      // central catch: re-throw after logging
      console.error('Error in User.login():', err);
      throw err;
    }
  }


  static async register(email, password, subject1, subject2, subject3, subject4, subject5, subject6, subject7, subject8) {
    try {
      // 1. Hash the password
      const hashedPassword = await argon2.hash(password);

      // 2. Insert into Supabase
      const { data, error } = await supabase
        .from('users')
        .insert({
          email,
          password: hashedPassword,
          subject1,
          subject2,
          subject3,
          subject4,
          subject5,
          subject6,
          subject7,
          subject8,
          role: 'User' 
        })
        .select('*')
        .single();

      if (error) {
        console.error('Supabase error during registration:', error);
        throw error;
      }

      // 3. Return a new User instance
      return new User(
        data.id,
        data.email,
        data.password,
        data.subject1,
        data.subject2,
        data.subject3,
        data.subject4,
        data.subject5,
        data.subject6,
        data.subject7,
        data.subject8,
        data.role
      );

    } catch (err) {
      console.error('Error in User.register():', err);
      throw err;
    }
  }
}





module.exports = User;
