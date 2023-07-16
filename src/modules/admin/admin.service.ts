import { Admin } from "./admin.model";
import { AdminType } from "./admin.type";

// getAllAdminData
export const getAllAdmin = async (): Promise<AdminType[]> => {
  const admin = await Admin.find({});
  return admin;
};

// insert admin
export const insertAdmin = async (adminData: AdminType) => {
  const newData = new Admin(adminData);
  const insertedAdmin = await newData.save();
  return insertedAdmin;
};

// update
export const updateAdmin = async (updatedData: AdminType[]) => {
  const dataArray = updatedData.map((data) => {
    return {
      updateOne: {
        filter: { _id: data._id },
        update: {
          $set: {
            weight: data.weight,
            role: data.role,
          },
        },
      },
    };
  });

  await Admin.bulkWrite(dataArray);
};

// delete showcase
export const deleteAdmin = async (id: string) => {
  await Admin.deleteOne({ _id: id });
};
