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

module.exports = {
    login
};