import { Theme } from "../theme/theme.model";
import { ProductCart } from "./product-cart.model";
import { ProductCartType } from "./product-cart.type";

// getAllProduct_CartData
export const getAllProductCart = async () => {
  const theme = await ProductCart.find({}).populate("product.theme");
  return theme;
};

// insert user
export const insertProductCart = async (userData: ProductCartType) => {
  const user = await ProductCart.findOne({
    user_email: userData.user_email,
  });
  const uniqueValue = userData?.product?.filter(
    (obj1) => !user?.product?.some((obj2) => obj1?.product === obj2?.product)
  );
  const filterData = uniqueValue.map((data) => {
    return {
      slug: data.product,
    };
  });

  if (filterData.length) {
    const theme = await Theme.find({ $or: filterData }, { slug: 1, _id: 1 });
    const productData = theme.map((data) => {
      return {
        product: data.slug,
        theme: data._id,
      };
    });

    // // const theme = await Theme.findOne({ slug: userData.product[0].product });
    const insertData = {
      user_id: userData.user_id,
      user_email: userData.user_email,
      product: productData,
    };

    if (!user) {
      const newData = new ProductCart(insertData);
      const insertedProductCart = await newData.save();
      return insertedProductCart;
    } else {
      const updateData = await ProductCart.findOneAndUpdate(
        { user_email: userData.user_email },
        {
          $addToSet: {
            product: insertData.product,
          },
        },
        { new: true }
      );

      return updateData;
    }
  }
};

// get single user data
export const getSingleProductCartService = async (
  id: string
): Promise<ProductCartType | null> => {
  const cart = await ProductCart.findOne({ user_id: id }).populate({
    path: "product.theme",
    select: "title image price ",
  });

  return cart;
};
// delete item
export const deleteProductCartService = async (id: string, itemId: string) => {
  const collection = await ProductCart.findOne({ user_id: id });

  if (!collection) {
    throw Error("Collection not found");
  }

  const data = await ProductCart.findOneAndUpdate(
    { user_id: id },
    { $pull: { product: { product: itemId } } }
  );
};

// clean cart
export const cleanProductCartService = async (id: string) => {
  const collection = await ProductCart.findOne({ _id: id });
  if (!collection) {
    throw Error("Collection not found");
  }
  const data = await ProductCart.findByIdAndDelete(id);
};
