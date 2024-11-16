import { FoodCategoryInterface } from "./IFoodCategory";

export interface MenuInterface {
  ID: number;
  MenuName: string;
  Price: number;
  Description: string;
  ImageMenu?:   string 
  FoodCategoryID?: number;
  FoodCategory?: FoodCategoryInterface;
}
