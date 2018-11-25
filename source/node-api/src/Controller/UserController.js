const modelUser = require('../Schemas/User.js');

module.exports = {
    create: function (req, res) {
        var user = new modelUser({
            name: req.body.name,
            email: req.body.email,
            token: req.body.token,
            houseID: req.body.houseID,
            removed: false
        });

        user.save(function (err, user) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao salvar novo usuário', error: err }) };
            return res.json({ user: user, message: 'Usuário criado com sucesso!' });
        });
    },

    getByName: function (req, res) {
        var name = req.body.name;
        modelUser.findOne({ name: name }, function (err, user) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao buscar usuário', error: err }) };
            if (user) {
                return res.json({ user: user, message: 'Usuário encontrado!' });
            } else {
                return res.json({ user: user, message: 'Usuário não encontrado :(!' });
            }
        });
    },

    getById: function (req, res) {
        var id = req.body.id;
        modelUser.findOne({ _id: id }, function (err, user) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao buscar usuário', error: err }) };
            if (user) {
                return res.json({ user: user, message: 'Usuário encontrado!' });
            } else {
                return res.json({ user: user, message: 'Usuário não encontrado :(!' });
            }
        });
    },

    deleteById: function (req, res) {
        var id = req.body.id;
        modelUser.findByIdAndRemove(id, function (err, user) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro deletar usuário', error: err }) };
            return res.json({ message: 'Usuário excluido com sucesso!' });
        });
    },

    updateById: function (req, res) {
        var id = req.body.id;
        var body = req.body;
        var user = { name: body.name, email: body.email, houseID: body.houseID, removed: body.removed };
        modelUser.findByIdAndUpdate(id, user, function (err, user) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao editar usuário', error: err }) };
            return res.json({ message: 'Usuário atualizado com sucesso!' });
        });
    },
    linkHouse: function (req, res) {
        var id = req.body.id;
        var body = req.body;
        var user = { name: body.name, email: body.email, houseID: body.houseID, removed: body.removed };
        modelUser.findByIdAndUpdate(id, user, function (err, user) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao vincular usuário', error: err }) };
            return res.json({ message: 'Usuário vinculado com sucesso!' });
        });
    },
    unlinkHouse: function(req, res){
        var id = req.body.id;
        var body = req.body;
        var user = { name: body.name, email: body.email, houseID: null, removed: body.removed };
        modelUser.findByIdAndUpdate(id, user, function (err, user) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao desvincular usuário', error: err }) };
            return res.json({ message: 'Usuário desvinculado com sucesso!' });
        });
    }
};