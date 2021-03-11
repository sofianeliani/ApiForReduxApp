const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');
const User = require('../models/user.model');

module.exports = function(app) {

    app.get("/api/content", controller.content);

    app.get("/api/usercontent", [authJwt.verifyToken], controller.userContent);

    app.get("/api/users/:id", getUser, (req, res) => {
      res.json(res.user);
    });

    app.get("/api/users", async (req, res) => {
      const users = await User.find();
      
      res.json(users);
    });

    app.get("/api/admincontent", [authJwt.verifyToken, authJwt.isAdmin], controller.adminContent);

    app.patch("/api/users/:id", getUser, async (req, res) => {
      if (req.body.username != null) {
        res.user.username = req.body.username;
      }
      if (req.body.email != null) {
        res.user.email = req.body.email;
      }

      try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });

    app.delete("/api/users/:id", getUser, async (req, res) => {
      try {
        await res.user.deleteOne();
        res.json({ message: "User has been deleted" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
    
    async function getUser(req, res, next) {
        let user;
        try {
          user = await User.findById(req.params.id);
          if (user == null) {
            return res.status(404).json({ message: "Cannot find User" });
          }
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
        res.user = user;
        next();
    }

    
};