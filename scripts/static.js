const secretId = process.env.TENCENT_SECRET_ID || ''; // 客户的secretId
const secretKey = process.env.TENCENT_SECRET_KEY || ''; // 客户的secretKey
const appId = process.env.TENCENT_APP_ID || ''; // 体验机器人的appkey

module.exports = {
    secretId,
    secretKey,
    appId
};
