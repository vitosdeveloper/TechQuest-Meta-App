import { IVectorStore } from '../../domain/interfaces/IVectorStore';

export class IngestKnowledgeUseCase {
  constructor(private vectorStore: IVectorStore) {}

  public async execute(directoryPath: string): Promise<number> {
    console.log(`[Use Case] Iniciando ingestão de conhecimento no diretório: ${directoryPath}`);
    const chunkCount = await this.vectorStore.ingestFiles(directoryPath);
    console.log(`[Use Case] Ingestão concluída com sucesso. ${chunkCount} chunks armazenados.`);
    return chunkCount;
  }
}
