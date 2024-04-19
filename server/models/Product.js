import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		rating: { type: Number, required: true },
		comment: { type: String, required: true },
		title: { type: String, required: true },
		user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
	},
	{ timestamps: true }
);

const sizeSchema = new mongoose.Schema(
  {
    xs: { type: Number, required: false },
    s: { type: Number, required: false },
    m: { type: Number, required: false },
    l: { type: Number, required: false },
    xl: { type: Number, required: false },
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
      default: [],
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    reviews: {
      type: Array,
      required: true,
      default: [],
    },
    rating: {
      type: Number,
      required: true,
      default: 5,
    },
    numberOfReviews: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: true,
    },
    sizes: {
      type: sizeSchema,
      required:false,
    },
    stock: {
      type: Number,
      required: true,
    },
    productIsNew: {
      type: Boolean,
      required: true,
    },
    stripeId: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;