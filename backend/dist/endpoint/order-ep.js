"use strict";
// import { Request, Response, NextFunction } from 'express';
// import { Plant } from '../schema/Plant';
// import { addOrder, allOrdersByUserId, allOrders, getOrderById} from '../dao/order-dao';
// import { Util } from '../utils/util';
//
// export const placeOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const { foods } = req.body;
//     const userId = req.user.userId;
//
//     try {
//         let totalPrice = 0;
//         for (const foodItem of foods) {
//             const food = await Food.findById(foodItem.foodId);
//             if (!food) {
//                 throw new Error(`Food item with id ${foodItem.foodId} not found`);
//             }
//             totalPrice += food.price * foodItem.qty;
//         }
//         const order = await addOrder(userId, foods, totalPrice);
//         return Util.sendSuccess(res, order,'Order placed successfully' )
//     } catch (error) {
//         next(error);
//     }
// };
// export const orderDetailsByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const userId = req.user.userId;
//     console.log('User ID:', userId, 'Type:', typeof userId);
//     try {
//         const allOrder = await allOrdersByUserId(userId);
//         return Util.sendSuccess(res,allOrder,'Order placed successfully' )
//     } catch (error) {
//         next(error);
//     }
// };
// export const allOrdersByAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const allOrder = await allOrders();
//         return Util.sendSuccess(res,allOrder,'Order placed successfully' )
//     } catch (error) {
//         next(error);
//     }
// };
// export const orderDetailsByOrderId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const orderId = req.query.orderId as string;
//     const userId = req.user.userId;
//     console.log('User ID:', userId, 'Type:', typeof userId);
//     try {
//         const order = await getOrderById(orderId);
//         return Util.sendSuccess(res,order,'Order Found' )
//     } catch (error) {
//         next(error);
//     }
// };
