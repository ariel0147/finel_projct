const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Projects = [];
let nextId = 1;
const votedIPs = {}; // שמירת הצבעות לפי IP

// תיקיית תמונות
if (!fs.existsSync('images')) {
    fs.mkdirSync('images');
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        let id = req.params.id ? req.params.id : nextId;
        let finalFileName = `${id}${path.extname(file.originalname)}`;
        cb(null, finalFileName);
    }
});
const upload = multer({ storage: storage });
function getClientIP(req) {
    return req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
}

// החזרת כל הפרויקטים
router.get('/', (req, res) => {
    res.json(Projects.filter(p => p));
});
