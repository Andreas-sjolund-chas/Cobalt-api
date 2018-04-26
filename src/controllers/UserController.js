import express from "express";

const router = express.Router();

// Read
router.get("/:userId", (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      coolBeans: true
    }
  });
});

// Create
router.post("/", (req, res) => {
  const { email, name, password } = req.body;
  const userData = {
    email,
    name,
    password
  };

  dbActions
    .createUser(userData)
    .then(user =>
      res.status(200).json({
        success: true,
        user: user
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
