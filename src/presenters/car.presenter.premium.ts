import { configs } from "../configs/config";
import { ECarStatus } from "../enums/car.status.enum";
import { ICar } from "../types/car.type";
import { IUser } from "../types/user.type";

interface IPresenter<I, O> {
  present(payload: I): O;
}

interface IUserSubset {
  name: IUser["name"];
  email: IUser["email"];
  phone: IUser["phone"];
}

interface ICarWithUserSubset extends ICar {
  _userId: IUserSubset;
}

class CarPresenterPremium
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
      views: data.views,
      lastViewedAt: data.lastViewedAt,
      dailyViews: data.dailyViews,
      monthlyViews: data.monthlyViews,
      yearlyViews: data.yearlyViews,
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

export const carPresenterPremium = new CarPresenterPremium();
