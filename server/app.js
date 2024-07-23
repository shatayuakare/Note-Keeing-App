
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const bodyParser = require('body-parser');
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from "bcryptjs"
import bodyParser from "body-parser"


const app = express();
app.use(bodyParser.json());
// app.use(express.JSON())

mongoose.connect("mongodb+srv://smartcoder:smartcoder@cluster0.qyvfq1y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ username, password: hashedPassword });
    user.save((err) => {
        if (err) {
            res.status(400).send({ message: 'Error creating user' });
        } else {
            res.send({ message: 'User created successfully' });
        }
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err || !user) {
            res.status(401).send({ message: 'Invalid credentials' });
        } else {
            const isValid = bcrypt.compareSync(password, user.password);
            if (!isValid) {
                res.status(401).send({ message: 'Invalid credentials' });
            } else {
                res.send({ message: 'Logged in successfully' });
            }
        }
    });
});

app.get('/notes', async (req, res) => {
    await User.find((err, users) => {
        if (err) {
            res.status(500).send({ message: 'Error fetching notes' });
        } else {
            res.send(users);
        }
    });
});

app.post('/add-note', (req, res) => {
    const { title, content } = req.body;
    const user = req.user;
    const note = new mongoose.Document({
        title,
        content,
        userId: user._id
    });
    note.save((err) => {
        if (err) {
            res.status(400).send({ message: 'Error creating note' });
        } else {
            res.send({ message: 'Note created successfully' });
        }
    });
});

app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    Note.findById(id, (err, note) => {
        if (err) {
            res.status(404).send({ message: 'Note not found' });
        } else {
            res.send(note);
        }
    });
});

app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    Note.findByIdAndUpdate(id, { title, content }, (err) => {
        if (err) {
            res.status(400).send({ message: 'Error updating note' });
        } else {
            res.send({ message: 'Note updated successfully' });
        }
    });
});

app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    Note.findByIdAndRemove(id, (err) => {
        if (err) {
            res.status(404).send({ message: 'Note not found' });
        } else {
            res.send({ message: 'Note deleted successfully' });
        }
    });
});

app.listen(3000, () => console.log('Server started on port 3000'));