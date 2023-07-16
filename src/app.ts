import axios from "axios";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { globalErrorhandler } from "./middleware/globalErrorHandler";
import adminRouter from "./modules/admin/admin.route";
import bundleReviewRouter from "./modules/bundle-review/bundle-review.route";
import deletedShowcaseRouter from "./modules/deleted-showcase/deleted-showcase.route";
import orderRouter from "./modules/order/order.route";
import passwordRouter from "./modules/password/password.route";
import productCartRouter from "./modules/product-cart/product-cart.route";
import purchaseRouter from "./modules/purchase/purchase.route";
import requestRouter from "./modules/request/request.route";
import reviewRouter from "./modules/review/review.route";
import searchRouter from "./modules/search/search.route";
import showcaseRouter from "./modules/showcase/showcase.route";
import testimonialRouter from "./modules/testimonial/testimonial.route";
import themeRouter from "./modules/theme/theme.route";
import userRouter from "./modules/user/user.route";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/v1/paddle", async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      `https://sandbox-vendors.paddle.com/api/2.0/product/generate_pay_link`,
      req.body
    );
    // console.log(response);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send({
      url: response.data.response.url,
    });
    // console.log(response.data.response.url);
  } catch (error: any) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

app.use("/api/v1/testimonial", testimonialRouter);
app.use("/api/v1/showcase", showcaseRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/bundle-review", bundleReviewRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/request", requestRouter);
app.use("/api/v1/deleted-showcase", deletedShowcaseRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/password-recovery", passwordRouter);
app.use("/api/v1/purchase", purchaseRouter);
app.use("/api/v1/product-cart", productCartRouter);
app.use("/api/v1/theme", themeRouter);
app.use("/api/v1/order", orderRouter);

app.use(globalErrorhandler);

export default app;
