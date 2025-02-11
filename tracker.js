// Utility to detect browser name
const getBrowserName = () => {
  const userAgent = navigator.userAgent;

  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Edg')) return 'Edge';
  if (userAgent.includes('Opera') || userAgent.includes('OPR')) return 'Opera';
  if (userAgent.includes('MSIE') || userAgent.includes('Trident')) return 'Internet Explorer';

  return 'Unknown Browser';
};

// Get scroll depth with percentage and user-friendly terms
const getScrollDepth = () => {
  const scrollTop = window.scrollY; // Current scroll position
  const windowHeight = window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;

  const scrollPercentage = Math.min(
    ((scrollTop + windowHeight) / pageHeight) * 100,
    100
  ).toFixed(2);

  let depthLabel = '';

  if (scrollPercentage < 25) depthLabel = 'Low';
  else if (scrollPercentage < 50) depthLabel = 'Medium';
  else if (scrollPercentage < 75) depthLabel = 'High';
  else depthLabel = 'Complete';

  return `${depthLabel} (${scrollPercentage}%)`;
};

// Collect basic data (non-sensitive)
const collectData = () => {
  return {
    timestamp: new Date(new Date().toISOString()).toLocaleString(),
    pageUrl: window.location.href,
    referrer: document.referrer,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    deviceType: navigator.userAgentData?.mobile ? 'Mobile' : 'Desktop',
    language: navigator.language,
    browser: getBrowserName(),
    utmParams: parseUTMParams(),
    timeOnPage: 0,
    scrollDepth: getScrollDepth(),
  };
};

// Parse UTM parameters (if present in URL)
const parseUTMParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || null,
    utm_medium: params.get('utm_medium') || null,
    utm_campaign: params.get('utm_campaign') || null,
  };
};

// Send data to backend API
const sendDataToBackend = async (data) => {
  console.log(data);

  try {
    const response = await fetch('https://faaizmahmood-portfolio-server-392421210179.herokuapp.com/api/track', { //http://localhost:3000/api/track
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log('Data sent:', await response.json());
  } catch (error) {
    console.error('Error sending data:', error);
  }
};

// Track initial page visit
let sessionStart = Date.now();
let data = collectData();

console.log(data);

// Update timeOnPage and scrollDepth before user leaves
window.addEventListener('beforeunload', () => {
  data.timeOnPage = Math.floor((Date.now() - sessionStart) / 1000); // Time in seconds
  data.scrollDepth = getScrollDepth();
  sendDataToBackend(data);
});
