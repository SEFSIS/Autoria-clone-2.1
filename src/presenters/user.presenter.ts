import { IUser } from "../types/user.type";

interface IPresenter<I, O> {
  present(payload: I): O;
}

class UserPresenter implements IPresenter<IUser, Partial<IUser>> {
  present(data: IUser): Partial<IUser> {
    return {
      _id: data._id,
      name: data.name,
      surname: data.surname,
      age: data.age,
      gender: data.gender,
      email: data.email,
      phone: data.phone,
      city: data.city,
      role: data.role,
      status: data.status,
    };
  }
}

export const userPresenter = new UserPresenter();
