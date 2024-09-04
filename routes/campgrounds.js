const express = require('express');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isCampgroundAuthorOrAdmin, validateCampground} = require("../middleware");
const campgrounds = require("../controllers/campgrounds");
const router = express.Router();
const multer = require('multer')
const {storage} = require('../cloudinary');
const upload = multer({storage});

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isCampgroundAuthorOrAdmin, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isCampgroundAuthorOrAdmin, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isCampgroundAuthorOrAdmin, catchAsync(campgrounds.renderEditForm))


module.exports = router;