import helmet from "helmet";

export const getHelmetConfig = () => {
    const isDev = process.env.NODE_ENV === "development";

    // basic config for our JSON API
    const baseConfig = {
        contentSecurityPolicy: false, // not needed for APIs
        hidePoweredBy: true,
        noSniff: true,
    };

    if (isDev) {
        // relaxed settings in development
        return helmet({
            ...baseConfig,
            hsts: false,
        });
    }

    // full security for production
    return helmet({
        ...baseConfig,
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
        },
        frameguard: { action: "deny" },
        referrerPolicy: { policy: "no-referrer" },
    });
};