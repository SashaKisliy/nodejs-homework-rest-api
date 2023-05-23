const express = require("express");
const router = express.Router();

const cntrlTask = require("../../controllers/controllers");

router.get("/", cntrlTask.get);

router.get("/:contactId", cntrlTask.getById);

router.post("/", cntrlTask.create);

router.delete("/:contactId", cntrlTask.remove);

router.put("/:contactId", cntrlTask.update);

router.patch("/:contactId/favorite", cntrlTask.updateStatus);

module.exports = router;
