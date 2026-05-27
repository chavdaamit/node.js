// import mongoose from "mongoose";

// async function connectDb() {
//   try {
//     const connect = await mongoose.connect(
//       "mongodb://127.0.0.1:27017/studentManagment",
//     );
//     console.log("db connected");
//     return connect;
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// export default connectDb;

import mongoose from "mongoose";

async function connectDb() {
  try {
    const connect = await mongoose.connect(
      "mongodb://127.0.0.1:27017/studentManagment",
    );

    console.log("db connected");
    return connect;
  } catch (error) {
    console.log(error.message);
  }
}

export default connectDb;
