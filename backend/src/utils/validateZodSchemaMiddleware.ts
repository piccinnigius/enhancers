import { AnyZodObject } from "zod";
import { NextFunction, Request, Response } from "express";

export const validateZodSchemaMiddleware =
	(schema: AnyZodObject) =>
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				await schema.parseAsync({
					body: req.body,
					query: req.query,
					params: req.params,
				});
				return next();
			} catch (error) {
				return res.status(400).json(error);
			}
		};
