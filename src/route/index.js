const userRoute = require('./user');
const taskRoute = require('./task');
const categoryRoute = require('./category');

function route(app) {
    app.use('/categories',categoryRoute)
    app.use('/users',userRoute),
    app.use('/tasks',taskRoute)
}

module.exports = route;