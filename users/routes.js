import * as dao from './dao.js';
let currentUser = null;

export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = req.body;
    delete user._id;
    const newUser = await dao.createUser(user);
    res.json(newUser);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.id);
    res.json(status);
  };

  const findAllUsers = async (req, res) => {
    const { role } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.id);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    delete user._id;
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      req.session["currentUser"] = user;
    }
    const status = await dao.updateUser(id, user);
    res.json(status);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: 'Username already taken' });
    } else {
      const newUser = await dao.createUser(req.body);
      req.session["currentUser"] = newUser;
      res.json(newUser);
    }
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.status(401).send("Invalid credentials");
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
  const updateFirstName = async (req, res) => {
    const id = req.params.id;
    const newFirstName = req.params.newFirstName;
    const status = await dao.updateUser(id, { firstName: newFirstName });
    res.json(status);
  };



  app.post('/api/users', createUser);
  app.get('/api/users', findAllUsers);
  app.get('/api/users/:id', findUserById);
  app.put('/api/users/:id', updateUser);
  app.delete('/api/users/:id', deleteUser);
  app.post('/api/users/signup', signup);
  app.post('/api/users/signin', signin);
  app.post('/api/users/signout', signout);
  app.post('/api/users/profile', profile);
  app.get("/api/users/updateFirstName/:id/:newFirstName", updateFirstName);
}