import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'User',
		},
		username: {
			type: String,
			required: false,
			ref: 'User',
		},
		email: {
			type: String,
			required: false,
			ref: 'User',
		},
		orderItems: [
			{
				name: { type: String, required: true },
				qty: { type: Number, required: true },
				image: { type: String, required: true },
				size: {type: String, required:false},
				price: { type: Number, required: true },
				id: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
			},
		],
		shippingAddress: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
			country: { type: String, required: true },
		},
		shippingPrice: { type: Number, default: 0.0 },
		totalPrice: { type: Number, default: 0.0 },
		subtotal: { type: Number, default: 0.0 },
		isDelivered: { type: Boolean, required: true, default: false },

		deliveredAt: {
			type: Date,
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;