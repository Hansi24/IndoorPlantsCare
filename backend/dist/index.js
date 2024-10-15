"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendUpdateStatus = exports.sendOrderStatus = exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const helper_1 = require("./utils/helper");
const plant_routes_1 = __importDefault(require("./routes/plant-routes"));
const cart_routes_1 = __importDefault(require("./routes/cart-routes"));
const clinic_routes_1 = __importDefault(require("./routes/clinic-routes")); // Added clinic routes
const http = __importStar(require("http"));
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const server = http.createServer(app);
// Initialize Socket.IO
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*', // Allow all origins (Update for production)
    },
});
exports.io = io;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
// Emit order status updates
const sendOrderStatus = (orderId, status, statusId) => {
    io.emit('order-updated', {
        event: 'order-status',
    });
};
exports.sendOrderStatus = sendOrderStatus;
const sendUpdateStatus = (statusId, userId, updatedAt) => {
    io.emit('status-updated', {
        event: 'status-updated',
        userId: userId,
        updatedAt: updatedAt,
    });
};
exports.sendUpdateStatus = sendUpdateStatus;
// Middleware setup
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json());
app.use('/uploads', express_1.default.static('uploads'));
// Route setups
app.use('/auth', user_routes_1.default);
app.use('/api', helper_1.Helper.verifyToken);
app.use('/api/plant', plant_routes_1.default);
app.use('/api/cart', cart_routes_1.default);
app.use('/api/clinic', clinic_routes_1.default);
// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
