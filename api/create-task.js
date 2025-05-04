const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const CLICKUP_TOKEN = process.env.CLICKUP_TOKEN;

  console.log("Token:", CLICKUP_TOKEN); // DEBUG: Veja se a variável está sendo lida

  if (!CLICKUP_TOKEN) {
    return res.status(500).send("Token not found in environment.");
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const {
    name,
    description,
    status = "BACKLOG",
    list_id = "901305833574",
    priority = 2,
    tags = []
  } = req.body;

  const response = await fetch(`https://api.clickup.com/api/v2/list/${list_id}/task`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + CLICKUP_TOKEN,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, description, status, priority, tags })
  });

  const data = await response.json();
  res.status(response.status).json(data);
};
