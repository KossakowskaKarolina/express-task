const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  res.show = name => {
    res.sendFile(path.join(__dirname, `/views/${name}.html`));
  };
  next();
});

app.use('/user', (req, res, next) => {
  if (isLogged()) next();
  else res.send('Please log in to continue');
});

app.get(['/', '/home'], (req, res) => {
  res.show('index');
});

app.get('/about', (req, res) => {
  res.show('about');
});

app.get('/404-notfound.png', (req, res) => {
  res.sendFile(path.join(__dirname, '404-notfound.png'));
});

app.use((req, res) => {
  res.status(404).show('not-found');
});



app.listen(7000);