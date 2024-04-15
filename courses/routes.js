// import Database from "../Database/index.js";
import * as dao from "./dao.js";
function CourseRoutes(app) {
  app.get("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    const course = await dao.courses.find((c) => c._id === id);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.send(course);
  });

  app.put("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    const course = req.body;
    dao.courses = await dao.courses.map((c) =>
      c._id === id ? { ...c, ...course } : c
    );
    res.sendStatus(204);
  });

  app.delete("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    dao.courses = await dao.courses.filter((c) => c._id !== id);
    res.sendStatus(204);
  });

  app.post("/api/courses", async (req, res) => {
    const course = {
      ...req.body,
      _id: new Date().getTime().toString(),
    };
    await dao.courses.push(course);
    res.send(course);
  });

  app.get("/api/courses", async (req, res) => {
    const courses = await dao.courses;
    res.send(courses);
  });
}
export default CourseRoutes;
