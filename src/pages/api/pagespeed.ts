import type { APIRoute } from "astro";
import { db, Query } from 'astro:db';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const web_page_url = url.searchParams.get("web_page_url");
  const strategy = url.searchParams.get("strategy") || "mobile";

  if (!web_page_url) {
    return new Response(JSON.stringify({ message: "Please provide a URL." }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const normalizedUrl = web_page_url.startsWith('http://') || web_page_url.startsWith('https://') ? web_page_url : `https://${web_page_url}`;
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(normalizedUrl)}&strategy=${strategy}&key=${import.meta.env.PAGESPEED_API_KEY}`;

  try {
    const dbPromise = db.insert(Query).values({ web_page_url: normalizedUrl });
    const fetchPromise = fetch(apiUrl);

    const [_, apiResponse] = await Promise.all([dbPromise, fetchPromise]);

    if (!apiResponse.ok) {
      throw new Error(`Google PageSpeed Insights API responded with status ${apiResponse.status}`);
    }

    const responseData = await apiResponse.json() as any;

    const { lighthouseResult, id } = responseData;
    const { categories, audits } = lighthouseResult || {};
    const perf = categories?.performance?.score || 0;

    if (!audits) {
      throw new Error("Failed to parse data from Google PageSpeed Insights API");
    }

    return new Response(JSON.stringify({
      message: "Success!",
      url: id,
      perf,
      audits,
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to fetch data from Google PageSpeed Insights API",
        error: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
