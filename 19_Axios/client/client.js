require("dotenv").config({ path: "../.env" });
const fs = require("fs");
const FormData = require("form-data");
const path = require("path");
const axios = require("axios");

const api = require("./api/apiClient");
const user = require("./api/userApi");
const { handleApiError } = require("./api/errorHandler");

// global axios headers
axios.defaults.headers.common["X-Client"] = "axios-lab";

// abort controller
const controller = new AbortController();

const cancelRequest = async () => {
    setTimeout(() => {
        controller.abort();
    }, 2000);
    const response9 = await axios.get(`${process.env.API_BASE_URL}/api/slow`, {
        signal: controller.signal,
    });
    console.log(response9.data);
};

const protectedRequest = async () => {
    try {
        const response = await api.get("/api/protected");
        console.log(response.data);
    } catch (error) {
        console.error(error.response?.data);
    }
};

const uploadRequest = async () => {
    const formData = new FormData();

    const filePath = path.join(__dirname, "./data/hello.txt");
    formData.append("file", fs.createReadStream(filePath));

    const response = await axios.post(
        `${process.env.API_BASE_URL}/api/upload`,
        formData,
        {
            headers: {
                ...formData.getHeaders(),
            },

            // progress bar
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    const percent = Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100,
                    );

                    console.log(`Upload: ${percent}%`);
                }
            },
        },
    );
    console.log(response.data);
};

const downloadResponse = async () => {
    const response = await api.get("/api/download", {
        // A text file can technically be treated as text: responseType: "arraybuffer"
        // But binary files shouldn't be treated as normal strings.
        responseType: "arraybuffer",

        // progress bar
        onDownloadProgress: (progressEvent) => {
            if (progressEvent.total) {
                const percent = Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100,
                );

                console.log(`Download: ${percent}%`);
            }
        },
    });
    fs.writeFileSync("./data/downloaded-test.txt", response.data);
    console.log("File downloaded");
};

const multiUpload = async () => {
    const formData = new FormData();
    formData.append("name", "David");
    formData.append("email", "david@example.com");
    formData.append("avatar", fs.createReadStream("./data/hello.txt"));
    formData.append(
        "documents",
        fs.createReadStream("./data/downloaded-test.txt"),
    );
    formData.append("documents", fs.createReadStream("./data/hello.txt"));

    const response = await api.post("/api/profile", formData, {
        headers: formData.getHeaders(),
        onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
                const percent = Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100,
                );

                console.log(`Upload: ${percent}%`);
            }
        },
    });
    console.log(response.data);
};

const main = async () => {
    // General request: axios.<method>(url [, data [, options]])
    try {
        // await cancelRequest();
        // await user();
        // await protectedRequest();
        // await uploadRequest();
        // await downloadResponse();
        await multiUpload();
    } catch (err) {
        handleApiError(err, TransformStreamDefaultController);
    }
};

main();
