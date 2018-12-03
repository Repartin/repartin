const modelUser = require('../schemas/User.js');

module.exports = {
    create: (req, res) => {
        var createUser = new modelUser({
            name: req.body.name,
            email: req.body.email,
            uid: req.body.uid,
            houseID: req.body.houseID,
            removed: false,
            accepted: false
        });

        modelUser.findOne({ uid: req.body.uid, removed: false }, (err, user) => {
            if (user) {
                return res.json({ user: user, message: 'Usuário ja existe!' });
            } else {
                createUser.save((err, user) => {
                    if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao salvar novo usuário', error: err }) };
                    return res.json({ user: user, message: 'Usuário criado com sucesso!' });
                });
            }
        });

    },

    getByName: (req, res) => {
        var name = req.params.name;
        modelUser.findOne({ name: name, removed: false }, (err, user) => {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao buscar usuário', error: err }) };
            if (user) {
                return res.json({ user: user, message: 'Usuário encontrado!' });
            } else {
                return res.status(201).json({ message: 'Usuário não encontrado' });
            }
        });
    },


    getByHouse: function (req, res) {
        var houseID = req.params.house;
        modelUser.find({ houseID: houseID, removed: false }, function (err, users) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao buscar usuarios', error: err }) };
            if (users) {
                return res.json({ users });
            } else {
                return res.status(201).json({ message: 'Users não encontrados :(!' });
            }
        });
    },
    getAdminById: (req, res) => {
        var id = req.adminId;
        modelUser.findOne({ id: id, removed: false }, (err, user) => {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao buscar usuário', error: err }) };
            if (user) {
                return res.json({ user: user, message: 'Usuário encontrado!' });
            } else {
                return res.status(201).json({ message: 'Usuário não encontrado' });
            }
        });
    },
    getById: (req, res) => {
        var id = req.params.id;
        modelUser.findOne({ uid: id, removed: false }, (err, user) => {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao buscar usuário', error: err }) };
            if (user) {
                return res.json({ user: user, message: 'Usuário encontrado!' });
            } else {
                return res.status(201).json({ message: 'Usuário não encontrado' });
            }
        });
    },

    deleteById: (req, res) => {
        var id = req.params.id;
        modelUser.findByIdAndRemove(id, (err, user) => {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro deletar usuário', error: err }) };
            return res.json({ message: 'Usuário excluido com sucesso!' });
        });
    },

    updateById: (req, res) => {
        var id = req.params.id;
        var body = req.body;
        var user = { name: body.name, email: body.email, houseID: body.houseID, removed: body.removed, accepted: body.accepted, uid: body.uid };
        modelUser.findByIdAndUpdate(id, user, (err, userReturn) => {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro atualizar usuário', error: err }) };
            return res.json({ message: 'Usuário atualizado com sucesso!' });
        });
    },
    linkHouse: function (req, res) {
        var id = req.params.id;
        var body = req.body;
        var user = { name: body.name, email: body.email, houseID: body.houseID, removed: body.removed, accepted: body.accepted };
        modelUser.findByIdAndUpdate(id, user, (err, user) => {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao vincular usuário', error: err }) };
            return res.json({ message: 'Usuário vinculado com sucesso!' });
        });
    },
    unlinkHouse: function (req, res) {
        var id = req.params.id;
        var body = req.body;
        var user = { name: body.name, email: body.email, houseID: null, removed: body.removed, accepted: body.accepted };
        modelUser.findByIdAndUpdate(id, user, (err, user) => {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao desvincular usuário', error: err }) };
            return res.json({ message: 'Usuário desvinculado com sucesso!' });
        });
    }
};