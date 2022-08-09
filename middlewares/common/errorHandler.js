// dependencies


// error handler middle
function errorHandler(err, req, res, next) {
    const error =
      process.env.NODE_ENV === "development" ? err : { message: err.message };
    if (res.headerSent) {
      next(error);
    } else {
      try {
        res.locals.error = error;
        const code = 500;
        res.status(error.status || code);
  
        if (res.locals.html) {
          res.render("pages/error", { title: "Error Page" });
        } else {
          res.json(error);
        }
      } catch (error) {
        next(error);
      }
    }
  }
  
  // exports
  module.exports = {
    errorHandler,
  };