var mongoose = require('mongoose');

var TextSchema = new mongoose.Schema({
    "Area Code": { type: String, required: true},
    Text: { type: String, required: true} ,
    upvotes : { type: Number, 'default': 0 },
    downvotes : { type: Number, 'default': 0 },
    creation_date: { type: Date, 'default': Date.now }
},{collection:'TFLN'}); //specify our collection otherwise mongo/ose will default to using the pluralized version..which caused me a lot of frustration

TextSchema.set('toJSON', {
    virtual: true,
    getters: true,
    transform: function( doc, ret, options) {
	delete ret.__v;
	delete ret._id;
	return ret;
    }
});

//http://mongoosejs.com/docs/guide.html#methods
TextSchema.statics.findByAreaCode = function(area_code ,cb) {
/*    this.model('Text')
	.find({ "area_code":area_code})
	.exec(cb);*/
    console.log("executing statics",area_code);
    return this.find({"Area Code":"("+area_code+")"}).limit(4).exec(cb);
};
/* I need to update mongo to > 2.4 to use this 
TextSchema.statics.findByAreaCode = function(searchTerm ,cb) {
    return this.find({$text : {$search : searchTerm } }, cb);
};*/

TextSchema.statics.list = function(cb) {
   return this.find()
	.limit(5)
    	.exec(cb);
//    return {turd: "ferguson"};
};

TextSchema.statics.listSortedByCreationDate = function(cb) {
    return this.find()
	.sort({creation_date: 1})
	.exec(cb);
};

TextSchema.statics.listSortedByUpvotes = function(cb) {
    return this.find()
	.sort({upvotes: -1})
	.limit(10)
	.exec(cb);
};
TextSchema.statics.listSortedByDownvotes = function(cb) {
    return this.find()
	.sort({downvotes: -1})
	.limit(10)
	.exec(cb);
};


module.exports = TextSchema;
