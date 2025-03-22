import { createServer } from "http";
const PORT = process.env.PORT;

const users = [
  { id: 1, fullName: "John Doe" },
  { id: 2, fullName: "Jane Doe" },
  { id: 3, fullName: "Jim Doe" },
];

// Logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// JSON middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};

// Route handler for GET /api/users
const getUsersHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};

// Route handler for GET /api/users/:id
const getUserByIdHandler = (req, res) => {
  const id = req.url.split("/")[3];
  const user = users.find((user) => user.id === Number(id));
  if (user) {
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(user));
    res.end();
  } else {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "User not found" }));
    res.end();
  }
};

// Route handler for POST /api/users
const createUserHandler = (req, res) => {
  let body = "";
  // Listen for data
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const newUser = JSON.parse(body);
    users.push(newUser);
    res.statusCode = 201;
    res.write(JSON.stringify(newUser));
    res.end();
  });
};

// Not Found handler
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: "Route not found" }));
  res.end();
};

const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === "/api/users" && req.method === "GET") {
        getUsersHandler(req, res);
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === "GET"
      ) {
        getUserByIdHandler(req, res);
      } else if (req.url === "/api/users" && req.method === "POST") {
        createUserHandler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// if (req.url === "/api/users" && req.method === "GET") {
//   res.setHeader("Content-Type", "application/json");
//   res.write(JSON.stringify(users));
//   res.end();
// } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
//   const id = req.url.split("/")[3];
//   const user = users.find((user) => user.id === Number(id));
// } else {
//   res.setHeader("Content-Type", "application/json");
// }
