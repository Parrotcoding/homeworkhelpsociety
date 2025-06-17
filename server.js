const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/redirect', (req, res) => {
  const url = decodeURIComponent(req.query.q || '');
  if (!url.startsWith('http')) return res.redirect('https://duckduckgo.com/?q=' + encodeURIComponent(url));
  res.redirect(url);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
