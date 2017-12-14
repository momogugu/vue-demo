export default (app) => {
  app.get('/api/cart/:username', function (req, res) {
    res.send('Hello World!');
  });
  app.post('/api/registe', function (req, res) {
    res.send('Hello mogu!');
  });
}
