import express from 'express';
import FoodController from '../../controller/food';
import { validateId } from '../../helpers/utils';


const foodRouter = express.Router();

foodRouter.get(
  '/foods/',
  FoodController.getAllFoods
)
  .get(
    '/foods/:id',
    validateId,
    FoodController.getFood
  );

export default foodRouter;
