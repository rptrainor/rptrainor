// partytown.config.mjs
export default {
  resolveUrl(url) {
    // Resolve the URL to your Posthog script here
    // This can be your custom script or a URL from Posthog's CDN
  },
  forward: ['posthog.*'], // Forward Posthog API calls to Partytown web worker
};
