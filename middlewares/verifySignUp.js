const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

verifyDuplicateUsernameOrEmail = (req, res, next) => {

        /* Username */
        User.findOne({
        username : req.body.username
        }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({ message: "This usernmae is already used !" });
            return;
        }

        /* Email */
        User.findOne({
        email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                res.status(400).send({ message : "This email is already used !"});
                return;
            }
            next();
        })
    })
};

verifyRolesExisted = (req, res, next) => {
    if (req.body.roles) {
            for (let i = 0; i < req.body.roles.length; i++) {
                if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                message: `Failed! Role ${req.body.roles[i]} does not exist!`
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    verifyDuplicateUsernameOrEmail,
    verifyRolesExisted
};
  
module.exports = verifySignUp;