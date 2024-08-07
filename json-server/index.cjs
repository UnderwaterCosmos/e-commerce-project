const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));
server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 500);
  });
  next();
});
server.post('/login', (req, res) => {
  try {
    const { login, password } = req.body;
    const db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8')
    );
    const { users = [] } = db;
    const userFromBd = users.find(
      (user) => user.login === login && user.password === password
    );
    if (userFromBd) {
      return res.json(userFromBd);
    }
    return res.status(403).json({ message: 'User not found' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});
server.use((req, res, next) => {
  if (
    req.path === '/categories' ||
    req.path.includes('/products') ||
		req.path === '/users'
  ) {
    return next();
  }

  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'AUTH ERROR' });
  }
  next();
});
server.use(router);
server.listen(3000, () => {
  console.log('server is running on 3000 port');
});
