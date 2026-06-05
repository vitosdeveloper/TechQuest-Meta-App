import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';

const PROTO_PATH = path.resolve(__dirname, '../../../proto/user.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const userProto: any = grpc.loadPackageDefinition(packageDefinition).userpackage;

export class UserGrpcServer {
  private server: grpc.Server;

  constructor(private prisma: any) {
    this.server = new grpc.Server();
    
    this.server.addService(userProto.UserService.service, {
      GetUser: this.getUser.bind(this)
    });
  }

  private async getUser(call: any, callback: any) {
    try {
      const userId = call.request.id;
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      
      if (!user) {
        callback(null, { id: userId, name: 'Neo', email: 'neo@techquest.com' });
      } else {
        callback(null, { id: user.id, name: user.name, email: user.email });
      }
    } catch (err: any) {
      callback({
        code: grpc.status.INTERNAL,
        details: err.message
      });
    }
  }

  public start(port: number = 50051) {
    this.server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, boundPort) => {
      if (err) {
        console.error('Falha ao iniciar gRPC Server', err);
        return;
      }
      this.server.start();
      console.log(`🔌 [gRPC] User Service rodando na porta ${boundPort}`);
    });
  }
}
