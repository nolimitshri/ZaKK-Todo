const Todo = require("../models/Todos");

var todosArray = [];

// Dashboard Controls GET
const renderDashboard = async(req, res) => {
    let errors = [];
    const userId = req.user._id;
    const todos = await Todo.find({ createdBy: userId }).sort('updatedAt');
    todosArray = todos
    res.render('dashboard', {
        errors: errors,
        user: req.user,
        todoArray: todosArray
    });
    todosArray = [];
}

// Dashboard add a Todo POST
const renderAfterSaved = async(req, res) => {
    let errors = [];
    const name = req.body.todoName;
    const desc = req.body.todoDesc;
    if(!name || !desc){
        errors.push({ msg: 'Please enter all fields' });
    }
    if(errors.length > 0){
        const userId = req.user._id;
        const todos = await Todo.find({ createdBy: userId }).sort('updatedAt');
        todosArray = todos
        res.render('dashboard', {
        errors: errors,
        user: req.user,
        todoArray: todosArray
        });
        todosArray = [];
    } else {
        const userId = req.user._id;
        const name = req.body.todoName;
        const desc = req.body.todoDesc;
        const newTodo = new Todo({
        name: name,
        description: desc,
        createdBy: userId
        });
        try{
        const todo = await newTodo.save();
        req.flash('success_msg', 'Your Todo is saved!');
        res.redirect("/dashboard");
        }catch(e){
        console.log(e);  
        }  
    }
};

// Delete a Todo POST/DELETE
const deleteTodo = async(req, res) => {
    const userID = req.user._id;
    const todoID = req.body.todoID;
    try{
        const todo = await Todo.findOneAndDelete({_id: todoID, createdBy: userID});
        const todos = await Todo.find({ createdBy: userID }).sort('createdAt');
        todosArray = todos
        req.flash('error_msg', 'Your Todo is deleted!');
        res.redirect("/dashboard");
    }catch(e){
        console.log(e);
    }
};

// Update Page GET
const renderUpdate = async(req, res) => {
    const todoID = req.params.todoID;
    const userID = req.user._id;
    try{
        const todo = await Todo.findOne({ _id: todoID, createdBy: userID });
        res.render("tasks", {
        user: req.user,
        todo: todo
        });
    }catch(e){
        console.log(e);
    }
};

// Update Page -> Dashboard POST
const renderUpdateSaved = async(req, res) => {
    const todoID = req.params.todoID;
    const userID = req.user._id;
    const new_name = req.body.todoName;
    const new_description = req.body.todoDesc;

    try{
        const todo = await Todo.findOneAndUpdate({ _id: todoID, createdBy: userID }, {name: new_name, description: new_description}, {new: true, runValidators: true});
        const todos = await Todo.find({ createdBy: userID }).sort('createdAt');
        todosArray = todos;
        req.flash('success_msg', 'Your Todo is updated!');
        res.redirect("/dashboard");
    }catch(e){
        console.log(e);
    }
};

// FullView route GET
const renderFullView = async(req, res) => {
    const todoID = req.params.todoID;
    const userID = req.user._id;
    try{
        const todo = await Todo.findOne({ _id: todoID, createdBy: userID });
        res.render("fullView", {
        user: req.user,
        todo: todo
        });
    }catch(e){
        console.log(e);
  }
};

module.exports = {
    renderDashboard,
    renderAfterSaved,
    deleteTodo,
    renderUpdate,
    renderUpdateSaved,
    renderFullView
}