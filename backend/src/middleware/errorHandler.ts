import { Request, Response, NextFunction } from 'express'

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err)
  if (res.headersSent) {
    return next(err)
  }
  const status = err.status || 500
  res.status(status).json({ error: err.message || 'Internal server error' })
}

TODO: Standardize error responses with codes