import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { SocketService } from "./socket.service";

export class SocketConfig {
  static initialize(httpServer: HttpServer) {
    const io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      },
    });

    SocketService.setIO(io);
    this.setupListeners(io);
    console.log(`✅ Socket.io`);
  }

  private static setupListeners(io: Server) {
    io.on('connection', (socket) => {
      console.log(`🔗 Client connected: ${socket.id}`);

      socket.on('disconnect', () => {
        console.log(`🔌 Client disconnected: ${socket.id}`);
      });
    });
  }
}
