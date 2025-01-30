// d stand for decleration of file 
import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

