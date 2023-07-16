import { RequestHandler } from "express";
import {
  deleteTestimonial,
  getAllTestimonial,
  getTestimonialTrash,
  insertTestimonial,
  updateSingleTestimonial,
  updateTestimonial,
  updateTestimonialTrash,
} from "./testimonial.service";
import { TrashedTestimonial } from "./testimonial.type";

const getTestimonialController: RequestHandler = async (req, res, next) => {
  let page = parseInt(req.query.page as string) - 1 || 0;
  let limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
  try {
    const testimonial = await getAllTestimonial(page, limit);

    res.status(200).json({
      succes: true,
      isEmpty: testimonial.length > 0 ? false : true,
      result: testimonial,
      message: "data get succesfully",
      total: testimonial.length / limit,
    });
  } catch (error) {
    next(error);
  }
};

// create testimonial
const testimonialInsertController: RequestHandler = async (req, res, next) => {
  try {
    const testimonial = req.body;
    const testimonialData = await insertTestimonial(testimonial);
    res.status(200).json({
      succes: true,
      data: testimonialData,
      message: "data inserted succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// testimonial update controller
const testimonialUpdateController: RequestHandler = async (req, res, next) => {
  try {
    const testimonial = req.body.data;
    await updateTestimonial(testimonial);
    res.status(200).json({
      succes: true,
      message: "data updated succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// get trashed testimonial
const getTrashedTestimonial: RequestHandler = async (req, res, next) => {
  try {
    const testimonial = await getTestimonialTrash();
    res.status(200).json({
      succes: true,
      isEmpty: testimonial.length > 0 ? false : true,
      message: "data get succesfully",
      result: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

// restore trash testimonial
const restoreTrashedData: RequestHandler = async (req, res, next) => {
  try {
    const testimonial = req.body.updateTrash.filter(
      (data: TrashedTestimonial) => data.id
    );
    await updateTestimonialTrash(testimonial);
    res.status(200).json({
      succes: true,
      message: "data restored succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// update single testimonial
const updateWeightAndDraft: RequestHandler = async (req, res, next) => {
  const updateData = req.body;
  const id = req.params.id;
  try {
    await updateSingleTestimonial(updateData, id);
    res.status(200).json({
      succes: true,
      message: "data updated succesfully",
    });
  } catch (error) {
    next(error);
  }
};

// delete testimonial
const deleteTestimonialController: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    await deleteTestimonial(id);
    res.status(200).json({
      succes: true,
      message: "data deleted succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getTestimonialController,
  testimonialInsertController,
  testimonialUpdateController,
  getTrashedTestimonial,
  restoreTrashedData,
  updateWeightAndDraft,
  deleteTestimonialController,
};
