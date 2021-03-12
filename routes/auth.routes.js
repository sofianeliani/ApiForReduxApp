const { verifySignUp } = require('../middlewares');
const controller = require('../controllers/auth.controller');
const cors = require('cors');
module.exports = function(app) {
    app.options("*", cors());
    // app.options('*', cors())

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