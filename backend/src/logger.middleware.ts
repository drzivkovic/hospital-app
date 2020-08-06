import { Request, Response } from 'express';
import { ParseArrayPipe } from '@nestjs/common';

export function logger(req: Request, res: Response, next: Function) {
  console.log(`Request`, req.method, req.path);
  next();
};
