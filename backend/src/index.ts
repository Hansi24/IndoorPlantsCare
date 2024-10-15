import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import userRoutes from './routes/user-routes';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { Helper } from './utils/helper';
import plantRoutes from './routes/plant-routes';
import cartRoutes from './routes/cart-routes';
import scheduleRoutes from './routes/schedule-routes';
import clinicRoutes from './routes/clinic-routes'; // Added clinic routes
import * as http from 'http';
import { Server as SocketIO } from 'socket.io';
import { Types } from 'mongoose';
import gardenRoutes from './routes/garden-routes';
import postRoutes from './routes/post-routes';

dotenv.config();
connectDB();
const app: Application = express();

const server = http.createServer(app);

// Initialize Socket.IO
const io = new SocketIO(server, {
  cors: {
    origin: '*', // Allow all origins (Update for production)
  },
});

export { io };
app.use(cors());
app.use(express.json());

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Emit order status updates
export const sendOrderStatus = (orderId: Types.ObjectId, status: string, statusId: Types.ObjectId) => {
  io.emit('order-updated', {
    event: 'order-status',
  });
};
export const sendUpdateStatus = (
  statusId: Types.ObjectId,
  userId: Types.ObjectId,
  updatedAt: Date
) => {
  io.emit('status-updated', {
    event: 'status-updated',
    userId: userId,
    updatedAt: updatedAt,
  });
};

// Middleware setup
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Route setups
app.use('/auth', userRoutes);
app.use('/api', Helper.verifyToken);
app.use('/api/plant', plantRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/clinic', clinicRoutes); 
app.use('/api/schedule', scheduleRoutes); 
app.use('/api/garden', gardenRoutes);
app.use('/api/posts', postRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});