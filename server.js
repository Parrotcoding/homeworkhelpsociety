const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use('/proxy', createProxyMiddleware({
  target: '',
  changeOrigin: true,
  pathRewrite: (path, req) => {
    const url = new URL(req.query.url);
    req.headers.host = url.host;
    return url.pathname + url.search;
  },
  router: req => req.query.url
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
