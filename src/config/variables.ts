import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  database_uri: process.env.MONGO_URI,
  port: process.env.PORT,
  token: process.env.TOKEN,
  salt: Number(process.env.SALT),
  secret: process.env.SECRET,
  sender_email: process.env.SENDER_EMAIL,
  sender_password: process.env.EMAIL_PASSWORD,
};
