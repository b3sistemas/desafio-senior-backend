const db = require('../db');

module.exports = {
    readTasks: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM t_task_list t1,t_tasks t2,t_users t3 WHERE 	t1.task_list_id = t2.task_list_id_fk AND t1.user_id_fk = t3.user_id ORDER BY t2.task_id', (error, results) => {
                if ( error ){
                    rejeitado(error);
                    return;
                }
                aceito(results);
            });
        });
    },

    readOneTask: (task_id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM t_task_list t1,t_tasks t2,t_users t3 WHERE t1.task_list_id = t2.task_list_id_fk AND t1.user_id_fk = t3.user_id AND t2.task_id = ? ORDER BY t2.task_id', [task_id], (error, results) => {
                if (error){			
			console.log(error);
                    rejeitado(error);
                    return;
                }
                if (results.length > 0){
                    aceito(results[0]);
		}                
                else{
                    aceito(false);
                }
            });
        });
    },

    insertTask: (task_list_id_fk, task_note, task_priority) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO t_tasks (task_list_id_fk, task_note, task_priority) VALUES (?, ?, ?)',
                [task_list_id_fk, task_note, task_priority], 
                (error, results) => {
                    if (error){
                        rejeitado(error);
			    console.log(error);
                        return;
                    }
                    aceito(results.insertTask);
                } 
            );
        });
    },

    updateTask: (task_id, task_note, task_priority) => {
        return new Promise((aceito, rejeitado) => {
		let sql = 'UPDATE t_tasks SET task_note = ?, task_priority = ? WHERE task_id = ?';
            	db.query(sql, [task_note, task_priority, task_id], (error, results) => {
                    if (error){
                        rejeitado(error);
                        return;
                    }
                    aceito(results.updateTask);
                }   
            );
        });
    },

    deleteTask: (task_id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM t_tasks WHERE task_id = ?', [task_id], (error, results) => {
                if ( error ){
                    rejeitado(error);
                    return;
                }
                aceito(results);
            });
        });
    },    
    
};
