const api = require("./apiClient.js");

const getRequest = async () => {
    // 1.) GET Request: axios.get(url [, options]);
    const response1 = api.get("/api/users");

    // req.query = {page: 2, limit: 10}
    // updated url
    const response2 = api.get("/api/users?role=user&limti=5");

    // req.query = {page: 2, limit: 10}
    // using options
    const response3 = api.get("/api/users", {
        params: {
            role: "user",
            limit: "5",
        },

        // request configuration
        headers: {
            Authorization: "Bearer token",

            // custom headers
            "X-Client": "axios-lab",
            "X-Version": "1.0",
        },
        timeout: 5000,

        // transform response: modify the response data
        // Why JSON.parse()?
        // transformResponse operates on the response data during Axios's transformation pipeline.
        // Depending on the response and Axios configuration, the incoming value can be a JSON string before the normal JSON parsing occurs. we're explicitly parsing it here
        transformResponse: [
            (data) => {
                const parsed = JSON.parse(data);
                return parsed.map((user) => ({
                    ...user,
                    displayName: `${user.name} (${user.role})`,
                }));
            },
        ],
    });

    const response4 = api.get("/api/debug", {
        headers: {
            "X-Client": "axios-lab",
            "X-Version": "1.0",
            Authorization: "Bearer test-token",
        },
    });

    // simultaneous requests
    const result = await Promise.all([
        response1,
        response2,
        response3,
        response4,
    ]);
    result.forEach((res) => {
        // returns the data received from the server
        console.log(res.data);
    });
};

const postRequest = async () => {
    // 2.) POST Request: axios.post(url, data [, options])
    const response5 = await api.post("/api/users", {
        // req.body
        name: "David",
        role: "user",
    });
    console.log(response5.data);
};

const putRequest = async () => {
    // 3.) PUT Request: (replace / update resource): axios.put(url [, data [, options]]);
    const response6 = await api.put("/api/users/1", {
        name: "Alice Updated",
        role: "user",
    });
    console.log(response6.data);
};

const patchRequest = async () => {
    // 4.) PATCH Request: axios.patch(url [, data [, options]]);
    const response7 = await api.patch("/api/users/1", {
        role: "admin",
    });
    console.log(response7.data);
};

const deleteRequest = async () => {
    // 5.) DELETE Request: axios.delete(url [, options]);
    const response8 = await api.delete("/api/users/2");
    console.log(response8.data);
};

async function user() {
    // sequential requests
    await getRequest();
    await postRequest();
    await putRequest();
    await patchRequest();
    await deleteRequest();
}

module.exports = user;
