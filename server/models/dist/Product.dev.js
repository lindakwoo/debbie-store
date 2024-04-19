"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var reviewSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});
var sizeSchema = new _mongoose["default"].Schema({
  xs: {
    type: Number,
    required: false
  },
  s: {
    type: Number,
    required: false
  },
  m: {
    type: Number,
    required: false
  },
  l: {
    type: Number,
    required: false
  },
  xl: {
    type: Number,
    required: false
  }
});
var productSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true,
    "default": []
  },
  subtitle: {
    type: String
  },
  description: {
    type: String
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  reviews: {
    type: Array,
    required: true,
    "default": []
  },
  rating: {
    type: Number,
    required: true,
    "default": 5
  },
  numberOfReviews: {
    type: Number,
    "default": 0
  },
  price: {
    type: Number,
    required: true
  },
  sizes: {
    type: sizeSchema,
    required: false
  },
  stock: {
    type: Number,
    required: true
  },
  productIsNew: {
    type: Boolean,
    required: true
  },
  stripeId: {
    type: String,
    "default": 0
  }
}, {
  timestamps: true
});

var Product = _mongoose["default"].model('Product', productSchema);

var _default = Product;
exports["default"] = _default;