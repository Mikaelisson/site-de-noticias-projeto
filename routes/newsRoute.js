const express = require("express");
const router = express.Router();
const newsController = require('../controllers/newsController');
const methodOverride = require('method-override');
const multer = require('multer');
const multerConfig = require('../config/multer');
const session = require('express-session');


router.use(methodOverride('_method'));
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(session({secret: 'bybdy2bd73'}))

router.get("/", newsController.all);
router.get("/edit/:id", newsController.edit);
router.get("/add", newsController.renderAdd);
router.get("/login", newsController.renderLogin);
router.get("/register", newsController.renderRegister);


router.post("/add", multer(multerConfig).single('file'), newsController.add);
router.post("/edit/:id", multer(multerConfig).single('file'), newsController.editDoc);

router.post("/register", newsController.register);
router.post("/login", newsController.login);

router.delete("/:id", newsController.deleteById);
router.delete("/", newsController.deleteById);

module.exports = router;