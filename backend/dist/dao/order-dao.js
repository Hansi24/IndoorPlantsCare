"use strict";
//
// import { Types } from 'mongoose';
// import Order from '../schema/Order';
// import Status from '../schema/Status';
//
// export const addOrder = async (userId: Types.ObjectId, foods: { foodId: Types.ObjectId; qty: number }[], totalPrice: number) => {
//     try {
//         const newOrder = new Order({
//             userId,
//             foods,
//             totalPrice,
//         });
//         await newOrder.save();
//         return newOrder;
//     } catch (error) {
//         throw error;
//     }
// };
//
// export const allOrdersByUserId = async (userId: Types.ObjectId) => {
//     try {
//         const user = new Types.ObjectId(userId);
//         const allOrders = await Status.aggregate([
//             {
//                 $match: { userId: user }
//             },
//             {
//                 $lookup: {
//                     from: 'orders',
//                     localField: 'orderId',
//                     foreignField: '_id',
//                     as: 'orderDetails'
//                 }
//             },
//             { $unwind: '$orderDetails' },
//             { $unwind: '$orderDetails.foods' },
//             {
//                 $lookup: {
//                     from: 'foods',
//                     localField: 'orderDetails.foods.foodId',
//                     foreignField: '_id',
//                     as: 'foodDetails'
//                 }
//             },
//             { $unwind: '$foodDetails' },
//             {
//                 $lookup: {
//                     from: 'images',
//                     localField: 'foodDetails.image',
//                     foreignField: '_id',
//                     as: 'imageDetails'
//                 }
//             },
//             { $unwind: '$imageDetails' },
//             {
//                 $group: {
//                     _id: {
//                         orderId: '$orderDetails._id',
//                         statusId: '$_id'
//                     },
//                     userId: { $first: '$userId' },
//                     status: { $first: '$status' },
//                     totalPrice: { $first: '$orderDetails.totalPrice' },
//                     orderDate: { $first: '$orderDetails.orderDate' },
//                     foods: {
//                         $push: {
//                             foodId: '$foodDetails._id',
//                             qty: '$orderDetails.foods.qty',
//                             foodName: '$foodDetails.foodName',
//                             price: '$foodDetails.price',
//                             imageUrl: '$imageDetails.url'
//                         }
//                     }
//                 }
//             },
//             {
//                 $group: {
//                     _id: '$_id.statusId',
//                     userId: { $first: '$userId' },
//                     status: { $first: '$status' },
//                     orderDetails: {
//                         $push: {
//                             _id: '$_id.orderId',
//                             totalPrice: '$totalPrice',
//                             orderDate: '$orderDate',
//                             foods: '$foods'
//                         }
//                     }
//                 }
//             },
//             {
//                 $sort: { 'orderDetails.orderDate': -1 } // Descending order (latest first)
//             },
//             {
//                 $project: {
//                     _id: 1,
//                     userId: 1,
//                     status: 1,
//                     orderDetails: 1
//                 }
//             }
//         ]);
//         return allOrders;
//     } catch (error) {
//         console.error('Error retrieving orders:', error);
//         throw error;
//     }
// };
//
// export const allOrders = async () => {
//     try {
//         const allOrders = await Status.aggregate([
//             {
//                 $lookup: {
//                     from: 'orders',
//                     localField: 'orderId',
//                     foreignField: '_id',
//                     as: 'orderDetails'
//                 }
//             },
//             { $unwind: '$orderDetails' },
//             { $unwind: '$orderDetails.foods' },
//             {
//                 $lookup: {
//                     from: 'foods',
//                     localField: 'orderDetails.foods.foodId',
//                     foreignField: '_id',
//                     as: 'foodDetails'
//                 }
//             },
//             { $unwind: '$foodDetails' },
//             {
//                 $lookup: {
//                     from: 'images',
//                     localField: 'foodDetails.image',
//                     foreignField: '_id',
//                     as: 'imageDetails'
//                 }
//             },
//             { $unwind: '$imageDetails' },
//             {
//                 $group: {
//                     _id: {
//                         orderId: '$orderDetails._id',
//                         statusId: '$_id'
//                     },
//                     userId: { $first: '$userId' },
//                     status: { $first: '$status' },
//                     totalPrice: { $first: '$orderDetails.totalPrice' },
//                     orderDate: { $first: '$orderDetails.orderDate' },
//                     foods: {
//                         $push: {
//                             foodId: '$foodDetails._id',
//                             qty: '$orderDetails.foods.qty',
//                             foodName: '$foodDetails.foodName',
//                             price: '$foodDetails.price',
//                             imageUrl: '$imageDetails.url'
//                         }
//                     }
//                 }
//             },
//             {
//                 $group: {
//                     _id: '$_id.statusId',
//                     userId: { $first: '$userId' },
//                     status: { $first: '$status' },
//                     orderDetails: {
//                         $push: {
//                             _id: '$_id.orderId',
//                             totalPrice: '$totalPrice',
//                             orderDate: '$orderDate',
//                             foods: '$foods'
//                         }
//                     }
//                 }
//             },
//             {
//                 $sort: { 'orderDetails.orderDate': -1 } // Descending order (latest first)
//             },
//             {
//                 $project: {
//                     _id: 1,
//                     userId: 1,
//                     status: 1,
//                     orderDetails: 1
//                 }
//             }
//         ]);
//         return allOrders;
//     } catch (error) {
//         console.error('Error retrieving orders:', error);
//         throw error;
//     }
// };
//
// export const getOrderById = async (orderId: string) => {
//     try {
//         const id = new Types.ObjectId(orderId);
//         const order = await Order.findById(id)
//             .populate({
//                 path: 'foods.foodId',
//                 populate: {
//                     path: 'image',
//                     model: 'Image'
//                 }
//             });
//         return order;
//     } catch (error) {
//         console.error('Error retrieving order:', error);
//         throw error;
//     }
// };
