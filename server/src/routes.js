const InitRouter = require('./routers/init');
const CreateSignedUrl = require('./routers/createSignedUrl');

/**
 * All application routes.
 */
const AppRoutes = [
    ...InitRouter,
    ...CreateSignedUrl
]

module.exports = AppRoutes;