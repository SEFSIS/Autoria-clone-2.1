export enum ECity {
  Lviv = "Lviv",
  Odesa = "Odesa",
  Dnipro = "Dnipro",
  Donetsk = "Donetsk",
  Zhytomyr = "Zhytomyr",
  Uzhhorod = "Uzhhorod",
  Zaporizhzhia = "Zaporizhzhia",
  Kyiv = "Kyiv",
  Kropyvnytskyi = "Kropyvnytskyi",
  Lysychansk = "Lysychansk",
  Mykolaiv = "Mykolaiv",
  Poltava = "Poltava",
  Rivne = "Rivne",
  Sumy = "Sumy",
  Ternopil = "Ternopil",
  Kharkiv = "Kharkiv",
  Kherson = "Kherson",
  Khmelnytskyi = "Khmelnytskyi",
  Cherkasy = "Cherkasy",
  Chernihiv = "Chernihiv",
}
export type ECityString = keyof typeof ECity;
