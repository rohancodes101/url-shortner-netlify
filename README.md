# URL Shortener (Netlify)

A simple URL shortener built using Netlify Functions. It allows users to generate short links that redirect to original URLs.

## 🚀 Features

* Shorten long URLs
* Redirect using short links
* Serverless backend with Netlify Functions
* Easy deployment

## 🛠️ Tech Stack

* HTML, CSS, JavaScript
* Netlify Functions (AWS Lambda)

## 📁 Project Structure

```
/public
  index.html
  script.js
/netlify/functions
  shorten.js
  redirect.js
```

## ⚙️ Setup Instructions

1. Clone the repository:

```
git clone https://github.com/your-username/url-shortener-netlify.git
cd url-shortener-netlify
```

2. Install Netlify CLI:

```
npm install -g netlify-cli
```

3. Run locally:

```
netlify dev
```

4. Deploy:

```
netlify deploy --prod
```

## 🔗 How it Works

* User enters a URL
* `shorten.js` generates a unique ID
* ID is mapped to the original URL
* Visiting `/api/redirect?id=XYZ` redirects to the original URL

## 📌 Note

For production, use a database (like Firebase, Supabase, or MongoDB) instead of in-memory storage.

## 📄 License

MIT
