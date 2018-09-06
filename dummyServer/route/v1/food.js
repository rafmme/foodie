import express from 'express';
import FoodController from '../../controller/food';


const foodRouter = express.Router();

foodRouter.get(
  '/foods/',
  FoodController.getAllFoods
);

export default foodRouter;
