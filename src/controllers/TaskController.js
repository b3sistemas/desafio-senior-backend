const TaskService = require('../services/TaskService');
const jwt = require('jsonwebtoken');


module.exports = {

    doLogin: (req, res) => {
        console.log("username " + req.body.username +  " password " + req.body.password);
        if(req.body.username === process.env.NODE_LOGIN_USERNAME && req.body.password === process.env.NODE_LOGIN_PASSWORD){
            const user_id = 1; //esse id vira do database
            const token = jwt.sign({ user_id }, process.env.SECRET, {
              expiresIn: 300 // expires in 5min
            });
            return res.json({ auth: true, token: token });
          }
          
          res.status(500).json({message: 'Login inválido!'});
    },

    doLogout: (req, res) => {
        res.json({ auth: false, token: null });
    },

    readTasks: async (req, res) => {
        let json = {erro: '', result:[]};

        let tasks = await TaskService.readTasks();

        for (let i in tasks){
            json.result.push({
		task_title: tasks[i].task_title,
                task_id: tasks[i].task_id,
                user_id: tasks[i].user_id,
		username: tasks[i].username,
                task_note: tasks[i].task_note,
		task_priority: tasks[i].task_priority
            });
        }
        res.json(json);
    },

    readOneTask: async (req, res) => {
        let json = {erro: '', result:{}};

        let task_id = req.params.task_id;

        let task = await TaskService.readOneTask(task_id);

        if (task){
            json.result = task;
        }
        res.json(json);
    },

    insertTask: async (req, res) => {
        let json = {erro: '', result:{}};

	let task_list_id_fk = req.body.task_list_id_fk;    
        let task_priority = req.body.task_priority;
        let task_note = req.body.task_note;

        if (task_list_id_fk && task_note && task_priority){

            let TaskId = await TaskService.insertTask(task_list_id_fk, task_note, task_priority);

            json.result = {
                task_id: TaskId,
                task_note,
                task_priority
            };
        }
        else{
            json.error = "Fields can't by empty";
        }
        res.json(json);
    },

    updateTask: async (req, res) => {
        let json = {erro: '', result:{}};

        let task_id = req.params.task_id;
        let user_id = req.body.user_id;
        let task_note = req.body.task_note;

        if (task_id && user_id && task_note){

            await TaskService.updateTask(task_id, user_id, task_note);

            json.result = {
                task_id,
                user_id,
                task_note
            };
        }
        else{
            json.error = "Fields can't by empty";
        }
        res.json(json);
    },

    deleteTask: async (req, res) => {
        let json = {erro: '', result:{}};

        await TaskService.deleteTask(req.params.task_id);

        res.json(json);
    },

    welcome: (req, res) => {
        res.json({message: "Welcome!"});
    }

}
