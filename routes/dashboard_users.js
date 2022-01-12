const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Load controls
const { renderDashboard, renderAfterSaved, deleteTodo, renderUpdate, renderUpdateSaved, renderFullView } = require("../controllers/dashboard_controllers");


router.get("/", ensureAuthenticated, renderDashboard);

router.post("/", ensureAuthenticated, renderAfterSaved);

// Delete the todo
router.delete("/", ensureAuthenticated, deleteTodo);

// Render Update Page
router.get("/:name/update/:todoID", ensureAuthenticated, renderUpdate);

router.put("/:name/update/:todoID", ensureAuthenticated, renderUpdateSaved);

// Full View of Todo
router.get("/:name/fullView/:todoID", ensureAuthenticated, renderFullView);


module.exports = router;