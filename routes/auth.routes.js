const { verifySignUp } = require('../middlewares');
const controller = require('../controllers/auth.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            'Content-Type', 'application/json',
            'Accept', 'application/json',
            'Access-Control-Allow-Origin: *',
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.verifyDuplicateUsernameOrEmail,
            verifySignUp.verifyRolesExisted
        ],
        controller.signup
    );
    
    app.post("/api/auth/signin", controller.signin);
};