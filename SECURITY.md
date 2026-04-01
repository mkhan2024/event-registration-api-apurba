# Security Configuration

## Helmet.js

I added Helmet to set up security headers automatically. It helps stop stuff like clickjacking, MIME sniffing, and showing what server we are using. I made it relaxed for development and stricter for production.

Here is how it is used in 'src/app.ts':

```typescript
app.use(getHelmetConfig());

Sources:
https://expressjs.com/en/advanced/best-practice-security.html
https://blog.logrocket.com/using-helmet-node-js-secure-application/

CORS:
I added CORS so my frontend can talk to the backend without problems. In development I kept it open for easy testing, but in production I locked it down to only allowed websites.
Here is how it is used in src/app.ts (right after Helmet):
TypeScriptapp.use(getCorsConfig());

Sources:
https://expressjs.com/en/resources/middleware/cors.html
https://www.stackhawk.com/blog/nodejs-cors-guide-what-it-is-and-how-to-enable-it