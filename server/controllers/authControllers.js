const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.getMe = (req, res) => {
    res.status(200).json({ user: req.user });
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).json({
            message: 'Login successful',
            token,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const avatar = req.file ? `/uploads/avatars/${req.file.filename}` : '';

        if (!name) return res.status(400).json({ message: 'Name is required' });
        else if (!email) return res.status(400).json({ message: 'Email is required' });
        else if (!password) return res.status(400).json({ message: 'Password is required' });

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            avatar
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};