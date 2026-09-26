const express = require("express");
const multer = require("multer");
const path = require("path");

const userRoutes = require("./routes/userRoutes");

const upload = multer({
    dest: path.join(__dirname, "uploads"),
});

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/api/debug", (req, res) => {
    res.json({
        client: req.headers["x-client"],
        version: req.headers["x-version"],
        authorization: req.headers.authorization,
    });
});

app.get("/api/slow", async (req, res) => {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    res.json({
        message: "Slow request completed",
    });
});

app.get("/api/protected", (req, res) => {
    const authorization = req.headers.authorization;
    if (authorization !== "Bearer valid-access-token") {
        return res.status(401).json({
            message: "Access token expired",
        });
    }
    res.json({
        message: "Protected data",
        secret: "This is protected",
    });
});

app.post("/api/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken !== "valid-refresh-token") {
        return res.status(401).json({
            message: "Invalid refresh token",
        });
    }
    res.json({
        accessToken: "valid-access-token",
    });
});

app.post("/api/upload", upload.single("file"), (req, res) => {
    console.log(req.file);
    res.json({
        message: "File uploaded successfully",
        file: req.file,
    });
});

app.get("/api/download", (req, res) => {
    const filePath = path.resolve("./uploads/test.txt");
    res.download(filePath, "downloaded-test.txt");
});

app.post(
    "/api/profile",
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "documents", maxCount: 5 },
    ]),
    (req, res) => {
        console.log("Body:", req.body);
        console.log("Files:", req.files);

        res.json({
            message: "Profile uploaded successfully",
            body: req.body,
            files: req.files,
        });
    },
);

module.exports = app;
