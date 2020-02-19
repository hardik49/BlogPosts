exports.message = function(statusCode, status, msg, data = '') {
  let obj = {
    statusCode: statusCode,
    status: status,
    message: msg,
    data: data
  }
  return obj;
}

