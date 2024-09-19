const axios = require('axios');
const IAM_ENDPOINT = "https://iam.myhuaweicloud.com";

// https://support.huaweicloud.com/intl/zh-cn/api-iam/iam_30_0001.html
const getIamToken = async () => {
    return axios({
        url: `${IAM_ENDPOINT}/v3/auth/tokens`,
        method: "POST",
        data: {
            "auth": {
                "identity": {
                    "methods": [
                        "password"
                    ],
                    "password": {
                        "user": {
                            "domain": {
                                "name": "IAMDomain"        //IAM用户所属账号名
                            },
                            "name": "IAMUser",             //IAM用户名
                            "password": "IAMPassword"      //IAM用户密码
                        }
                    }
                },
                "scope": {
                    "domain": {
                        "name": "IAMDomain"               //IAM用户所属账号名
                    }
                }
            }
        },
        headers: {
            "Content-Type": "application/json;charset=utf8"
        }
    })
}

// https://support.huaweicloud.com/intl/zh-cn/api-iam/iam_04_0002.html
const getSecurityToken = async (token, bucketName, objectPrefix) => {
    return axios({
        url: `${IAM_ENDPOINT}/v3.0/OS-CREDENTIAL/securitytokens`,
        method: "POST",
        data: {
            "auth": {
                "identity": {
                    "methods": [
                        "token"
                    ],
                    "token": {
                        "id": token,
                        "duration_seconds": "900"
                    },
                    // "policy": {
                    //     "Version": "1.1",
                    //     "Statement": [
                    //       {
                    //         "Effect": "Allow",
                    //         "Action": [
                    //           "obs:object:PutObject"
                    //         ],
                    //         "Resource": [
                    //           `OBS:*:*:object:${bucketName}/${objectPrefix}/*`
                    //         ],
                    //       }
                    //     ]
                    //   },
                }
            }
        }
        ,
        headers: {
            "Content-Type": "application/json;charset=utf8"
        }
    })
}

const getAKSK = async () => {
    const res = await getIamToken();
    const token = res.headers["x-subject-token"];
    console.log("get iam token success.")
    const { data: { credential } } = await getSecurityToken(token);
    return credential;
}

module.exports = getAKSK;