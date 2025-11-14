const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

app.use(express.json());

const SALT_ROUNDS = 10;

const mockUsers = {};

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    if (mockUsers[username]) {
        return res.status(409).json({ error: 'User already exists.' });
    }

    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);

        mockUsers[username] = {
            username: username,
            hashedPassword: hashedPassword
        };

        console.log(`Registered user: ${username}, HASH: ${hashedPassword}`);

        res.status(201).json({
            message: 'User registered successfully',
            username: username,
            storedHash: hashedPassword
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error during registration.' });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    const user = mockUsers[username];

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials (user not found).' });
    }

    try {
        const isMatch = await bcrypt.compare(password, user.hashedPassword);

        if (isMatch) {
            res.status(200).json({ message: 'Login successful!', username: username });
        } else {
            res.status(401).json({ error: 'Invalid credentials (password incorrect).' });
        }

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error during login/comparison.' });
    }
});


app.get('/', (req, res) => {
    res.send(`
        <h1>Bcrypt Express Demo</h1>
        <p>Server is running. Test with POST requests:</p>
        <ul>
            <li><strong>POST /api/register</strong> to hash and store a password.</li>
            <li><strong>POST /api/login</strong> to compare a password against the stored hash.</li>
        </ul>
        <p>Check the console for mock database updates.</p>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Use a tool like Postman or curl to test the endpoints.');
});