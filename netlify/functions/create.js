const supabase = require("./supabaseClient");

function generateCode(length = 6) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

exports.handler = async (event) => {
  // ✅ Allow only POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const { longUrl } = JSON.parse(event.body);

    if (!longUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "URL required" }),
      };
    }

    let code;
    let inserted = false;

    // ✅ Handle rare collisions (retry max 5 times)
    for (let i = 0; i < 5; i++) {
      code = generateCode();

      const { error } = await supabase.from("urls").insert([
        {
          short_code: code,
          long_url: longUrl,
        },
      ]);

      if (!error) {
        inserted = true;
        break;
      }
    }

    if (!inserted) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to generate unique code" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ code }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};