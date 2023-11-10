import { clientRepository } from "../repositories/client.repository";
import { IClient } from "../types/client.type";

class ClientService {
  public async getAll(): Promise<IClient[]> {
    return await clientRepository.getAll();
  }

  public async updateClient(
    clientId: string,
    dto: Partial<IClient>,
  ): Promise<IClient> {
    return await clientRepository.updateClient(clientId, dto);
  }

  public async deleteClient(clientId: string): Promise<void> {
    await clientRepository.deleteClient(clientId);
  }
}

export const clientService = new ClientService();
