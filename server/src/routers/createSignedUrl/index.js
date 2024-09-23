const mime = require('mime-types');
require('dotenv').config();
const getObsClient = require("../../utils/obsClient");

module.exports = [
    {
        path: "/get_sign_url",
        method: "post",
        action: async (ctx, next) => {
            console.log(`入参: ${JSON.stringify(ctx.request.body)}`);

            const { fileName, headers, method } = ctx.request.body;
            if (headers && !headers['Content-Type']) {
                headers['Content-Type'] = mime.lookup(fileName)
            }
            const obsClient = await getObsClient();
            const result = await obsClient.createSignedUrlSync({
                Method: method,
                Bucket: process.env.Bucket,
                Key: fileName,
                Headers: headers
            });

            console.log(`结果: ${JSON.stringify(result)}`);
            ctx.response.body = result;
            await next();
        }
    }
]