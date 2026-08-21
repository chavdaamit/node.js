
import modelUser from "../model/UserModel.js";
import HttpError from "../middleware/HttpError.js";
import restaurantModel from "../model/restaurant.js";
import providerModel from "../model/Provider.js";
import foodModel from "../model/foodModel.js";
import orderModel from "../model/orderModel.js";




const getAllUsers = async (req, res, next) => {
  try {
    const { role, isVerified } = req.query;

    const Query = {};

    if (role === "provider") {
      Query.role = role;
    }

    if (role === "customer") {
      Query.role = role;
    }

    if (isVerified !== undefined) {
      Query.isVerified = isVerified === "true";
    }

    const users = await modelUser.find(Query);

    if (users.length === 0) {
      return next(new HttpError("user data not found", 404));
    }

    const totalUser = await modelUser.countDocuments(Query);

    res.status(200).json({
      success: true,
      message: "user data found",
      totalUser,
      users,
    });
  } catch (error) {
    return next(new HttpError(error.message));
  }
};



const dashBoardStatics = async (req, res, next) => {
  try {



    const totalUsers = await modelUser.countDocuments();

    const totalCustomer = await modelUser.countDocuments({
      role: "customer",
    });

    const totalProvider = await modelUser.countDocuments({
      role: "provider",
    });



    const totalIsVerifiedProvider = await providerModel.countDocuments({
      isVerified: true,
    });

    const totalRejectedProvider = await providerModel.countDocuments({
      isVerified: false,
    });


   

    const totalRestaurant = await RestaurantModel.countDocuments();

    const totalVerifiedRestaurant =
      await RestaurantModel.countDocuments({
        isVerified: true,
      });

    const totalRejectedRestaurant =
      await RestaurantModel.countDocuments({
        isVerified: false,
      });




    const totalFood = await foodModel.countDocuments();

    const totalVerifiedFood = await foodModel.countDocuments({
      isVerified: true,
    });

    const totalRejectedFood = await foodModel.countDocuments({
      isVerified: false,
    });

    const totalIsAvailableFood = await foodModel.countDocuments({
      isAvailable: true,
    });


  

    const totalOrder = await orderModel.countDocuments();


  

    const totalRevenue = await orderModel.aggregate([
      {
        $group: {
          _id: null,
          revenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);


   

    const orderStatus = await orderModel.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          count: {
            $sum: 1,
          },
        },
      },
    ]);




    res.status(200).json({
      success: true,
      message: "dashboard statics fetched successfully",

      totalUsers,
      totalCustomer,
      totalProvider,

      totalIsVerifiedProvider,
      totalRejectedProvider,

      totalRestaurant,
      totalVerifiedRestaurant,
      totalRejectedRestaurant,

      totalFood,
      totalVerifiedFood,
      totalRejectedFood,
      totalIsAvailableFood,

      totalOrder,

      totalRevenue,

      orderStatus,
    });

  } catch (error) {
    return next(new HttpError(error.message));
  }
};


export default {
  getAllUsers,
  dashBoardStatics,
};
