const fetch = require("node-fetch");

export default async (req, res) => {
  const backendUrl = "http://13.57.20.93:5000/"; // Replace with your actual backend URL
  const response = await fetch(backendUrl + req.url, {
    method: req.method,
    headers: req.headers,
    body: req.body,
  });

  const data = await response.text();
  res.status(response.status).send(data);
};
