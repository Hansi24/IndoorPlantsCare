import { Util } from '../utils/util';
import { statusUpdate } from '../dao/status-dao';
// Create new user
export const updateStatus = async (req, res, next) => {
    const statusId = req.query.statusId;
    try {
        const updatedStatus = await statusUpdate(statusId);
        return Util.sendSuccess(res, updatedStatus, "order status updated successfully");
    }
    catch (error) {
        next(error);
    }
};
