import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { handleResponse } from "../responseHandlers/resHandler";

// This middleware expects the ID to be in `req.params.id`
export const ValidateObjectId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return handleResponse(res, 400, "Invalid ID", null);
  }

  next();
};
