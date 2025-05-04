const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const CLICKUP_TOKEN = process.env.CLICKUP_TOKEN;

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { name, description, status = "BACKLOG", list_id = "901305833574", priority = 2, tags = [] } = req.body;

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