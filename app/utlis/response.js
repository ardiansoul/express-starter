const errorResponse = (res, status = 400, message) => {
  return res.status(status).json({
    message: message,
  });
};

const successResponse = (res, status = 200, message, data) => {
  return res.status(status).json({
    message: message,
    data: data,
  });
};
