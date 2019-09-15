import { Request, Response, NextFunction } from "express";

export default function asyncRoute(
    controller: (req: Request, res: Response) => void
) {
    return async function(req: Request, res: Response, next: NextFunction) {
        try {
            await controller(req, res);
        } catch (err) {
            next(err);
        }
    };
}
