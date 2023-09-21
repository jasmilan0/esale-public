const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Inventory = require("./models/Inventory");
const Order = require("./models/Order");
const Employee = require("./models/Employee");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");

require("dotenv").config();
const app = express();

/////////////////////////////////////////////////////////////
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

//////////////////////-- GET Requests --//////////////////////
app.get("/getInventoryData", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userInfo) => {
    if (err) throw err;
    const businessIdObjectId = new mongoose.Types.ObjectId(userInfo.ownerID);

    try {
      const inventoryData = await Inventory.find({
        businesssId: businessIdObjectId,
      });
      const formattedData = inventoryData.map((item) => ({
        ...item._doc,
        price: item.price.toString(),
        cost: item.cost.toString(),
      }));

      res.json(formattedData);
    } catch (error) {
      res.status(400).json("Error: ", error);
    }
  });
});

app.get("/searchItem", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const { searchValue } = req.query;

  jwt.verify(token, jwtSecret, {}, async (err, userInfo) => {
    if (err) throw err;
    const businessIdObjectId = new mongoose.Types.ObjectId(userInfo.ownerID);

    try {
      const itemSearch = await Inventory.find({
        businesssId: businessIdObjectId,
        $or: [{ itemName: searchValue }, { sku: searchValue }],
      });

      const formattedData = itemSearch.map((item) => ({
        ...item._doc,
        price: item.price.toString(),
        cost: item.cost.toString(),
      }));

      res.json(formattedData);
    } catch (error) {
      res.json("Error", error);
    }
  });
});

app.get("/getItemInfo", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { skuID } = req.query;
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userInfo) => {
    if (err) throw err;
    const businessIdObjectId = new mongoose.Types.ObjectId(userInfo.ownerID);

    try {
      const itemSearch = await Inventory.find({
        businesssId: businessIdObjectId,
        sku: skuID,
      });

      const formattedData = itemSearch.map((item) => ({
        ...item._doc,
        price: item.price.toString(),
        cost: item.cost.toString(),
      }));

      res.json(formattedData);
    } catch (error) {
      res.json("Error", error);
    }
  });
});

app.get("/getOrders", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userInfo) => {
    if (err) throw err;
    const businessIdObjectId = new mongoose.Types.ObjectId(userInfo.ownerID);

    try {
      const orders = await Order.find({
        businesssId: businessIdObjectId,
      }).sort({ dateTimeField: -1 });

      const formattedOrders = orders.map((order) => {
        const isoDate = order.dateTimeField.toISOString();
        const date = new Date(isoDate);
        const months = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ];
        const amPm = date.getHours() >= 12 ? "pm" : "am";
        const hourFormat = date.getHours() % 12 || 12;
        const formattedDate = `${
          months[date.getMonth()]
        }-${date.getDate()}-${date.getFullYear()} ${hourFormat}:${date.getMinutes()}${amPm}`;

        return { ...order.toObject(), dateTimeField: formattedDate };
      });

      res.status(200).json(formattedOrders);
    } catch (error) {
      res.status(400).json("Error", error);
    }
  });
});

app.get("/getSpecificOrder", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { orderID } = req.query;
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userInfo) => {
    if (err) throw err;
    const businessIdObjectId = new mongoose.Types.ObjectId(userInfo.ownerID);
    const orderIDObjectId = new mongoose.Types.ObjectId(orderID);

    try {
      const orderSearch = await Order.find({
        businesssId: businessIdObjectId,
        _id: orderIDObjectId,
      });

      const transformedOrderSearch = orderSearch.map((order) => ({
        _id: order._doc._id,
        businesssId: order._doc.businesssId,
        dateTimeField: order._doc.dateTimeField,
        subTotal: order._doc.subTotal.toString(),
        items: order._doc.items.map((item) => ({
          item: {
            itemId: item.item.itemId,
            itemName: item.item.itemName,
            price: item.item.price.toString(),
            cost: item.item.cost,
            category: item.item.category,
            sku: item.item.sku,
          },
          count: item.count,
          totalCost: item.totalCost,
        })),
      }));

      res.status(200).json(transformedOrderSearch);
    } catch (error) {
      res.status(400).json("Error", error);
    }
  });
});

app.get("/getSalesReport", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const { date } = req.query;

  jwt.verify(token, jwtSecret, {}, async (err, userInfo) => {
    if (err) throw err;
    const businessIdObjectId = new mongoose.Types.ObjectId(userInfo.ownerID);

    try {
      const dateObject = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);

      const orderSearch = await Order.find({
        businesssId: businessIdObjectId,
        dateTimeField: {
          $gte: dateObject,
          $lt: endDate,
        },
      });

      const formattedData = orderSearch.map((order) => ({
        _id: order._id,
        businesssId: order.businesssId,
        dateTimeField: order.dateTimeField,
        subTotal: order.subTotal.toString(),
        items: order.items.map((item) => ({
          item: {
            itemId: item.item.itemId,
            itemName: item.item.itemName,
            price: item.item.price.toString(),
            cost: item.item.cost,
            category: item.item.category,
            sku: item.item.sku,
          },
          count: item.count,
          totalCost: item.totalCost,
        })),
      }));

      const total = formattedData.reduce((accumulator, item) => {
        return accumulator + parseFloat(item.subTotal);
      }, 0);

      const results = {
        orderNum: formattedData.length,
        total: total,
      };
      res.status(200).json(results);
    } catch (error) {
      res.status(404).json({ message: "None found", error });
    }
  });
});

app.get("/getInventoryReport", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const { date } = req.query;

  jwt.verify(token, jwtSecret, {}, async (err, userInfo) => {
    if (err) throw err;
    const businessIdObjectId = new mongoose.Types.ObjectId(userInfo.ownerID);

    try {
      const dateObject = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);

      const orderSearch = await Order.find({
        businesssId: businessIdObjectId,
        dateTimeField: {
          $gte: dateObject,
          $lt: endDate,
        },
      });

      const formattedData = orderSearch.map((order) => ({
        _id: order._id,
        businesssId: order.businesssId,
        dateTimeField: order.dateTimeField,
        subTotal: order.subTotal.toString(),
        items: order.items.map((item) => ({
          item: {
            itemId: item.item.itemId,
            itemName: item.item.itemName,
            price: item.item.price.toString(),
            cost: item.item.cost,
            category: item.item.category,
            sku: item.item.sku,
          },
          count: item.count,
          totalCost: item.totalCost,
        })),
      }));

      const itemCounts = {};

      formattedData.forEach((order) => {
        order.items.forEach((item) => {
          const itemId = item.item.itemId;
          const itemName = item.item.itemName;
          const sku = item.item.sku;
          const count = item.count;

          if (itemCounts[itemId]) {
            itemCounts[itemId].count += count;
          } else {
            itemCounts[itemId] = { sku, itemName, count };
          }
        });
      });

      const transformedData = Object.entries(itemCounts).map(
        ([itemId, { sku, itemName, count }]) => ({
          itemId,
          sku,
          itemName,
          count,
        })
      );

      const sortedData = transformedData.sort((a, b) => b.count - a.count);

      res.status(200).json(sortedData);
    } catch (error) {
      res.status(404).json(error);
    }
  });
});

app.get("/getEmployeeList", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userInfo) => {
    if (err) throw err;
    const businessIdObjectId = new mongoose.Types.ObjectId(userInfo.ownerID);

    try {
      const employeeDoc = await Employee.find({
        businesssId: businessIdObjectId,
      });
      res.status(200).json(employeeDoc);
    } catch (error) {
      res.json("Custom Error", error);
    }
  });
});

app.get("/getUserInfo", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userInfo) => {
    if (err) throw err;

    try {
      const userDoc = await User.findOne({ _id: userInfo.ownerID });
      res.status(200).json(userDoc);
    } catch (error) {
      res.status(400).json(error);
    }
  });
});

const tokenBlacklist = new Set();
function blacklistToken(token) {
  tokenBlacklist.add(token);
}

app.get("/protected", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    if (tokenBlacklist.has(token)) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }
    res.status(200).json({ message: "Access granted" });
  } else {
    res.status(401).json({ message: "No token found" });
  }
});

//////////////////////-- POST Requests --//////////////////////
app.post("/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { firstName, lastName, businessName, email, password } = req.body;

  const emailLookup = await User.findOne({ email });

  if (emailLookup) {
    res.status(409).json("Email Already exists");
  } else {
    try {
      const userDoc = await User.create({
        firstName,
        lastName,
        businessName,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
      });
      res.status(200).json(userDoc);
    } catch (error) {
      res.status(422).json("Error registering" + error);
    }
  }
});

app.post("/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { email, password } = req.body;
 

  try {
    const emailLookup = await User.findOne({ email });

    if (emailLookup) {
      const passCheck = bcrypt.compareSync(password, emailLookup.password);

      const userData = {
        ownerID: emailLookup._id,
        firstName: emailLookup.firstName,
        lastName: emailLookup.lastName,
        businessName: emailLookup.businessName,
        email: emailLookup.email,
      };

      if (passCheck) {
        jwt.sign(userData, jwtSecret, {}, (err, token) => {
          if (err) throw err;
          res.cookie("token", token).status(200).json(userData);
        });
      } else {
        res.status(401).json("Password Invalid");
      }
    } else {
      res.status(404).json("Email not found");
    }
  } catch (error) {
    res.status(400).json("Internal Error occured" + error);
  }
});

app.post("/addNewItem", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { itemName, price, cost, category, sku, stockCount } = req.body;
  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, userInfo) => {
    if (err) throw err;
    const businessIdObjectId = new mongoose.Types.ObjectId(userInfo.ownerID);
    const skuCheck = await Inventory.find({
      businesssId: businessIdObjectId,
      sku: sku,
    });
    if (skuCheck.length >= 1) {
      return res.status(409).json("Duplicate SKU");
    } else {
      const itemDoc = await Inventory.create({
        businesssId: userInfo.ownerID,
        itemName: itemName,
        price: parseFloat(price).toFixed(2),
        cost: parseFloat(cost).toFixed(2),
        category: category,
        sku: sku,
        stockCount: stockCount,
      });
      return res.status(200).json(itemDoc);
    }
  });
});

app.post("/saveOrder", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const { orderData, subTotal } = req.body;

  const items = orderData.map((orderItem) => ({
    count: orderItem.count,
    totalCost: orderItem.totalCost,
    item: {
      itemId: new mongoose.Types.ObjectId(orderItem.item._id),
      itemName: orderItem.item.itemName,
      price: orderItem.item.price, // Assuming price is a decimal
      cost: orderItem.item.cost, // Assuming cost is a decimal
      category: orderItem.item.category,
      sku: orderItem.item.sku,
    },
  }));

  jwt.verify(token, jwtSecret, {}, async (err, userInfo) => {
    if (err) throw err;

    const list = items.map((item) => {
      return {
        itemId: item.item.itemId,
        count: item.count,
      };
    });

    const updateItem = list.map(async (item) => {
      await Inventory.findOneAndUpdate(
        { _id: item.itemId },
        { $inc: { stockCount: -item.count } }
      );
    });

    const businessIdObjectId = new mongoose.Types.ObjectId(userInfo.ownerID);
    const orderDoc = await Order.create({
      businesssId: businessIdObjectId,
      dateTimeField: new Date(),
      subTotal: subTotal,
      items: items,
    });

    res.status(200).json(orderDoc);
  });
});

app.post("/addEmployee", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const { firstName, lastName, email, password } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userInfo) => {
    if (err) throw err;
    const businessIdObjectId = new mongoose.Types.ObjectId(userInfo.ownerID);

    try {
      const employeeDoc = await Employee.create({
        firstName: firstName,
        lastName: lastName,
        businesssId: businessIdObjectId,
        email: email,
        password: bcrypt.hashSync(password, bcryptSalt),
      });

      res.status(200).json(employeeDoc);
    } catch (error) {
      res.status(400).json({ message: "custom error2", error });
    }
  });
});

app.post("/signout", (req, res) => {
  //res.cookie("token", "").json(true);
  const { token } = req.cookies;

  if (token) {
    blacklistToken(token);
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } else {
    res.status(401).json({ message: "No token found" });
  }
});

//////////////////////-- PUT Requests --//////////////////////
app.put("/updateItemInfo", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;

  //const {skuID} = req.query;
  const { skuID, itemName, price, cost, category, sku, stockCount } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userInfo) => {
    if (err) throw err;
    const businessIdObjectId = new mongoose.Types.ObjectId(userInfo.ownerID);

    try {
      const updatedDoc = await Inventory.findOneAndUpdate(
        { businesssId: businessIdObjectId, sku: skuID },
        {
          itemName: itemName,
          price: parseFloat(price).toFixed(2),
          cost: parseFloat(cost).toFixed(2),
          category: category,
          stockCount: stockCount,
        }
      );

      res.json(updatedDoc);
    } catch (error) {
      res.json(error);
    }
  });
});

app.put("/updateUser", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const { email, firstName, lastName, businessName } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userInfo) => {
    if (err) throw err;

    try {
      const userDoc = await User.findByIdAndUpdate(
        { _id: userInfo.ownerID },
        {
          email: email,
          firstName: firstName,
          lastName: lastName,
          businessName: businessName,
        }
      );
    } catch (error) {
      console.log(error);
    }
  });
});

//////////////////////-- Delete Requests --//////////////////////
app.delete("/deleteItem", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const { skuID } = req.query;

  jwt.verify(token, jwtSecret, {}, async (err, userInfo) => {
    if (err) throw err;
    const businessIdObjectId = new mongoose.Types.ObjectId(userInfo.ownerID);

    try {
      const deleteItem = await Inventory.deleteOne({
        businesssId: businessIdObjectId,
        sku: skuID,
      });
      res.status(200).json("Deleted");
    } catch (error) {
      res.status(406).json("Error", error);
    }
  });
});

//////////////////////-- Server Initiating --//////////////////////

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
