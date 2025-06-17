const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve all static files (e.g. index.html, toolkit.html)
app.use(express.static(__dirname));

// Redirect route handler
app.get('/redirect', (req, res) => {
  const url = decodeURIComponent(req.query.q || '');
  if (!url.startsWith('http')) {
    return res.redirect('https://duckduckgo.com/?q=' + encodeURIComponent(url));
  }
  res.redirect(url);
});

// Serve index.html on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
