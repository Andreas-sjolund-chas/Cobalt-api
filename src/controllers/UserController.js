import express from "express";

import * as dbActions from "../db/actions";

import { asyncPipe } from "../utils/fp";

const router = express.Router();

// Read
router.get("/:userId", (req, res) => {
  const { _id } = req.user;

  dbActions
    .getUserData(_id)
    .then(user =>
      res.status(200).json({
        success: true,
        user
      })
    )
    .catch(err =>
      res.status(500).json({
        success: false,
        message: err.message
      })
    );
});

/* Create User Pipe */
const createUserWithWorkspace = asyncPipe(
  dbActions.createUser,
  dbActions.createWorkspace,
  dbActions.addWorkspaceToUser
);

// Create
router.post("/", (req, res) => {
  const { email, name, password } = req.body;

  createUserWithWorkspace({
    email,
    name,
    password
  })
    .then(user =>
      res.status(200).json({
        success: true,
        user
      })
    )
    .catch(err =>
      res.status(500).json({
        success: false,
        message: err.message
      })
    );
});

export default router;
