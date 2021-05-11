import express from 'express';
import cors from 'cors';
import path from 'path';
import logger from 'morgan';
import homeRoutes  from './routes/home';
import assignmentRoutes from './routes/assignments';
import apiRoutes from './routes/assignmentsApi';

const app = express();
app.use(logger('dev'));

// Settings for web server
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", homeRoutes);
app.use("/assignments", assignmentRoutes);
app.use("/api", apiRoutes);



// This is a catch-all for any other URL...
app.use((req,res) => {
  res.status(404).render('error/not-found');
});

const port = 3000;
app.listen(port, () => console.log(`Listening on port: ${port}.`));
