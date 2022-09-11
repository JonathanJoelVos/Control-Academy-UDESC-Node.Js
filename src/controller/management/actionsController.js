import actions from "../../model/Action.js";
import crud from "../crud.js";

const createAction = async (req, res) => {
    const body = req.body;
    const checkResponse = await crud.create(body, actions);
    if (checkResponse.message) return res.status(401).send(checkResponse.message);
    res.status(201).send(body);
}

const readActions = async (req, res) => {
    const checkResponse = await crud.read(actions, 'methods');
    if (checkResponse.message) return res.status(400).send(checkResponse.message);
    res.status(200).send(checkResponse);

}

const readActionsById = async (req, res) => {
    const { id } = req.params;
    const checkResponse = await crud.readById(id, actions);
    if (checkResponse.message == 'não encontrado') return res.status(404).send(checkResponse.message);
    if (checkResponse.error) return res.status(400).send(checkResponse.error)
    res.status(200).send(checkResponse);
}

const updateActions = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const check = await crud.update(id, body, actions);
    if (check.message) return res.status(401).send(check.message);
    res.status(204).send("Update feito com sucesso");
}

const deleteActions = async (req, res) => {
    const { id } = req.params;
    const check = await crud.remove(id, actions);
    if (check.message) return res.status(404).send(check.message);
    res.status(204).send("Removido com sucesso");   
}

const addMethodInActions = async (req, res) => {
    try {
        const { name } = req.query;
        const { method } = req.body;
        const actionFind = await actions.findOne({ name: name });
        const checkIfMethodsNotExists = actionFind.methods.every(element => element != method);
        if (!checkIfMethodsNotExists) return res.status(401).send("método já existente");
        actionFind.methods.push(method);
        await actionFind.save();
        res.send("Adicionado com sucesso");
    } catch (error) {
        res.status(401).send(error);
    }
}

const deleteMethodInActions = async (req, res) => {
    try {
        const { name } = req.query;
        const { method } = req.body;
        const actionFind = await actions.findOne({ name: name });
        const checkIfMethodsExists = actionFind.methods.findIndex(element => element == method)
        if (checkIfMethodsExists == -1) return res.status(401).send("método não existente");
        actionFind.methods.splice(checkIfMethodsExists, 1);
        await actionFind.save();
        res.send("Removido com sucesso");
    } catch (error) {
        res.status(401).send(error);
    }
}

const actionController = {
    createAction,
    readActions,
    readActionsById,
    updateActions,
    deleteActions,
    addMethodInActions,
    deleteMethodInActions
}

export default actionController;