import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export function validateRequest(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown properties
            stripUnknown: true // remove unknown properties
        };

        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // Extract validation messages
            const errors = error.details?.map(x => x.message).join(', ') || 'Validation error';

            return res.status(400).json({ message: `Validation error: ${errors}` });
        }

        // Update req.body with sanitized values
        req.body = value;
        next();
    };
}

export default validateRequest;
