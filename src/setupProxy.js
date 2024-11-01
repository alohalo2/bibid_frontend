const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://bibid.store",
            changeOrigin: true,
        })
    );
    // app.use(
    //     "/api2",
    //     createProxyMiddleware({
    //         target: "http://localhost:3070",
    //         changeOrigin: true,
    //     })
    // );
};