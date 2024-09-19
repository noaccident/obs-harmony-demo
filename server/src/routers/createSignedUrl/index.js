const getObsClient = require("../../utils/obsClient");

module.exports = [
    // 上传对象
    {
        path: "/put_object",
        method: "post",
        action: async (ctx, next) => {
            console.log(`上传对象 入参: ${JSON.stringify(ctx.request.body)}`);

            const { Bucket, Key } = ctx.request.body;
            const obsClient = await getObsClient();
            const result = await obsClient.createSignedUrlSync({
                Method: "PUT",
                Bucket,
                Key,
            });

            console.log(`上传对象 结果: ${JSON.stringify(result)}`);
            ctx.response.body = result;
            await next();
        }
    }
]