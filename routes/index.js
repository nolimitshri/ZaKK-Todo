const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const passport = require("passport");

// Load controls
const { renderDashboard, renderAfterSaved, deleteTodo, renderUpdate, renderUpdateSaved, renderFullView } = require("../controllers/index_controllers");

// google oauth routes
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/dashboard', 
  passport.authenticate('google', { failureRedirect: '/users/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

router.get("/dashboard", ensureAuthenticated, renderDashboard);

router.post("/dashboard", ensureAuthenticated, renderAfterSaved);

// Delete the todo
router.post("/delete", ensureAuthenticated, deleteTodo);

// Render Update Page
router.get("/dashboard/update/:todoID", ensureAuthenticated, renderUpdate);

router.post("/dashboard/update/:todoID", ensureAuthenticated, renderUpdateSaved);

// Full View of Todo
router.get("/dashboard/fullView/:todoID", ensureAuthenticated, renderFullView);


module.exports = router;
