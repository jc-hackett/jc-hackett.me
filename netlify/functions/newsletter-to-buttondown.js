exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY || process.env.BUTTONDOWN_API_TOKEN;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: "Missing BUTTONDOWN_API_KEY or BUTTONDOWN_API_TOKEN"
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      body: "Invalid JSON payload"
    };
  }

  // Netlify form webhooks send shape: { payload: { form_name, data: { ... } } }
  const formName = payload?.payload?.form_name || payload?.form_name || payload?.form || "";
  const data = payload?.payload?.data || payload?.data || payload;
  const email = (data?.email || "").trim().toLowerCase();

  if (formName && formName !== "newsletter") {
    return {
      statusCode: 200,
      body: "Ignored non-newsletter form"
    };
  }

  if (!email) {
    return {
      statusCode: 400,
      body: "Missing email"
    };
  }

  const subscribeResponse = await fetch("https://api.buttondown.email/v1/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${apiKey}`
    },
    body: JSON.stringify({
      email,
      metadata: {
        source: "netlify-newsletter-form"
      }
    })
  });

  if (subscribeResponse.ok) {
    return {
      statusCode: 200,
      body: "Subscribed"
    };
  }

  const errorText = await subscribeResponse.text();

  // Buttondown returns 4xx when already subscribed; treat as success to avoid retries.
  if (subscribeResponse.status === 400 || subscribeResponse.status === 409) {
    if (/already|exists|subscribed/i.test(errorText)) {
      return {
        statusCode: 200,
        body: "Already subscribed"
      };
    }
  }

  return {
    statusCode: 502,
    body: `Buttondown error (${subscribeResponse.status}): ${errorText}`
  };
};
