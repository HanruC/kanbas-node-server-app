import Database from "../Database/index.js";

function AssignmentRoutes(app) {
  // Create a new assignment
  app.post("/api/assignments", (req, res) => {
    const newAssignment = {
      ...req.body,
      _id: new Date().getTime().toString(),
    };
    Database.assignments.push(newAssignment);
    res.send(newAssignment);
  });

  // Retrieve all assignments
  app.get("/api/assignments", (req, res) => {
    const assignments = Database.assignments;
    res.send(assignments);
  });

  // Update an assignment
  app.put("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const updatedAssignment = req.body;
    const assignmentIndex = Database.assignments.findIndex(
      (assignment) => assignment._id === id
    );
    if (assignmentIndex === -1) {
      res.sendStatus(404);
    } else {
      Database.assignments[assignmentIndex] = {
        ...Database.assignments[assignmentIndex],
        ...updatedAssignment,
      };
      res.sendStatus(204);
    }
  });

  // Delete an assignment
  app.delete("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const assignmentIndex = Database.assignments.findIndex(
      (assignment) => assignment._id === id
    );
    if (assignmentIndex === -1) {
      res.sendStatus(404);
    } else {
      Database.assignments.splice(assignmentIndex, 1);
      res.sendStatus(204);
    }
  });
}

export default AssignmentRoutes;