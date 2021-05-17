const User = require('../models/User')
const Schedule = require('../models/Schedule')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifySchedule = require('../verify/verifySchedule')

// MiddleWares
userController = {
    // Responsável por fazer o registro
    register: async (req, res) => {
        const selectedUser = await User.findOne({
            email: req.body.email
        })
        if (selectedUser) return res.status(400).send('Email já existe')

        const selectedUserName = await User.findOne({
            email: req.body.name
        })
        if (selectedUserName) return res.status(400).send('Nome já existe')

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        })
        try {
            const savedUser = await user.save();
            res.send(savedUser);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // Responsável por fazer o login
    login: async (req, res) => {
        // Verificando Email
        const selectedUser = await User.findOne({
            email: req.body.email
        })
        if (!selectedUser) return res.status(400).send('Email ou senha incorretos')

        // Verificando Senha
        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password);
        if (!passwordAndUserMatch) return res.status(400).send('Email ou senha incorretos')

        //criando token
        const token = jwt.sign({ _id: selectedUser._id, admin: selectedUser.admin }, process.env.TOKEN_SECRET)
        const response = {
            authorizationToken: token
        }
        res.send(response);
    },

    // Responsável por fazer um agendamento
    schedule: async (req, res) => {
        // Verificar se a tarefa existe
        let selectedSchedule = await Schedule.findOne({
            userId: req.user._id,
            startDay: req.body.startDay,
            startHour: req.body.startHour,
            startMinute: req.body.startMinute
        })
        if (selectedSchedule) { return res.status(406).send("Já existe uma tarefa para esse horário")}

        // Verficando se já existe 3 tarefas para acontecer
        let quant = await verifySchedule.Later(req);
        if (quant >= 3) { return res.status(406).send("Não se pode agendar para esse horário, pois já tem 3 taregas")}
        quant = await verifySchedule.Prev(req);
        if (quant >= 3) { return res.status(406).send("Não se pode agendar para esse horário, pois já tem 3 taregas")}
        // Caso não exista ele irá criar uma nova tarefa
        const schedule = new Schedule({
            userId: req.user._id,
            startDay: req.body.startDay,
            startHour: req.body.startHour,
            startMinute: req.body.startMinute,
        })
        if(schedule.startMinute%10 != 0) {return res.status(400).send("Só se pode agendar tarefas a cada 10 minutos")}
        if(schedule.startHour < 9 || schedule.startHour > 16) {return res.status(400).send("Os agendamentos devem ser feitos entre as 9:00h e 16:00h")}
        try {
            const savedSchedule = await schedule.save();
            res.send(savedSchedule);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // Responsável por visualizar todos os agendamentos realizados de um cliente
    viewSchedule: async (req, res) => {
        try{
            let selectedSchedule = await Schedule.find({userId: req.user._id});
            res.send(selectedSchedule);
        }catch (error) {
            res.send(error)
        }
    },

    // Responsável por cancelar o agendamento de um cliente
    cancelSchedule: async (req, res) => {
        console.log(req.user);
        let id = req.params.id;
        if (!id) {
            id = req.body.id;
        }

        const verify = await Schedule.findOne({ _id: id, userId: req.user._id })
        if (verify == null) {
            res.status(404).send("Você não criou essa tarefa ou ela não existe");
        } else {
            // Verificando se a tarefa a ser cancelada tem menos de 6 horas
            if(verifySchedule.Cancel(verify)){

                await Schedule.remove(verify)
                res.send(id);
            }
            else{
                res.send("Não foi possível deletar seu agendamento, falta menos de 6 horas, ou a tarefa já foi iniciada");
            }
        }
    }
}

module.exports = userController;