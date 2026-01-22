import { SocketService } from "../socket.service";

export class ExampleEmitter {
  static emitLoginCreated(data: any) {
    SocketService.emit('login.created', data);
  }
}
