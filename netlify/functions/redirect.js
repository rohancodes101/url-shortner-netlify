const supabase = require("./supabaseClient");

exports.handler = async (event) => {
  try {
    const path = event.path;
    const code = path.split("/").pop();

    // ignore root
    if (!code || code === "") {
      return {
        statusCode: 200,
        body: "URL Shortener API",
      };
    }

    const { data, error } = await supabase
      .from("urls")
      .select("long_url")
      .eq("short_code", code)
      .single();

    if (error || !data) {
      return {
        statusCode: 404,
        body: "Not found",
      };
    }

    return {
      statusCode: 302,
      headers: {
        Location: data.long_url,
      },
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message,
    };
  }
};