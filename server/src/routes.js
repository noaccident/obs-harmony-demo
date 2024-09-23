const CreateSignedUrl = require('./routers/createSignedUrl');

/**
 * All application routes.
 */
const AppRoutes = [
    ...CreateSignedUrl
]

module.exports = AppRoutes;