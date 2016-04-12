var models = require('../../models');

//console.log(models.Text);
console.log("Try using the other db collection and see if that works. then it points to something with our db---or try a simple mongoose example---could also try a post");

//hmm should I have a parameter I pass in that switches between all these different listSorted variants?
exports.list = function(req, res, next) {
    console.log("list");
    models.Text.list(function (err, texts) {
	if (err) { return next(err); }
	res.status(200).json(texts);
    });
};

exports.test = function(req,res){
    console.log("test");
    res.status(200).json({yo:"diggity" });
};

exports.listSortedByCreationDate = function(req, res, next) {
        console.log("listSortedByCreationDate");
    models.Text.listSortedSortedByCreationDate(function (err, texts) {
	if (err) { return next(err); }
	res.status(200).json(texts);
    });
};

exports.listSortedByUpvotes = function(req, res, next) {
        console.log("listSortedByUpvotes");
    models.Text.listSortedByUpvotes(function (err, texts) {
	if (err) { return next(err); }
	res.status(200).json(texts);
    });
};

exports.listSortedByDownvotes = function(req, res, next) {
        console.log("listSortedByDownvotes");
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
//	res.json(200, texts);
	res.status(200).json(texts)
    });
};
/*
exports.get = function( req, res, next) {
    var areaCode = req.params.areaCode;
    models.Text.findByAreaCode(areaCode, function(err, texts){
	if (err) {return next(err); }
	res.json(200, texts);
    });
};
*/
exports.insertNewText = function( req, res, next) {
    var text = req.body;
//TODO: we need to add in the area code. Actually shouldn't this fail since no Area Code is added and we say that is a required field?
    models.Text.create(text, function(e,t){
	if (e) {return next(e);};
	res.status(201).json(t);
    });
};
exports.upvote = function(req, res, next) {
    console.log('upvote',req.body);
    models.Text.findByIdAndUpdate(req.params.id,{ $inc: {upvotes: 1}},function(e,text) {
	if (e){return next(e);};
	res.status(201).json(text);
    });
};
exports.downvote = function(req, res, next) {
    console.log('downvote',req.body);
    models.Text.findByIdAndUpdate(req.params.id,{ $inc: {downvotes: 1/*,upvotes: -1*/}},function(e,text) {
	if (e){return next(e);};
	res.status(201).json(text);
    });
};
