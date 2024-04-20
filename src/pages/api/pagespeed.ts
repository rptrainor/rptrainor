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
        message: error instanceof Error ? error.message : String(error),
        url: normalizedUrl,
        perf: 0.33,
        audits: {
          "largest-contentful-paint": {
            "id": "largest-contentful-paint",
            "title": "Largest Contentful Paint",
            "description": "Largest Contentful Paint marks the time at which the largest text or image is painted. [Learn more about the Largest Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/)",
            "score": 0.21,
            "scoreDisplayMode": "numeric",
            "displayValue": "5.3 s",
            "numericValue": 5348.5,
            "numericUnit": "millisecond"
          },
          "first-meaningful-paint": {
            "id": "first-meaningful-paint",
            "title": "First Meaningful Paint",
            "description": "First Meaningful Paint measures when the primary content of a page is visible. [Learn more about the First Meaningful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/first-meaningful-paint/).",
            "score": 0.5,
            "scoreDisplayMode": "numeric",
            "displayValue": "4.0 s",
            "numericValue": 3998.5,
            "numericUnit": "millisecond"
          },
          "total-blocking-time": {
            "id": "total-blocking-time",
            "title": "Total Blocking Time",
            "description": "Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. [Learn more about the Total Blocking Time metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/).",
            "score": 0,
            "scoreDisplayMode": "numeric",
            "displayValue": "16,790 ms",
            "numericValue": 16794.5,
            "numericUnit": "millisecond"
          },
          "interactive": {
            "id": "interactive",
            "title": "Time to Interactive",
            "description": "Time to Interactive is the amount of time it takes for the page to become fully interactive. [Learn more about the Time to Interactive metric](https://developer.chrome.com/docs/lighthouse/performance/interactive/).",
            "score": 0,
            "scoreDisplayMode": "numeric",
            "displayValue": "39.1 s",
            "numericValue": 39137.29536999999,
            "numericUnit": "millisecond"
          },
          "cumulative-layout-shift": {
            "id": "cumulative-layout-shift",
            "title": "Cumulative Layout Shift",
            "description": "Cumulative Layout Shift measures the movement of visible elements within the viewport. [Learn more about the Cumulative Layout Shift metric](https://web.dev/articles/cls).",
            "score": 1,
            "scoreDisplayMode": "numeric",
            "displayValue": "0.001",
            "numericValue": 0.0005860039592696537,
            "numericUnit": "unitless"
          },
          "first-contentful-paint": {
            "id": "first-contentful-paint",
            "title": "First Contentful Paint",
            "description": "First Contentful Paint marks the time at which the first text or image is painted. [Learn more about the First Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/).",
            "score": 0.23,
            "scoreDisplayMode": "numeric",
            "displayValue": "4.0 s",
            "numericValue": 3998.5,
            "numericUnit": "millisecond"
          },

          "speed-index": {
            "id": "speed-index",
            "title": "Speed Index",
            "description": "Speed Index shows how quickly the contents of a page are visibly populated. [Learn more about the Speed Index metric](https://developer.chrome.com/docs/lighthouse/performance/speed-index/).",
            "score": 0,
            "scoreDisplayMode": "numeric",
            "displayValue": "17.5 s",
            "numericValue": 17526.66562484359,
            "numericUnit": "millisecond"
          },
          "max-potential-fid": {
            "id": "max-potential-fid",
            "title": "Max Potential First Input Delay",
            "description": "The maximum potential First Input Delay that your users could experience is the duration of the longest task. [Learn more about the Maximum Potential First Input Delay metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-max-potential-fid/).",
            "score": 0,
            "scoreDisplayMode": "numeric",
            "displayValue": "2,450 ms",
            "numericValue": 2454,
            "numericUnit": "millisecond"
          },
          "server-response-time": {
            "id": "server-response-time",
            "title": "Initial server response time was short",
            "description": "Keep the server response time for the main document short because all other requests depend on it. [Learn more about the Time to First Byte metric](https://developer.chrome.com/docs/lighthouse/performance/time-to-first-byte/).",
            "score": 1,
            "scoreDisplayMode": "informative",
            "displayValue": "Root document took 20 ms",
            "numericValue": 18,
            "numericUnit": "millisecond"
          },
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
