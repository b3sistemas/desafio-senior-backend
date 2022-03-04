const express = require('express');
const router = express.Router();
const TaskController = require('./controllers/TaskController');
const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.user_id = decoded.user_id;
      next();
    });
}

router.get('/', TaskController.welcome);
router.get('/tasks-auth', verifyJWT, TaskController.readTasks); //rota verificada pelo OAuth
router.get('/tasks',  TaskController.readTasks);
router.get('/tasks/:task_id', TaskController.readOneTask);
router.post('/task', TaskController.insertTask);
router.post('/login', TaskController.doLogin);
router.post('/logout', TaskController.doLogout);
router.put('/task/:task_id', TaskController.updateTask);
router.delete('/task/:task_id', TaskController.deleteTask);

module.exports = router;


