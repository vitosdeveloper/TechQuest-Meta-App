export interface IVectorStore {
  ingestFiles(directoryPath: string): Promise<number>;
  search(query: string, topK?: number): Promise<string[]>;
}
