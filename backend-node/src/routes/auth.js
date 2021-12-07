const router = require("express").Router();
const authController = require("../controllers/auth");
const validationMiddleware = require("../middleware/validationMiddleware");
const { check } = require("express-validator");

router.post(
  "/login",
  [
    check("userName")
      .isLength({ max: 20 })
      .withMessage("Username length must be under 20 characters long!")
      .trim()
      .exists()
      .matches(/^[A-ZÕÄÖÜa-zõäöü]+$/)
      .withMessage("Username must be alphabetic!"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long!"),
  ],
  validationMiddleware,
  authController.login
);

router.post(
  "/signup",
  [
    check("userName")
      .isLength({ min: 3 })
      .withMessage("Username length must be at least 3 characters long!")
      .isLength({ max: 20 })
      .withMessage("Username length must be under 20 characters long!")
      .trim()
      .exists()
      .matches(/^[A-ZÕÄÖÜa-zõäöü]+$/)
      .withMessage("Username must be alphabetic!"),
    check("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("E-mail must be correctly formatted!"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters long!")
      .isStrongPassword({ minLowercase: 1, minUppercase: 1, minNumbers: 1 })
      .withMessage("Password must be strong! (Hint: Atleast 1 uppercase letter, 1 lowercase letter & 1 number)"),
  ],
  validationMiddleware,
  authController.signup
);

router.post(
  "/delete",
  [
    check("userName")
      .trim()
      .exists()
      .matches(/^[A-ZÕÄÖÜa-zõäöü]+$/),
  ],
  validationMiddleware,
  authController.deleteUser
);

router.get("/allusers", authController.getAllUsers);

router.get("/admins", authController.getAdmins);

module.exports = router;
