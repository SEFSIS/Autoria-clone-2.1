import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";
import { IPaginationResponse, IQuery } from "../types/pagination.type";
import { IUser } from "../types/user.type";

class UserService {
  public async getAllWithPagination(
    query: IQuery,
  ): Promise<IPaginationResponse<IUser>> {
    try {
      const [users, itemsFound] = await userRepository.getMany(query);

      return {
        page: +query.page || 1,
        limit: +query.limit || 5,
        itemsFound,
        data: users,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async updateUser(userId: string, dto: Partial<IUser>): Promise<IUser> {
    return await userRepository.updateUser(userId, dto);
  }

  public async deleteUser(userId: string): Promise<void> {
    await userRepository.deleteUser(userId);
  }

  public async getMe(userId: string): Promise<IUser> {
    return await userRepository.findById(userId);
  }
}

export const userService = new UserService();
