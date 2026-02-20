import * as fs from 'fs';
import * as path from 'path';

export class Logger {
  /**
   * Salva dados em um arquivo de log com formatação
   * @param data Dados a serem logados
   * @param filename Nome do arquivo (sem extensão)
   * @param append Se true, acumula logs; se false, sobrescreve
   */
  static saveToLogFile(data: any, filename: string = 'app', append: boolean = true): string {
    try {
      // Criar diretório se não existir
      const dirPath = path.join(process.cwd(), 'logs');
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      // Garantir extensão .log
      const fullFilename = filename.endsWith('.log') ? filename : `${filename}.log`;
      const filePath = path.join(dirPath, fullFilename);

      // Converter para string formatada
      const logContent = this.formatLogData(data);
      const timestampedContent = `\n\n=== ${new Date().toISOString()} ===\n${logContent}`;

      // Escrever no arquivo
      if (append && fs.existsSync(filePath)) {
        fs.appendFileSync(filePath, timestampedContent, 'utf8');
      } else {
        fs.writeFileSync(filePath, timestampedContent, 'utf8');
      }

      console.log(`Log salvo em: ${filePath}`);
      return filePath;
    } catch (error) {
      console.error('Erro ao salvar arquivo de log:', error);
      throw error;
    }
  }

  /**
   * Formata dados para log de maneira legível
   */
  private static formatLogData(data: any): string {
    if (Array.isArray(data)) {
      return data.map((item, index) =>
        `[${index + 1}]: ${JSON.stringify(item, null, 2)}`
      ).join('\n\n');
    }

    if (typeof data === 'object' && data !== null) {
      return JSON.stringify(data, null, 2);
    }

    return String(data);
  }

  /**
   * Limpa arquivos de log antigos
   * @param daysToKeep Número de dias para manter os logs
   */
  static cleanupOldLogs(daysToKeep: number = 7): void {
    try {
      const dirPath = path.join(process.cwd(), 'logs');
      if (!fs.existsSync(dirPath)) return;

      const files = fs.readdirSync(dirPath);
      const now = Date.now();
      const msPerDay = 24 * 60 * 60 * 1000;

      files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);
        const fileAgeDays = (now - stats.mtimeMs) / msPerDay;

        if (fileAgeDays > daysToKeep) {
          fs.unlinkSync(filePath);
          console.log(`Arquivo de log antigo removido: ${file}`);
        }
      });
    } catch (error) {
      console.error('Erro ao limpar logs antigos:', error);
    }
  }

  /**
   * Lê o conteúdo de um arquivo de log
   */
  static readLogFile(filename: string): string {
    try {
      const filePath = path.join(process.cwd(), 'logs', filename);
      if (!fs.existsSync(filePath)) {
        throw new Error(`Arquivo de log não encontrado: ${filename}`);
      }
      return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      console.error('Erro ao ler arquivo de log:', error);
      throw error;
    }
  }
}

// Forma de user
// Logger.saveToLogFile(clientsResponse, 'clientsResponse', false);
