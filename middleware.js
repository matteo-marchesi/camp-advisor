const Campground = require("./models/campground");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError");
const {campgroundSchema, reviewSchema} = require("./schemas");


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in!');
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

module.exports.isCampgroundAuthorOrAdmin = async (req, res, next) => {
    const {id} = req.params;
    try {
        const campground = await Campground.findById(id);
        if (!campground.author.equals(req.user._id) && req.user.id !== res.locals.admin) {
            req.flash('error', 'You do not have permission to do that');
            res.redirect(`/campgrounds/${id}`);
        } else {
            next();
        }
    } catch (e) {
        req.flash('error', 'You do not have permission to do that');
        res.redirect(`/campgrounds/${id}`);
    }
}

module.exports.isReviewAuthorOrAdmin = async (req, res, next) => {
    const {id, reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id) && req.user.id !== res.locals.admin) {
        req.flash('error', 'You do not have permission to do that');
        res.redirect(`/campgrounds/${id}`);
    } else {
        next();
    }
}