import express from 'express';
import Assignment from '../models/Assignment';
import { createAssignment, deleteAssignment, readAllAssignments, readAssignmentById, updateAssignment, averageScore, } from '../models/assignment-database';

//creates a new router object
const routes = express.Router();

routes.get('/', (req, res) => {
  const assignments = readAllAssignments();
  const getAverage = averageScore(assignments).toFixed(1);
  res.render('assignment-list', { 
    assignments, getAverage
  });
});

routes.get('/add', (req, res) => {
  res.render('add-assignment-form');
});

routes.post('/add-submit', (req, res) => {
  const assignment: Assignment = {
    title: req.body.title,
    score: Number(req.body.score),
    total: Number(req.body.total),
    completed: req.body.completed
  }
  createAssignment(assignment);
  res.render('add-assignment-confirmation', { assignment });
});

routes.get("/:id/edit", (req, res) =>{
  const id:number = Number(req.params.id);
  const assignment = readAssignmentById(id);
  if (assignment){
    res.render("edit-assignment-form", {assignment});
  } else {
    res.status(404).render('error/not-found');
  }
});

routes.post('/:id/edit-submit', (req, res) => {
  const assignment: Assignment = {
    id: parseInt(req.params.id),
    title: req.body.title,
    score: req.body.score,
    total: req.body.total,
    completed: req.body.completed
  }
  if(updateAssignment(assignment)) {
    res.render('edit-assignment-confirmation', { assignment });
  } else {
    res.status(404).render('error/not-found');
  }
});

routes.get('/:id/delete', (req, res) => {
  const id = parseInt(req.params.id);
  const assignment = readAssignmentById(id)
  if (assignment) {
    deleteAssignment(id);
    res.render('delete-assignment-confirmation', { title: assignment.title });
  } else {
    res.status(404).render('error/not-found');
  }
});

export default routes;