const client = require("../../databaseConfig/mongodbConnectionConfig");
const TodosModel = require("./todos.model");
const mongoose = require("mongoose")
const {ObjectId} = mongoose.Types

async function getTodos(request, response) {
    try {
        await client.connect();
        const todosData = await client
            .db("managetasks")
            .collection("todos")
            .find()
            .toArray();
        await client.close();
        return response
            .status(200)
            .json({message: "Todos fetched successfully", data: todosData})
    } catch (error) {
        console.log("Error occurred", error)
    }
}

async function getTodosV2(request, response) {
    try {
        const results = await TodosModel.find().populate('userId').exec();

        if (results.length < 1) {
            return response
                .status(200)
                .json({message: "No Todos found", data: []})
        } else {
            return response
                .status(200)
                .json({message: "Todos fetched successfully", data: results})
        }
    } catch (error) {
        console.log("Error occurred", error)
    }
}

async function getTodosByUserId(request, response) {
    const { userId } = request.params;
    try {
        const results = await TodosModel.find({ userId: userId }).populate({path: 'userId', select: 'name -_id'}).exec();
        if(results.length > 0) {
            return response.status(200).json({
                message: "Todos fetched successfully",
                data: results
            })
        } else {
            return response.status(200).json({
                message: "No Todos Found",
                data: results
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

async function getTodoById(request, response) {
    const {todoId} = request.params; // gets url params *required
    if (!todoId) {
        return response
            .status(400)
            .json({message: "Todo Id is missing in request"})
    } else {
        const result = await TodosModel.findOne({_id: new ObjectId(todoId)});
        if (result) {
            return response
                .status(200)
                .json({message: "Todo fetched successfully", data: result})
        } else {
            return response
                .status(200)
                .json({message: "Todo not found", data: {}})
        }
    }
}

async function createTodo(request, response) {
    try {
        const todo = new TodosModel(request.body);
        const acknowledgement = await todo.save();
        if (acknowledgement) {
            return response
                .status(201)
                .json({message: "Todos created successfully"})
        } else {
            return response
                .status(206)
                .json({message: "Todo could not be created"})
        }
    } catch (error) {
        return response
            .status(500)
            .json({message: "Something went wrong", error: error.message})
    }
}

async function updateTodo(request, response) {
    try {
        const {todoId} = request.params;
        if (!todoId) {
            return response
                .status(400)
                .json({message: "Bad request"})
        } else {
            console.log("Here =====>")
            const acknowledgement = await TodosModel.findByIdAndUpdate(
                todoId, request.body, { new: true })
            if (acknowledgement) {
                return response
                    .status(201)
                    .json({message: "Todo updated successfully!", data: acknowledgement})
            } else {
                return response
                    .status(200)
                    .json({message: "Todo cannot be updated!", data: acknowledgement})
            }
        }
    } catch(error) {
        return response
            .status(500)
            .json({message: "Something went wrong", error: error})
    }
}

async function deleteTodo(request, response) {
    try {
        const {todoId} = request.params;
        if (!todoId) {
            return response
                .status(400)
                .json({message: "Necessary input is missing in request"})
        } else {
            const  acknowledgement = await TodosModel.findByIdAndDelete({ _id: new ObjectId(todoId) });
            console.log(acknowledgement)
            if(acknowledgement) {
                return response
                    .status(200)
                    .json({message: "Todos deleted successfully"})
            } else {
                return response
                    .status(200)
                    .json({message: "Todos is either deleted already or not available"})
            }
        }
    } catch(error) {
        return response
            .status(500)
            .json({message: "Something went wrong", error: error})
    }
}

module.exports = {
    getTodos,
    getTodosV2,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodosByUserId
};