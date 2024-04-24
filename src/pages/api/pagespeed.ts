import type { APIRoute } from "astro";
import { db, Query } from 'astro:db';

// Utility to fetch data as a string from a URL
async function fetchString(apiUrl: string): Promise<string> {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'X-WPT-API-KEY': import.meta.env.WEBPAGETEST_API_KEY
    }
  });
  if (response.ok) return response.text();
  throw new Error(`Error fetching ${apiUrl}: ${response.status} ${response.statusText}`);
}

// Function to start a WebPageTest and return the test ID and JSON URL
async function startWptTest(url: string, strategy: string) {
  const isMobile = strategy === 'mobile' ? '1' : '0';
  const apiUrl = new URL('https://www.webpagetest.org/runtest.php');
  apiUrl.searchParams.append('url', url);
  apiUrl.searchParams.append('f', 'json');
  apiUrl.searchParams.append('lighthouse', '1');  // Enable Lighthouse testing
  apiUrl.searchParams.append('mobile', isMobile);      // Use mobile settings
  const responseText = await fetchString(apiUrl.href);
  const response = JSON.parse(responseText);
  if (response.statusCode !== 200) {
    throw new Error(`Unexpected status code ${response.statusCode} ${response.statusText}`);
  }
  return {
    testId: response.data.testId,
    jsonUrl: response.data.jsonUrl,
  };
}

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const web_page_url = url.searchParams.get("web_page_url");
  const strategy = url.searchParams.get("strategy");

  if (!web_page_url) {
    return new Response(JSON.stringify({ message: "Please provide a URL." }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const normalizedUrl = web_page_url.startsWith('http://') || web_page_url.startsWith('https://') ? web_page_url : `https://${web_page_url}`;

  try {
    if (import.meta.env.DEV) {
      throw new Error("This endpoint is not available in development.");
    }
    await db.insert(Query).values({ web_page_url: normalizedUrl });
    const { testId, jsonUrl } = await startWptTest(normalizedUrl, strategy || 'mobile');

    return new Response(JSON.stringify({
      message: "Test initiated successfully!",
      testId,
      resultsUrl: jsonUrl
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error instanceof Error ? error.message : String(error),
        error: String(error),
        url: normalizedUrl
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
