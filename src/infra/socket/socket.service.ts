import { Server } from "socket.io";

export class SocketService {
  private static io: Server;

  static setIO(ioInstance: Server) {
    this.io = ioInstance;
  }

  static emit(event: string, data: any) {
    this.io.emit(event, data);
  }
}
