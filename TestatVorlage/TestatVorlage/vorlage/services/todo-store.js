import Datastore from 'nedb-promises'

export class Todo {
    constructor(todoTitle, todoImportance, todoDate, todoStatus, todoDescription) {
        this.todoTitle = todoTitle;
        this.todoImportance = todoImportance;
        this.todoDate = todoDate; //new Date();
        this.todoStatus = todoStatus;
        this.todoDescription = todoDescription;
        this.state = "OK";
    }
}

export class TodoStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/todo.db', autoload: true});
    }

    async add(todoTitle, todoImportance, todoDate, todoStatus, todoDescription) {
        let todo = new Todo(todoTitle, todoImportance, todoDate, todoStatus, todoDescription);
        const storedTodo = await this.db.insert(todo);
        console.log(todo._id, storedTodo._id);
        return storedTodo;
    }

    async delete(id) {
        await this.db.update({_id: id}, {$set: {"state": "DELETED"}});
        return this.get(id);
    }

    async get(id) {
        return this.db.findOne({_id: id});
    }

    async all() {
        return this.db.find({});
    }
}

export const todoStore = new TodoStore();