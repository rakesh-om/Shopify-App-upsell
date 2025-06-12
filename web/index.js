// @ts-check
import express from "express";
import { join } from "path";
import { readFileSync } from "fs";
import serveStatic from "serve-static";
import dotenv from "dotenv";
// import { connectDB } from "./Backend/database/db.js"; // ✅ named import
import connectDB from "./Backend/database/db.js"; // ✅ Default import



import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import PrivacyWebhookHandlers from "./privacy.js";

// ✅ Load environment variables
dotenv.config();

// ✅ Connect MongoDB
connectDB();

const app = express();
const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT || "3000", 10);

// ✅ Set static frontend path
const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

// ✅ Shopify Authentication & Webhooks
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
);

// ✅ Middleware
app.use(express.json());
app.use("/api/*", shopify.validateAuthenticatedSession());

// ✅ API: Product Count Example (GraphQL)
app.get("/api/products/count", async (_req, res) => {
  try {
    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });

    const countData = await client.query({
      data: `{
        productsCount {
          count
        }
      }`,
    });

    res.status(200).send({ count: countData.body.data.productsCount.count });
  } catch (error) {
    console.error("❌ Error fetching product count:", error);
    res.status(500).send({ error: "Error fetching product count" });
  }
});

// ✅ API: Product Creator Example
app.post("/api/products", async (_req, res) => {
  try {
    await productCreator(res.locals.shopify.session);
    res.status(200).send({ success: true });
  } catch (error) {
    console.error("❌ Product creation failed:", error);
    res.status(500).send({ success: false, error: error.message });
  }
});

// ✅ Serve frontend build (React + Vite)
app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res) => {
  const html = readFileSync(join(STATIC_PATH, "index.html"))
    .toString()
    .replace("%VITE_SHOPIFY_API_KEY%", process.env.SHOPIFY_API_KEY || "");

  res.status(200).set("Content-Type", "text/html").send(html);
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
