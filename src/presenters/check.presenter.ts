import { ICheck } from "../types/check.type";
import { ICheckWithUserSubset, IPresenter } from "../types/presenter.type";

class CheckPresenter
  implements IPresenter<ICheckWithUserSubset, Partial<ICheckWithUserSubset>>
{
  present(data: ICheck): Partial<ICheck> {
    return {
      _id: data._id.toString(),
      price: data.price,
      carId: data.carId,
      success: data.success,

      _userId:
        data._userId && data._userId.name
          ? {
              name: data._userId.name,
              email: data._userId.email,
              phone: data._userId.phone,
            }
          : null,
    };
  }
}

export const checkPresenter = new CheckPresenter();
