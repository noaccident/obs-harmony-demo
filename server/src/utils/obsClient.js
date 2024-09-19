const ObsClient = require("esdk-obs-nodejs");
const getAKSK = require("./iam");
const dayjs = require("dayjs");

async function getObsClient() {
    // TODO 判断是否过期
    console.log(global.obsClient)
    console.log(dayjs().isBefore(dayjs(global.expires)))
    // if (global.obsClient && dayjs().isBefore(dayjs(global.expires))) {
    //     return global.obsClient;
    // }
    console.log("update ak and sk")
    const { access, secret, securitytoken, expires_at } = await getAKSK();
    global.obsClient = new ObsClient({
        access_key_id: access,
        secret_access_key: secret,
        security_token: securitytoken,
        server: "obs.cn-north-4.myhuaweicloud.com"
    });
    global.expires = expires_at;
    return global.obsClient;
}


module.exports = getObsClient;
