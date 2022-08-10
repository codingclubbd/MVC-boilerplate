//dependencies
const mongoose = require("mongoose");

// user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 1,
      trim: true,
    },
    lastName: {
      type: String,
      minLength: 1,
      trim: true,
      default: null,
    },
    username: {
      type: String,
      required: true,
      minLength: 6,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validator: {
        validate: (v) => {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          );
        },
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      enum: ["superAdmin", "admin", "customer"],
    },
    status: {
      type: String,
      enum: ["unverified", "verified", "suspended", "blocked"],
    },
    address: {
      type: [],
      default: [],
    },
    company: {
      type: String,
      trim: true,
      default: null,
    },
    phone: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// model
const User = mongoose.model("User", userSchema);

// exports
module.exports = User;

/* 
1. First Name : String
2. Last Name : String
3. Username: String
4. Email: String
5. Password: String
6. Address: Array
7. Role: Enum
8. Company: String
9. Phone Number : String
10. Postal Code : String
11. Country: String
12. State : String

*/
