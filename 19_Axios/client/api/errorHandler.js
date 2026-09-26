const axios = require("axios");

function handleApiError(err, controller) {
    console.error(err);

    if (axios.isAxiosError(err)) {
        console.log("This is an Axios error");
    } else {
        console.error("Unknown error:", err);
        return;
    }

    if (err.response) {
        // server responding with error
        console.error("API Error:", err.response.status, err.response.data);

        return;
    }

    if (err.request) {
        // request sent but no response
        console.error("No response received from server");
        return;
    }

    if (err.message) {
        // something went wrong while creating the request
        console.error("Request setup error:", err.message);
    }

    if (controller.signal.aborted) {
        console.log("Request was cancelled");
    }

    if (err.code === "ECONNABORTED") {
        // timeout based error
        console.log("Request timed out");
    }
}

module.exports = { handleApiError };
