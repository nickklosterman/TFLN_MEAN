var models = require('../../models');

//hmm should I have a parameter I pass in that switches between all these different listSorted variants?
exports.list = function(req, res, next) {
    models.Text.list(function (err, texts) {
	if (err) { return next(err); }
	res.status(200).json(texts);
    });
};

exports.listSortedByCreationDate = function(req, res, next) {
    models.Text.listSortedSortedByCreationDate(function (err, texts) {
	if (err) { return next(err); }
	res.status(200).json(texts);
    });
};

exports.listSortedByUpvotes = function(req, res, next) {
    models.Text.listSortedByUpvotes(function (err, texts) {
	if (err) { return next(err); }
	res.status(200).json(texts);
    });
};

exports.listSortedByDownvotes = function(req, res, next) {
    models.Text.listSortedByDownvotes(function (err, texts) {
	if (err) { return next(err); }
	res.status(200).json(texts);
    });
};

exports.findByAreaCode = function( req, res, next) {
    var areaCode = req.params.area_code;
    console.log(areaCode);
    models.Text.findByAreaCode(areaCode, function(err, texts){
	if (err) {return next(err); }
	res.status(200).json(texts)
    });
};

exports.insertNewText = function( req, res, next) {
    var text = req.body;
    text["Area Code"]="("+text['Area Code']+")";
    models.Text.create(text, function(e,t){
	if (e) {return next(e);};
	res.status(201).json(t);
    }); 
};

//$inc can take multiple parameters so you could add 7 to one field and subtract 3 from another. https://docs.mongodb.org/manual/reference/operator/update/inc/
exports.upvote = function(req, res, next) {
    console.log('upvote',req.body);
    models.Text.findByIdAndUpdate(req.params.id,{ $inc: {upvotes: 1}},function(e,text) {
	if (e){return next(e);};
	res.status(201).json(text);
    });
};

exports.downvote = function(req, res, next) {
    console.log('downvote',req.body);
    models.Text.findByIdAndUpdate(req.params.id,{ $inc: {downvotes: 1}},function(e,text) {
	if (e){return next(e);};
	res.status(201).json(text);
    });
};
