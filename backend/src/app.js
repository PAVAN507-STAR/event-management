// import express from 'express';
// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import helmet from 'helmet';
// import dotenv from 'dotenv';
// import routes from './routes/index.js';
// import path from 'path';

// dotenv.config();

// const app = express();
// const httpServer = createServer(app);
// export const io = new Server(httpServer, {
//   cors: {
//     origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//     methods: ['GET', 'POST']
//   }
// });

// // Middleware
// app.use(cors());
// app.use(helmet());
// app.use(express.json());

// // Routes
// app.use('/api', routes);

// // Serve static files from the frontend build directory
// app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// // Catch-all route to serve index.html for any non-API requests
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
// });

// // WebSocket events
// io.on('connection', (socket) => {
//   console.log('Client connected');

//   socket.on('joinEvent', (eventId) => {
//     socket.join(`event:${eventId}`);
//   });

//   socket.on('leaveEvent', (eventId) => {
//     socket.leave(`event:${eventId}`);
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// // Database connection
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// const PORT = process.env.PORT || 5000;
// httpServer.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// }); 
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api', routes);

// Serve static files from the frontend build directory
const frontendPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendPath));

// Catch-all route to serve `index.html` for any non-API request
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// WebSocket events
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('joinEvent', (eventId) => {
    socket.join(`event:${eventId}`);
  });

  socket.on('leaveEvent', (eventId) => {
    socket.leave(`event:${eventId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
