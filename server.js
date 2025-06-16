const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use('/proxy', createProxyMiddleware({
  target: 'https://example.com',
  changeOrigin: true,
  selfHandleResponse: false,
  secure: false,
  logLevel: 'warn',
  router: req => {
    let targetUrl = req.query.url;
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = 'https://' + targetUrl;
    }
    return targetUrl;
  },
  pathRewrite: (path, req) => {
    const target = new URL(req.query.url);
    return target.pathname + target.search;
  }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
