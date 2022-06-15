// middleware to authenticate users
import { authenticateStudent } from "./../middleware/index";

// controller logic 
import { editorPage } from "../controllers";
import express from "express";

const router = express.Router();

router.get("/:assignmentID/:modelID", authenticateStudent, editorPage);

export default router;
