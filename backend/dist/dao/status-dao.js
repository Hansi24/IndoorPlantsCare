"use strict";
// import { Types } from 'mongoose';
// import { io, sendUpdateStatus } from '../index';
// export const createStatus = async (
//     userId: Types.ObjectId,
//     orderId: Types.ObjectId,
//     paymentId: Types.ObjectId,
//     status: string
// ) => {
//     const statusRecord = new Status({ userId, orderId, paymentId, status });
//     return await statusRecord.save();
// };
// export const statusUpdate = async (statusId: string) => {
//     try {
//         // Find the status document by its ID
//         const status = await Status.findById(statusId);
//         if (!status) {
//             throw new Error('Status not found');
//         }
//         // Determine the next status
//         let nextStatus;
//         switch (status.status) {
//             case 'placed':
//                 nextStatus = 'preparing';
//                 break;
//             case 'preparing':
//                 nextStatus = 'out-for-delivery';
//                 break;
//             case 'out-for-delivery':
//                 nextStatus = 'delivered';
//                 break;
//             case 'delivered':
//                 return;
//             default:
//                 return;
//         }
//         // Update the status
//         status.status = nextStatus;
//         status.updatedAt = new Date();
//         await status.save();
//         // Emit the status-updated event
//         sendUpdateStatus(status._id, status.status, status.userId, status.orderId, status.updatedAt);
//         // io.emit('status-updated', {
//         //     statusId: status._id,
//         //     userId: status.userId,
//         //     orderId: status.orderId,
//         //     status: status.status,
//         //     updatedAt: status.updatedAt
//         // });
//         return status;
//     } catch (error) {
//         console.error('Error updating status:', error);
//         throw error;
//     }
// };
