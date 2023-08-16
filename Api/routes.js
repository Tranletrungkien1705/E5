const routes = (app, controllerName)=>{
    app.route("/ticket/listing")
    .get(controllerName.List);
    app.route("/ticket/Add")
    .get(controllerName.Add);
    app.route("/ticket/Add")
    .post(controllerName.AddNew)
}
module.exports = routes;