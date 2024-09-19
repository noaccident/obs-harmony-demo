const catchError = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.log(err);

        if (err.errorCode) {
            console.log('catch error');
            ctx.response.body = {
                status: 400,
                body: `${err.stack}`
            };
        }
    }
}
module.exports = catchError;