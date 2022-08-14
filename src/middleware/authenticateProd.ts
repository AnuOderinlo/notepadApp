import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserSchema } from "../models/userModel";

const secret = process.env.JWT_SECRET as string;
export async function auth(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.headers.authorization;

    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      return res.redirect("/login");
    }

    // if the token is present in cookies

    let verified = jwt.verify(token, secret);

    if (!verified) {
      return res.status(401).json({
        Error: "User not verified, you cant access this route",
      });
    }
    const { id } = verified as { [key: string]: string };

    const user = await UserSchema.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({
        Error: "User not verified",
      });
    }

    req.user = verified;
    next();
  } catch (error) {
    return res.status(403).json({
      Error: "User not logged in",
    });
  }
}

// exports.logout = (req: Request | any, res: Response, next: NextFunction) => {};
