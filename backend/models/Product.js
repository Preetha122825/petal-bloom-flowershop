const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:    { type: String, required: true },
  rating:  { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name:          { type: String, required: true, trim: true },
  description:   { type: String, required: true },
  price:         { type: Number, required: true, min: 0 },
  originalPrice: Number,
  category:      { type: String, required: true, enum: ['Roses','Lilies','Tulips','Bouquets','Wedding','Indoor Plants'] },
  images:        [String],
  stock:         { type: Number, required: true, default: 0 },
  badge:         { type: String, default: null },
  care:          String,
  reviews:       [reviewSchema],
  rating:        { type: Number, default: 0 },
  numReviews:    { type: Number, default: 0 },
  isFeatured:    { type: Boolean, default: false },
}, { timestamps: true });

productSchema.methods.updateRating = function () {
  if (!this.reviews.length) { this.rating = 0; this.numReviews = 0; return; }
  this.numReviews = this.reviews.length;
  this.rating = this.reviews.reduce((s, r) => s + r.rating, 0) / this.numReviews;
};

module.exports = mongoose.model('Product', productSchema);
