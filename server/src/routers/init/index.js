const ObsClient = require("esdk-obs-nodejs");

module.exports = [
    // 初始化客户端
    {
        path: "/set_default_sdk_init",
        method: "post",
        action: async (ctx, next) => {
            global.obsClient = new ObsClient({
                access_key_id: "",
                secret_access_key: "",
                server: "obs.cn-north-4.myhuaweicloud.com"
            });
            ctx.response.body = {
                status: 200,
            };
            await next();
        }
    }
]