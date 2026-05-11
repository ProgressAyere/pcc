// EmailJS Configuration
// Get these values from https://dashboard.emailjs.com/
// Store actual values in .env file (NOT in this file for security)

export const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
};

// WhatsApp Configuration
export const WHATSAPP_CONFIG = {
  PHONE_NUMBER: process.env.REACT_APP_WHATSAPP_PHONE,
  LINK: process.env.REACT_APP_WHATSAPP_LINK,
};
