const mongoose = require('mongoose');

const UpsellOfferSchema = new mongoose.Schema({
  title: String, 
  triggerProducts: [String], 
  offerProducts: [String],   // Shopify product IDs
  maxSelectable: Number,
  discountType: String, // "percentage" | "fixed"
  discountValue: Number,
  priority: Number,
  widgetTitle: String,
  createdByShop: String, // shop domain
});

module.exports = mongoose.model('UpsellOffer', UpsellOfferSchema);
