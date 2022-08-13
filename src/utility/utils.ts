import Joi from "joi";
import jwt from "jsonwebtoken";

export const createNotesSchema = Joi.object().keys({
  title: Joi.string().lowercase().required(),
  description: Joi.string().lowercase().required(),
  dueDate: Joi.string().lowercase().required(),
  status: Joi.string().lowercase().required(),
});

export const updateNotesSchema = Joi.object().keys({
  title: Joi.string().lowercase(),
  description: Joi.string().lowercase(),
  dueDate: Joi.string().lowercase(),
  status: Joi.string().lowercase(),
});

export const registerUserSchema = Joi.object()
  .keys({
    fullname: Joi.string().required(),
    email: Joi.string().trim().lowercase().required(),
    phone: Joi.string()
      .length(11)
      .pattern(/^[0-9]+$/)
      .required(),
    gender: Joi.string().required(),
    address: Joi.string().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    confirm_password: Joi.ref("password"),
  })
  .with("password", "confirm_password");

export const loginSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
});

export const generateToken = (user: { [key: string]: unknown }): unknown => {
  const secret = process.env.JWT_SECRET as string;
  const expires = process.env.JWT_EXPIRES_IN;

  // console.log(process.env);

  console.log(jwt.sign(user, secret, { expiresIn: expires }));
  return jwt.sign(user, secret, { expiresIn: expires });
};
// generateToken({id: })

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};
