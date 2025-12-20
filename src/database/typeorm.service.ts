import { typeormConfig } from "./typeorm.config";

export class TypeormService {
  static async initialize(delay: number = 5000) {
    while (true) {
      try {
        await typeormConfig.initialize();
        console.log('✨============================================✨');
        console.log('📦 Banco de dados conectado com sucesso.');
        return;
      } catch (err) {
        console.error("Erro ao conectar:", err);
        console.log(`Tentando novamente em ${delay / 1000} segundos...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
}
