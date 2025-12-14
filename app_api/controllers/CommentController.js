var mongoose = require('mongoose');
var Venue = mongoose.model("venue");

const createResponse = function (res, status, content) {
    res.status(status).json(content);
};

var calculateLastRating = function (incomingVenue, isDeleted) {
    var i, numComments, avgRating, sumRating = 0;
    
    
    if (incomingVenue.comments) {
        numComments = incomingVenue.comments.length;
        
        if (numComments === 0 && isDeleted) {
            avgRating = 0;
        } else {
            for (i = 0; i < numComments; i++) {
                sumRating += incomingVenue.comments[i].rating;
            }
            // Sıfıra bölünme hatasını önlemek için kontrol
            avgRating = numComments > 0 ? Math.ceil(sumRating / numComments) : 0;
        }
        incomingVenue.rating = avgRating;
        incomingVenue.save();
    }
};

var updateRating = function (venueId, isDeleted) {
    Venue.findById(venueId)
        .select("rating comments")
        .exec()
        .then(function (venue) {
            calculateLastRating(venue, isDeleted);
        });
};

const createComment = function (req, res, incomingVenue) {
    try {
        incomingVenue.comments.push(req.body);
        incomingVenue.save().then(function (venue) {
            var comments = venue.comments;
            var comment = comments[comments.length - 1];
            updateRating(venue._id, false);
            createResponse(res, 201, comment);
        });
    } catch (error) {
        createResponse(res, 400, error);
    }
};

const addComment = async function (req, res) {
    try {
        await Venue.findById(req.params.venueid)
            .select("comments")
            .exec()
            .then(function (incomingVenue) {
                if (!incomingVenue) {
                    createResponse(res, 404, { "status": "Mekan bulunamadı" });
                } else {
                    createComment(req, res, incomingVenue);
                }
            });
    } catch (error) {
        createResponse(res, 400, { status: "Yorum ekleme başarısız" });
    }
};

const getComment = async function (req, res) {
    try {
        await Venue.findById(req.params.venueid).select("name comments").exec().then(function (venue) {
            var response, comment;
            if (!venue) {
                createResponse(res, 404, { "status": "Mekanid yanlış" });
            } else if (venue.comments && venue.comments.id(req.params.commentid)) {
                comment = venue.comments.id(req.params.commentid);
                response = {
                    venue: {
                        name: venue.name,
                        id: req.params.venueid,
                    },
                    comment: comment
                };
                createResponse(res, 200, response);
            } else {
                createResponse(res, 404, { "status": "Yorum id yanlış" });
            }
        });
    } catch (error) {
        createResponse(res, 404, { "status": "Mekan bulunamadı" });
    }
};

const updateComment = async function (req, res) {
    try {
        await Venue.findById(req.params.venueid)
            .select("comments")
            .exec()
            .then(function (venue) {
                try {
                    let comment = venue.comments.id(req.params.commentid);
                    if (!comment) {
                        createResponse(res, 404, { "status": "Yorum bulunamadı" });
                        return;
                    }
                    comment.set(req.body);
                    venue.save().then(function (venueUpdated) {
                        updateRating(venueUpdated._id, false);
                        createResponse(res, 200, comment);
                    });

                } catch (error) {
                    createResponse(res, 404, error);
                }
            });
    } catch (error) {
        createResponse(res, 404, error);
    }
};

const deleteComment = async function (req, res) {
    try {
        await Venue.findById(req.params.venueid)
            .select("comments")
            .exec()
            .then(function (venue) {
                try {
                    let comment = venue.comments.id(req.params.commentid);
                    if (!comment) {
                        createResponse(res, 404, { "status": "Yorum bulunamadı" });
                        return;
                    }
                    comment.deleteOne();
                    venue.save().then(function (venueUpdated) {
                        updateRating(venueUpdated._id, true);
                        createResponse(res, 200, { status: "Yorum silindi" });
                    });
                } catch (error) {
                    createResponse(res, 404, error);
                }
            });
    } catch (error) {
        createResponse(res, 404, error);
    }
};

module.exports = {
    addComment,
    getComment,
    updateComment,
    deleteComment
};