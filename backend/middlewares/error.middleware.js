export const errorHandling = (err, req, res, next) => {
    try {
        let error = {...err};
    
        error.message = err.message;
        console.log(error.message);
    
        if (err.name === "CastError") {
            error = new Error("Resource not found");
            error.statusCode = 404;
        }
    
        if (err.code === 11000) {
            error = new Error("Duplicate field value entered");
            error.statusCode = 400;
        }
    
        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map(values => values.message);
            error = new Error(message.join(", "));
            error.statusCode = 400;
        }
    
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    } catch (error) {
        next(error);
    }
}