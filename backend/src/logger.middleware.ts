import { Request, Response } from 'express';
import { ParseArrayPipe } from '@nestjs/common';

export function logger(req: Request, res: Response, next: Function) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );

  console.log(`Request`, req.method, req.path);
  next();
};
