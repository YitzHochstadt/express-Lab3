import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.render('homepage');
});

export default routes;