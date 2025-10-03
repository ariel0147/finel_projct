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
// יצירת פרויקט חדש
router.post('/', upload.single('myFile'), (req, res) => {
    let id = nextId++;
    let name = req.body.name;
    let Description = req.body.Description;
    let myFileName = req.file ? req.file.filename : null;
    let Project = { id, name, Description, myFileName, likes: 0, dislikes: 0 };
    Projects[id] = Project;
    res.json(Project);
});
// מחיקת פרויקט
router.delete('/:id', (req, res) => {
    let id = Number(req.params.id);
    if (isNaN(id)) return res.json({ message: "לא חוקי" });

    let Project = Projects[id];
    if (!Project) return res.json({ message: "לא קיים" });

    if (Project.myFileName && fs.existsSync(path.join('images', Project.myFileName))) {
        fs.unlinkSync(path.join('images', Project.myFileName));
    }
    Projects[id] = null;
    res.json({ message: "ok" });
});
// החזרת פרויקט לפי ID
router.get('/:id', (req, res) => {
    let id = Number(req.params.id);
    if (isNaN(id)) return res.json({ message: "לא חוקי" });

    let Project = Projects[id];
    if (!Project) return res.json({ message: "לא קיים" });

    res.json(Project);
});
// עדכון פרויקט
router.patch('/:id', upload.single('myFile'), (req, res) => {
    let id = Number(req.params.id);
    if (isNaN(id)) return res.json({ message: "לא חוקי" });

    let Project = Projects[id];
    if (!Project) return res.json({ message: "לא קיים" });

    let oldFileName = Project.myFileName;
    let newFileName = req.file ? req.file.filename : null;

    if (oldFileName && newFileName && newFileName !== oldFileName) {
        if (fs.existsSync(path.join('images', oldFileName))) {
            fs.unlinkSync(path.join('images', oldFileName));
        }
        Project.myFileName = newFileName;
    }

    let name = req.body.name;
    let Description = req.body.Description;
    if (name) Project.name = name;
    if (Description) Project.Description = Description;

    res.json(Project);
});
// לייק לפי IP
router.post('/:id/like', (req, res) => {
    let id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "לא חוקי" });

    let Project = Projects[id];
    if (!Project) return res.status(404).json({ message: "לא קיים" });

    let ip = getClientIP(req);
    votedIPs[id] = votedIPs[id] || new Set();

    if (votedIPs[id].has(ip)) {
        return res.status(403).json({ message: "כבר הצבעת" });
    }

    Project.likes++;
    votedIPs[id].add(ip);
    res.json(Project);
});
// דיסלייק לפי IP
router.post('/:id/dislike', (req, res) => {
    let id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "לא חוקי" });

    let Project = Projects[id];
    if (!Project) return res.status(404).json({ message: "לא קיים" });

    let ip = getClientIP(req);
    votedIPs[id] = votedIPs[id] || new Set();

    if (votedIPs[id].has(ip)) {
        return res.status(403).json({ message: "כבר הצבעת" });
    }

    Project.dislikes++;
    votedIPs[id].add(ip);
    res.json(Project);
});

module.exports = router;