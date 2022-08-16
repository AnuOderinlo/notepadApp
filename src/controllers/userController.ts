import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { UserSchema } from "../models/userModel";
import {
  registerUserSchema,
  loginSchema,
  generateToken,
  options,
} from "../utility/utils";
import bcrypt from "bcryptjs";

/**
 * Create User API
 * @param req
 * @param res
 * @param next
 */
export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();

  // console.log(req.body);

  try {
    const validationResult = registerUserSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const duplicateEmail = await UserSchema.findOne({
      where: { email: req.body.email },
    });

    if (duplicateEmail) {
      return res.status(409).json({
        msg: "Email is used, please change email",
      });
    }

    const duplicatePhone = await UserSchema.findOne({
      where: { phone: req.body.phone },
    });

    if (duplicatePhone) {
      return res.status(409).json({
        msg: "Phone number is used",
      });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 8);
    const ConfirmPasswordHash = await bcrypt.hash(req.body.confirm_password, 8);
    const userData = {
      id,
      fullname: req.body.fullname,
      email: req.body.email,
      gender: req.body.gender,
      phone: req.body.phone,
      address: req.body.address,
      password: passwordHash,
      confirm_password: ConfirmPasswordHash,
    };

    const userDetails = await UserSchema.create(userData);

    // const id = userDetails?.id;
    const token = generateToken({ id });
    res.status(201).json({
      status: "Success",
      token,
      message: "Successfully created a user",
      data: userDetails,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "Failed",
      Message: "Unable to create a user",
    });
  }
}

/**
 * Get All Users API
 * @param req
 * @param res
 * @param next
 */
export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userDetails = await UserSchema.findAll();
    res.status(201).json({
      status: "Success",
      message: "Successfully get all users",
      data: userDetails,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      Message: "Something went all",
    });
  }
}

/**
 * Get a user API
 * @param req
 * @param res
 * @param next
 */
export async function getUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const userDetails = await UserSchema.findOne({ where: { id } });

    res.status(201).json({
      status: "Success",
      message: "Successfully get all users",
      data: userDetails,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      Message: "Something went all",
    });
  }
}

/**
 * Create User API
 * @param req
 * @param res
 * @param next
 */
export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const userDetails = await UserSchema.findOne({ where: { id } });
    const { fullname, email, gender, phone, address } = req.body;
    if (userDetails) {
      const userUpdate = await userDetails.update({
        fullname: fullname || userDetails.getDataValue("fullname"),
        email: email || userDetails.getDataValue("email"),
        gender: gender || userDetails.getDataValue("gender"),
        phone: phone || userDetails.getDataValue("phone"),
        address: address || userDetails.getDataValue("address"),
      });
      res.status(201).json({
        status: "Success",
        message: "Successfully updated a user",
        data: userUpdate,
      });
    } else {
      res.json({
        status: "failed",
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      Message: "Unable to update user",
    });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  const userDetails = await UserSchema.findOne({ where: { id } });
  if (!userDetails) {
    res.json({
      status: "failed",
      message: "User not found",
    });
  } else {
    const deletedUser = await userDetails.destroy();
    res.status(201).json({
      status: "Success",
      message: "Successfully Deleted a user",
      data: deletedUser,
    });
  }
}

/**
 * THE LOGIN API
 * @param req
 * @param res
 * @param next
 * @returns
 */
export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // const id = uuidv4();
  try {
    const validationResult = loginSchema.validate(req.body, options);

    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }

    const User = (await UserSchema.findOne({
      where: { email: req.body.email },
    })) as unknown as { [key: string]: string };

    const { id } = User;
    const token = generateToken({ id });
    const validUser = await bcrypt.compare(req.body.password, User.password);

    if (!validUser && req.body.email === User.email) {
      res.status(401).json({
        message: "Password or email is not correct",
      });
    }

    if (validUser) {
      console.log(req.cookies);

      return res
        .cookie("jwt", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({
          message: "Successfully logged in",
          token,
          User,
        });
    }
  } catch (err) {
    res.status(500).json({
      msg: "failed to login",
      route: "/login",
    });
  }
}

export async function logoutUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // const id = uuidv4();
  return res
    .clearCookie("jwt")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
}
