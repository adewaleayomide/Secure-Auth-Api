export const hstsOptions = {
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true, // Apply HSTS to all subdomains
    preload: true // Allow the site to be included in browsers' HSTS preload lists
};