import { FilterQuery } from "mongoose";

import { Client } from "../models/Client.model";
import { IClient, IClientCredentials } from "../types/client.type";

class ClientRepository {
  public async getAll(): Promise<IClient[]> {
    return await Client.find();
  }

  public async getOneByParams(params: FilterQuery<IClient>): Promise<IClient> {
    return await Client.findOne(params);
  }

  public async findById(id: string): Promise<IClient> {
    return await Client.findById(id);
  }

  public async updateClient(
    clientId: string,
    dto: Partial<IClient>,
  ): Promise<IClient> {
    return await Client.findByIdAndUpdate(clientId, dto, {
      returnDocument: "after",
    });
  }
  public async register(dto: IClientCredentials): Promise<IClient> {
    return await Client.create(dto);
  }

  public async deleteClient(clientId: string): Promise<void> {
    await Client.deleteOne({ _id: clientId });
  }
}

export const clientRepository = new ClientRepository();
