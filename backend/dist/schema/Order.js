"use strict";
// import { Schema, model, Document, Types } from 'mongoose';
//
// interface IOrder extends Document {
//     _id: Types.ObjectId;  // Unique ID for each order item
//     userId: Types.ObjectId;
//     foods: { foodId: Types.ObjectId; qty: number }[];  // Array of food items with quantity
//     totalPrice: number;  // Total price of the order
//     orderDate: Date;  // Date of the order
// }
//
// const orderSchema = new Schema<IOrder>({
//     userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
//     foods: [
//         {
//             foodId: { type: Schema.Types.ObjectId, ref: 'Food', required: true },  // Reference to the Food model
//             qty: { type: Number, required: true },
//         },
//     ],
//     totalPrice: { type: Number, required: true },
//     orderDate: { type: Date, default: Date.now },
// });
//
// const Order = model<IOrder>('Order', orderSchema);
//
// export default Order;
