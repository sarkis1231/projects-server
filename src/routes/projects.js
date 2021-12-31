const { readFile, writeFile } = require("../helpers/index");

const userRoutes = (app, fs) => {
  app.get("/", (_, res) => {
    res.status(200).send("Welcome to projects server");
  });

  // READ
  app.get("/projects", (_, res) => {
    readFile(
      fs,
      (data) => {
        res.send(data);
      },
      true
    );
  });

  app.get("/projects/:id", (req, res) => {
    const projectId = req.params["id"];

    readFile(
      fs,
      (data) => {
        const project = data.find(({ id }) => id === projectId);
        res.status(200).send(project);
      },
      true
    );
  });

  // READ
  app.get("/projects", (_, res) => {
    readFile(
      fs,
      (data) => {
        res.send(data);
      },
      true
    );
  });

  // CREATE
  app.post("/projects", (req, res) => {
    readFile(
      fs,
      (data) => {
        console.log(data);
        // Note: this needs to be more robust for production use.
        // e.g. use a UUID or some kind of GUID for a unique ID value.
        const newProjectId = Date.now().toString();
        const project = { ...req.body, id: newProjectId, completed: false };
        // add the new project
        data = [...data, project];
        writeFile(fs, JSON.stringify(data, null, 2), () => {
          res.status(200).send("new user added");
        });
      },
      true
    );
  });

  // UPDATE
  app.patch("/projects/:id", (req, res) => {
    readFile(
      fs,
      (data) => {
        // add the new project
        const projectId = req.params["id"];
        const project = data.find(({ id }) => id === projectId);
        const { title, details, completed } = req.body;

        if (!project) {
          res.status(404).send("Wrong project id");
        }

        if (typeof completed !== "undefined") {
          project.completed = completed;
        }

        if (!!details) {
          project.details = details;
        }

        if (!!title) {
          project.title = title;
        }

        writeFile(fs, JSON.stringify(data, null, 2), () => {
          res.status(200).send(`Project id:${projectId} updated`);
        });
      },
      true
    );
  });

  // DELETE
  app.delete("/projects/:id", (req, res) => {
    readFile(
      fs,
      (data) => {
        const projectId = req.params["id"];
        const project = data.find(({ id }) => id === projectId);
        if (project === undefined) {
          res.status(404).send("This project doesn't exist");
        }
        const filteredProjetcs = data.filter(({ id }) => id !== projectId);

        writeFile(fs, JSON.stringify(filteredProjetcs, null, 2), () => {
          res.status(200).send(`users id:${projectId} removed`);
        });
      },
      true
    );
  });
};

module.exports = userRoutes;
