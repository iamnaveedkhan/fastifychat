const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require('moment-timezone');   


const dateIndia = moment.tz("Asia/kolkata");
const formattedDate = dateIndia.format();

const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  mobile: { type: Number, unique: true },
  longitude: { type: String, default: null },
  latitude: { type: String, default: null },
  role: { type: Number, default: 1 },
  isActive: { type: Number, default: 1 },
  password: { type: String, default: "Zerotouch" },
});

const addressesSchema = new mongoose.Schema({
  address: { type: String, default: null },
  city: { type: String, default: null },
  state: { type: String, default: null },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
});

const ordersSchema = new mongoose.Schema({
  orderDate: { type: Date, default: Date.now },
  status: { type: Number, default: 1 },
  orderId: { type: String, default: null },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
});

const brandSchema = new mongoose.Schema({
  brandName: { type: String, default: null },
  brandImage: { type: String, default: null },
});

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, default: null },
  categoryImage: { type: String, default: null },
});

const subCategorySchema = new mongoose.Schema({
  subCategoryName: { type: String, default: null },
  subCategoryImage: { type: String, default: null },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

const modelSchema = new mongoose.Schema({
  productName: { type: String, default: null },
  photo: { type: String, default: " " },
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  subCategory: { type: Schema.Types.ObjectId, ref: "SubCategory" },
});

const model2Schema = new mongoose.Schema({
  groupId: {
    type: String,
    default: function () {
      return Math.random().toString(36).substring(7);
    },
  },
  productName: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: null,
  },
  properties: {
    category:{ type: String, default: null },
    subcategory: { type: String, default: null },
    vertical: { type: String, default: null},
  },
  photo: { type: [String], default: null },
  brand:brandSchema,
  specification: mongoose.Schema.Types.Mixed,

});

// const variantSchema = new mongoose.Schema({
//   model: { type: Schema.Types.ObjectId, ref: "Model2" },
//   variants: {
//     color: String,
//     images: [String],
//     SKU: String,
//     price: Number,
//     quantity: Number,
//   },
// });

const productSchema = new mongoose.Schema({
  product: model2Schema,
  user: userSchema,
  price : {type: Number},
  quantity : {type : Number},
  vertical : { type: Schema.Types.ObjectId, ref: "Specification" },
  date: {
    type: Date,
    default: formattedDate 
  },
});

const photoSchema = new mongoose.Schema({
  model: { type: Schema.Types.ObjectId, ref: "Model" },
  photos: { type: [String] }, // Array of strings representing URLs
});

// const productSchema = new mongoose.Schema({
//   model: {
//     _id: { type: "string" },
//     productName: { type: "string" },
//     photo: { type: "string" },
//     description: { type: "string" },
//   },
//   brand: {
//     _id: { type: "string" },
//     brandName: { type: "string" },
//     brandImage: { type: "string" },
//   },
//   user: {
//     _id: { type: "string" },
//     shopNumber: { type: Number },
//     shopName: { type: String },
//   },
//   category: {
//     _id: { type: "string" },
//     categoryName: { type: "string" },
//   },
//   subCategory: {
//     _id: { type: "string" },
//     subCategoryName: { type: "string" },
//     category: { type: "string" },
//   },
//   photos: { type: Schema.Types.ObjectId, ref: "Photo" },
//   specifications: { type: "object" }, // Allow any key-value pairs
//   price: { type: "number" },
//   quantity: { type: "number" },
//   productDate: { type: Date, default: Date.now },
// });

const inquirySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  customer: {
    _id: { type: "string" },
    customerNumber: { type: Number },
    customerName: { type: String },
  },
  shop: {
    _id: { type: "string" },
    shopNumber: { type: Number },
    shopName: { type: String },
  },
  product: {
    _id: { type: "string" },
    productName: { type: "string" },
    photo: { type: "string" },
  },
});

// const dimensions = new mongoose.Schema({
//     color : {
//         title : "Color",
//         color1: {}
//     }
// })

const specificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  // subCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
  specification: mongoose.Schema.Types.Mixed,
});

const User = mongoose.model("User", userSchema);
const Address = mongoose.model("Address", addressesSchema);
const Order = mongoose.model("Order", ordersSchema);
const Product = mongoose.model("Product", productSchema);
const Brand = mongoose.model("Brand", brandSchema);
const Category = mongoose.model("Category", categorySchema);
const SubCategory = mongoose.model("SubCategory", subCategorySchema);
const Model = mongoose.model("Model", modelSchema);
const Model2 = mongoose.model("Model2", model2Schema);
const Photo = mongoose.model("Photo", photoSchema);
const Inquiry = mongoose.model("Inquiry", inquirySchema);
// const Variant = mongoose.model("Variant", variantSchema);
const Specification = mongoose.model("Specification", specificationSchema);

module.exports = {
  Specification,
  User,
  Brand,
  Category,
  SubCategory,
  Model,
  Address,
  Order,
  Product,
  Model2,
  Photo,
  Inquiry,
};
