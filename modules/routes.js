import Database from "../Database/index.js";

function ModuleRoutes(app) {
    // Retrieve modules for a specific course
    app.get("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const modules = Database.modules.filter((m) => m.course === cid);
        res.send(modules);
    });
    // Retrieve all modules
    app.get("/api/modules", (req, res) => {
        const modules = Database.modules;
        res.send(modules);
    });
    // Create a new module for a course
    app.post("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const newModule = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        Database.modules.push(newModule);
        res.send(newModule);
    });

    // Delete a module
    app.delete("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        const moduleIndex = Database.modules.findIndex((m) => m._id === mid);
        if (moduleIndex === -1) {
            res.sendStatus(404);
        } else {
            Database.modules.splice(moduleIndex, 1);
            res.sendStatus(200);
        }
    });

    // Update a module
    app.put("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        const moduleIndex = Database.modules.findIndex((m) => m._id === mid);
        if (moduleIndex === -1) {
            res.sendStatus(404);
        } else {
            Database.modules[moduleIndex] = {
                ...Database.modules[moduleIndex],
                ...req.body,
            };
            res.sendStatus(204);
        }
    });
}

export default ModuleRoutes;
