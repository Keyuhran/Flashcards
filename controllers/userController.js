const User = require('../models/user');

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.login(email, password);
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
}


async function registerUser(req,res) {
    try {
        const { email, password, subject1, subject2, subject3, subject4, subject5, subject6, subject7, subject8 } = req.body;
        const user = await User.register(email, password, subject1, subject2, subject3, subject4, subject5, subject6, subject7, subject8);
        res.status(201).json({ message: 'User registered successfully', user });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }

}
module.exports = {
    login,
    registerUser
};