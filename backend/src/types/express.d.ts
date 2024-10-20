// src/types/express.d.ts
import { Types } from 'mongoose';


declare global {
  namespace Express {
    interface Request {
      user: {
          [x: string]: any; userId: Types.ObjectId; /* Add other properties if necessary */ 
};
    }
  }
}
