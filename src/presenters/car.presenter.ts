import { configs } from "../configs/config";
import { ECarStatus } from "../enums/car.status.enum";
import { ICarWithUserSubset, IPresenter } from "../types/presenter.type";

class CarPresenter
  implements IPresenter<ICarWithUserSubset, Partial<ICarWithUserSubset>>
{
  present(data: ICarWithUserSubset): Partial<ICarWithUserSubset> {
    if (data.status !== ECarStatus.active) {
      return {};
    }
    return {
      _id: data._id.toString(),
      brand: data.brand,
      modelka: data.modelka,
      year: data.year,
      color: data.color,
      number_of_owners: data.number_of_owners,
      insurance: data.insurance,
      price: data.price,
      city: data.city,
      avatar: `${configs.AWS_S3_URL}/${data.avatar}`,
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

export const carPresenter = new CarPresenter();
