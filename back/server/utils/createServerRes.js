const ApiErrorMessages = require("../models/apiErrorMessages.js")
const ApiResponse = require("../models/apiResponse.js")
function createRes(resType, extras = null) {
  if (extras || resType === "success") {
    return new ApiResponse({
      success: true,
      extras
    });
  }
  if (Object.keys(ApiErrorMessages).includes(resType)) {
    return new ApiResponse({
      success: false,
      extras: { msg: ApiErrorMessages[resType] }
    });
  }
  throw new Error(`an error occured when creating response with ${resType}`);
};

module.exports = createRes