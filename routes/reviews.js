const express = require('express');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isReviewAuthorOrAdmin, validateReview, isCampgroundAuthorOrAdmin} = require("../middleware");
const reviews = require("../controllers/reviews");
const router = express.Router({mergeParams: true});


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthorOrAdmin, catchAsync(reviews.deleteReview));


module.exports = router;