// expressjs import
import express from "express";

// middleware to authenticate users
import { authenticateStudent } from "./../middleware/index";

// controller logic
import { editorPage, errorPage } from "../controllers";

const router = express.Router();

router.get("/:assignmentID/:modelID", authenticateStudent, editorPage);
router.use(errorPage);

export default router;
