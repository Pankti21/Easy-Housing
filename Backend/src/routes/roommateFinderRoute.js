const express = require("express");
const router = express.Router();

var multer  = require('multer')
const path = require('path');

const { getAllListing } = require("../controllers/roommatefinderController");
const { addListing } = require("../controllers/roommatefinderController");
const { editListing } = require("../controllers/roommatefinderController");
const { getListing } = require("../controllers/roommatefinderController");
const { deleteListing } = require("../controllers/roommatefinderController");

router.get("/", getAllListing);
router.get("/:id",getListing);
router.post("/",addListing);
router.put("/:id",editListing);
router.delete("/:id",deleteListing);



var imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "images"));

    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: imageStorage })

router.post(
    "/imageUpload",
    upload.single('image'), (req, res) => {
        console.log(req.file.path)
        res.send( `${req.file.path}`)
    },
)

module.exports = router;
