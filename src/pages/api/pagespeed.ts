// src/pages/api/pagespeed.ts

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request }) => {
  const url = new URL(request.url);
  const websiteUrl = url.searchParams.get('url');

  if (!websiteUrl) {
    return new Response(
      JSON.stringify({ error: 'Please provide a URL as a query parameter' }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // Construct the Google PageSpeed Insights API URL
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
    websiteUrl
  )}&key=${import.meta.env.PAGESPEED_API_KEY}`;

  try {
    // Fetch the data from the Google PageSpeed Insights API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Return the JSON response
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    return new Response(
      JSON.stringify({ error: 'Failed to fetch data from Google PageSpeed Insights API' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

}
