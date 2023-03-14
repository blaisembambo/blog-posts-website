const errorMiddleware = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    if (err) {
        res.json({ error_msg: err.message })
    } else {
        res.json({ error_msg: 'server error ' })
    }
}

module.exports = { errorMiddleware }