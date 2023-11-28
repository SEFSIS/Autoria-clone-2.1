import { ICar } from "./car.type";
import {ICheck} from "./check.type";
import { IUser } from "./user.type";

export interface IPresenter<I, O> {
  present(payload: I): O;
}

export interface IUserSubset {
  name: IUser["name"];
  email: IUser["email"];
  phone: IUser["phone"];
}

export interface ICarWithUserSubset extends ICar {
  _userId: IUserSubset;
}

export interface ICheckWithUserSubset extends ICheck {
  _userId: IUserSubset;
}