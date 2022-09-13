/* eslint-disable no-unused-vars */
module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    switch (true) {
        case typeof err === 'string':
            // custom application error
            // eslint-disable-next-line no-case-declarations
            const is404 = err.toLowerCase().endsWith('not found');
            // eslint-disable-next-line no-case-declarations
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err, isError: true });
        case err.name === 'ValidationError':
            // mongoose validation error
            return res.status(400).json({ message: err.message, isError: true });
        case err.name === 'UnauthorizedError':
            // jwt authentication error
            return res.status(401).json({ message: 'Unauthorized', isError: true });
        default:
            return res.status(500).json({ message: err.message, isError: true });
    }
}