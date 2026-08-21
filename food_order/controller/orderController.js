import oredrModel from "../model/orderModel.js";

import foodmodel from "../model/foodModel.js";

import HttpError from "../middleware/HttpError.js";

const addOrder = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const { restaurant, items, deliveryAddress, phone } = req.body;

    const foodIds = items.map((item) => item.food);

    const foods = await foodmodel.find({
      _id: { $in: foodIds },
    });

    let totalAmount = 0;

    const orderItems = items.map((item) => {
      const foodFound = foods.find(
        (food) => food._id.toString() === item.food.toString(),
      );
      const itemsTotal = foodFound.price * item.quantity;
      totalAmount += itemsTotal;

      return {
        food: foodFound._id,
        quantity: item.quantity,
      };
    });

    const order = await oredrModel.create({
      CustomerName: userId,
      restaurant,
      items: orderItems,
      totalAmount,
      deliveryAddress,
      phone,
    });

    const orderPopulate = await order.populate([
      {
        path: "CustomerName",
        select: "Name Email phone -_id",
      },
      {
        path: "restaurant",
        select: "RestaurantName Address phone -_id",
      },
      {
        path: "items.food",
        select: "name price decription -_id",
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
      order: orderPopulate,
    });
  } catch (error) {
    return next(new HttpError(error.message));
  }
};

export default {addOrder}
