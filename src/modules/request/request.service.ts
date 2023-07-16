import { Request } from "./request.model";
import { RequestType } from "./request.type";

// getAllRequestData
export const getAllRequest = async (): Promise<RequestType[]> => {
  const request = await Request.find({});
  return request;
};

// insert request
export const insertRequest = async (requestData: RequestType) => {
  const newData = new Request(requestData);
  const insertedRequest = await newData.save();
  return insertedRequest;
};
