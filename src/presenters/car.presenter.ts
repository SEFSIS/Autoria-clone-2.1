import { configs } from "../configs/config";
import { ICar } from "../types/car.type";

interface IPresenter<I, O> {
  present(payload: I): O;
}

class CarPresenter implements IPresenter<ICar, Partial<ICar>> {
  present(data: ICar): Partial<ICar> {
    return {
      brand: data.brand,
      modelka: data.modelka,
      year: data.year,
      color: data.color,
      number_of_owners: data.number_of_owners,
      insurance: data.insurance,
      price: data.price,
      city: data.city,
      views: data.views,
      lastViewedAt: data.lastViewedAt,
      dailyViews: data.dailyViews,
      monthlyViews: data.monthlyViews,
      yearlyViews: data.yearlyViews,
      avatar: `${configs.AWS_S3_URL}/${data.avatar}`,
    };
  }
}

export const carPresenter = new CarPresenter();
