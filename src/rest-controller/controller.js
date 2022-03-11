import express from 'express';
import { addNewTask } from '../service/add-new-task';
import { deleteTask } from '../service/delete-task';
import { updateTask } from '../service/update-task';
import { deleteCourse } from '../service/delete-course';
import { addNewCourse } from '../service/add-new-course';
import { setCourseForTask } from '../service/set-course-for-task';
import { getAllTasks } from '../service/get-all-tasks';
import { getTaskById } from '../service/get-task-by-id';
import { getAllCourses } from '../service/get-all-courses';
import { getCourseById } from '../service/get-course-by-id';
import { deleteAllCourses } from '../service/delete-all-courses';
import { deleteAllTasks } from '../service/delete-all-tasks';
import { addNewUser } from '../service/add-new-user';
import { logoutUser } from '../service/logout-user';
import { getUserByName } from '../service/login';

var controller = express.Router();

controller.get('/tasks/:username', async function(req, res){
    console.log("Get all tasks");
   
    const tasks = await getAllTasks(req.params.username);

    res.status(200).send(tasks);
});

controller.get('/task/:id', async function(req, res){
    console.log("Get task by id");

    let task = {};
    try{
        task = await getTaskById(req.params.id);
    } catch (err){
        res.status(500).send(err.message);
    }

    res.status(200).send(task);
});

controller.post('/task/new', async function(req, res){
    console.log("Add new task");
    console.log(req.body);
    let task = req.body.task;
    
    let username = task.ownerUser;
    if(username == null){
        res.status(400).send("Username not found.");
        return;
    }
    
    let password = task.password;
    if(password == null){
        res.status(400).send("Password not found.");
        return;
    }
    
    let user = await getUserByName(username, password);
    if (user != null) {
        delete task.password;
        let insertedTask = await addNewTask(task, username, password);
        res.status(200).send(insertedTask);
    } else {
        res.status(401).send("Username or Password is incorrect.");
        return;
    }
    

});

controller.delete('/task/delete', async function(req, res){
    console.log("Delete existing task");
    console.log(req.body);
    let task = req.body.task;
    let taskID = task._id;
    if(!taskID.match("^(.{12}|[0-9a-fA-f]{24})$")){
        res.status(400).send("Error: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
        return;
    }

    let ack = await deleteTask(taskID);

    res.status(200).send(ack);
});

controller.delete('/task/delete-all',async function(req, res){
    console.log("Delete all courses");

    let ack = await deleteAllTasks();

    res.status(200).send(ack);
});

controller.post('/task/update', async function(req, res){
    console.log("Update task");
    console.log(req.body);
    let task = req.body.task;

    let response = await updateTask(task);

    res.status(200).send(response);
});

controller.post('/task/setcourse', async function(req, res){
    console.log("set course for task");
    console.log(req.body);
    let taskId = req.body.taskId;
    let courseId = req.body.courseId;

    let ack = {};

    try{
        ack = await setCourseForTask(taskId,courseId);
    } catch(err){
        res.status(500).send(err.message);
    }

    res.status(200).send(ack);
});

controller.get('/courses/:username', async function(req, res){
    console.log("Get all courses");
   
    const courses = await getAllCourses(req.params.username);

    res.status(200).send(courses);
});

controller.get('/course/:id', async function(req, res){
    console.log("Get course by id");

    let course = {};

    try{
        course = await getCourseById(req.params.id);
    } catch (err){
        res.status(500).send(err.message);
    }

    res.status(200).send(course);
});

controller.post('/course/new', async function(req, res){
    console.log("Add new course");
    console.log(req.body);
    let course = req.body.course;
    
    let username = course.ownerUser;
    if(username == null){
        res.status(400).send("Username not found.");
        return;
    }
    
    let password = course.password;
    if(password == null){
        res.status(400).send("Password not found.");
        return;
    }

    let user = await getUserByName(username, password);
    if (user != null) {
        delete course.password
        let entriedCourse = await addNewCourse(course, username, password);
        res.status(200).json(entriedCourse);
    } else {
        res.status(401).send("Username or Password is incorrect.");
        return;
    }  


});

controller.delete('/course/delete', async function(req, res){
    console.log("Delete course");
    console.log(req.body);
    let courseID = req.body.course._id;
    if(!courseID.match("^(.{12}|[0-9a-fA-f]{24})$")){
        res.status(400).send("Error: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
        return;
    }

    let ack = await deleteCourse(courseID);

    res.status(200).send(ack);
});

controller.delete('/course/delete-all',async function(req, res){
    console.log("Delete all courses");

    let ack = await deleteAllCourses();

    res.status(200).send(ack);
});

controller.post('/user/new', async function(req, res){
    console.log("Add new user");
    console.log(req.body);
    let user = req.body;
    user.name = user.username;
    user.lastLogin = 0;

    let entriedUser = await addNewUser(user);
    if(entriedUser==null){
        res.status(409).send("Username already in use.");
        console.log("New user failed to be registered: username already in use.");
    } else {
        res.status(200).json(entriedUser);
        console.log("New user succesfully registered.");
    }
});

controller.put('/user/logout', async function(req, res){
    console.log("Logout user");
    let username = req.body.username;

    let password = req.body.password;

    let user = await getUserByName(username,password);
    if(user == null){
        res.status(401).send("Logout tracking failed; incorrect username or password");
        return;
    }
    let userId = user._id;
    let ack = await logoutUser(userId);
    res.status(200).send(ack);
});

controller.put('/user/login/', async function(req, res){
    console.log("Login by username");
    let username = req.body.username;
    let password = req.body.password;

    let user = await getUserByName(username, password);
    if (user !== null) {
        res.status(200).send(user);
    } else {
        res.status(401).send("Username or Password is incorrect.");
    }
    
});


export default controller;
