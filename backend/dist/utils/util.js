"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
var Util;
(function (Util) {
    // Utility function to handle async errors
    function withErrorHandling(requestHandler) {
        return function (req, res, next) {
            // Execute the request handler and catch any unhandled errors
            requestHandler(req, res, next).catch(next);
        };
    }
    Util.withErrorHandling = withErrorHandling;
    function sendSuccess(res, data, message = null) {
        res.send({ success: true, data, message });
    }
    Util.sendSuccess = sendSuccess;
    function sendError(res, error, errorCode = 0) {
        if (typeof error === 'string') {
            res.send({ success: false, error, errorCode });
        }
        else {
            if (!error) {
                error = { stack: null, message: "Unknown Error" };
            }
            res.send({ success: false, error: error.message, errorData: error, errorCode });
        }
    }
    Util.sendError = sendError;
})(Util || (exports.Util = Util = {}));
