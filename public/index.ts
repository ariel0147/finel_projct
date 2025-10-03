/* === Dark Mode Base === */
body {
    background-color: #121212;
    color: #00ffff;
    font-family: Arial, sans-serif;
    margin: 0 auto;
    padding: 15px;
    text-align: center;
}

/* === Grid Layout === */
#main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* כרטיסים דינמיים */
    gap: 30px;
    padding: 30px;
}
#myImage{
    width: 50px;
    height: 50px;
}

/* === Cards === */
.card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-height: 320px;
    padding: 20px;
    border: 2px solid #00ffff;
    border-radius: 20px;
    background-color: #1e1e1e;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: center;
}

.card:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 0 25px #00ffff;
}

.card img {
    width: 100%;
    max-height: 160px;
    object-fit: cover;
    margin-bottom: 15px;
    border-radius: 12px;
    box-shadow: 0 0 8px #00ffff;
}

.card p {
    font-size: 18px;
    font-weight: bold;
    margin: 8px 0;
}

.card div {
    margin-top: 5px;
    font-size: 14px;
}

/* === Buttons === */
.card button {
    background-color: transparent;
    color: #00ffff;
    border: 1px solid #00ffff;
    border-radius: 10px;
    padding: 8px 15px;
    margin: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.card button:hover {
    background-color: #00ffff;
    color: #121212;
    box-shadow: 0 0 10px #00ffff;
}

/* === Form Styling === */
form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 30px auto;
    padding: 25px;
    background-color: #1e1e1e;
    border: 2px solid #00ffff;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0,255,255,0.4);
}

form label {
    margin-bottom: 6px;
    font-size: 14px;
    font-weight: bold;
    color: #00ffff;
}

form input, form textarea {
    background-color: #121212;
    border: 1px solid #00ffff;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 15px;
    color: #00ffff;
    outline: none;
    font-size: 14px;
}

form input:focus, form textarea:focus {
    box-shadow: 0 0 10px #00ffff;
}

form button {
    align-self: flex-end;
    background-color: #00ffff;
    color: #121212;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
}

form button:hover {
    box-shadow: 0 0 15px #00ffff;
    transform: scale(1.05);
}
