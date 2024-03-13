import {todoStore} from "../services/todo-store.js";

export class IndexController {
    index(req, res) {
        res.render("index", {data: "Hello World"});
    };
    createTodo = (req, res) => {
        res.render("newTodo");
    };

    showTodo = async (req, res) => {
        res.render("showTodo", await todoStore.get(req.params.id));
    };

    deleteTodo = async (req, res) => {
        res.render("showTodo", await todoStore.delete(req.params.id));
    };
}

export const indexController = new IndexController();
