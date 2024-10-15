import { Schema, model } from 'mongoose';
const statusSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    paymentId: { type: Schema.Types.ObjectId, ref: 'Payment', required: true },
    status: {
        type: String,
        enum: ['placed', 'preparing', 'out-for-delivery', 'delivered'],
        default: 'placed',
    },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });
const Status = model('Status', statusSchema);
export default Status;
