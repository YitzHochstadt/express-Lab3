import express from 'express';
import {averageScore, readAllAssignments} from '../models/assignment-database';

const routes = express.Router();

routes.get('/assignments', (req, res) => {
  const assignments = readAllAssignments();
  res.json(assignments);
  res.status(200);
});

routes.get('/summary', (req, res) => {
  const assignments = readAllAssignments();
  const getAverage = averageScore(assignments);
  res.json({getAverage, assignments});
  res.status(200);
});

export default routes;