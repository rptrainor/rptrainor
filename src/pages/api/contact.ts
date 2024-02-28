// src/pages/api/contact.ts

import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email-address') as string;
  // Add other form fields as necessary

  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.LOOPS_EMAIL}`, // Replace <token> with your actual API token
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      // Add other fields as necessary
      subscribed: true, // Assuming users are subscribing
      // Define or omit source, userGroup, userId based on your requirements
    }),
  };

  try {
    const response = await fetch('https://app.loops.so/api/v1/contacts/create', options);
    if (!response.ok) {
      throw new Error('Failed to submit form');
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to submit form' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
