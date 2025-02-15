import fs from "fs";
import path from "path";

export async function GET() {
  const pagesDirectory = path.join(process.cwd(), "app");
  const pageFiles = fs.readdirSync(pagesDirectory);

  const pages = pageFiles
    .filter((file) => file.endsWith(".js") || file.endsWith(".tsx"))
    .map((file) => `/${file.replace(/\\.[^.]*$/, "")}`);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) => `
        <url>
          <loc>https://askgurudev.in${page}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>`
        )
        .join("")}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
