const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const AppRoutes = require('./src/routes');
const catchError = require('./src/middleware/catchError');
const app = new Koa();
const router = new Router({ prefix: '/js' });
app.use(catchError);

// register all application routers
AppRoutes.forEach(route => router[route.method](route.path, route.action));

// run app
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
    console.log("koa applicatin is up and running on port 3000");
})