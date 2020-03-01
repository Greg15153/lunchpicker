import { initAuth0 } from '@auth0/nextjs-auth0'
import getConfig from 'next/config'

// TODO: FIGURE OUT CONFIGURATION
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export default initAuth0({
    domain: publicRuntimeConfig.AUTH0_DOMAIN,
    clientId: publicRuntimeConfig.AUTH0_CLIENT_ID,
    clientSecret: serverRuntimeConfig.AUTH0_CLIENT_SECRET,
    audience: publicRuntimeConfig.API_AUDIENCE,
    scope: publicRuntimeConfig.AUTH0_SCOPE,
    redirectUri: publicRuntimeConfig.REDIRECT_URI,
    postLogoutRedirectUri: publicRuntimeConfig.POST_LOGOUT_REDIRECT_URI,
    session: {
        // The secret used to encrypt the cookie.
        cookieSecret: serverRuntimeConfig.SESSION_COOKIE_SECRET,
        // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
        cookieLifetime: serverRuntimeConfig.SESSION_COOKIE_LIFETIME,
        // (Optional) SameSite configuration for the session cookie. Defaults to 'lax', but can be changed to 'strict' or 'none'. Set it to false if you want to disable the SameSite setting.
        cookieSameSite: 'lax',
        // (Optional) Store the id_token in the session. Defaults to false.
        storeIdToken: false,
        // (Optional) Store the access_token in the session. Defaults to false.
        storeAccessToken: true,
        // (Optional) Store the refresh_token in the session. Defaults to false.
        storeRefreshToken: false
    },
    oidcClient: {
        // (Optional) Configure the timeout in milliseconds for HTTP requests to Auth0.
        httpTimeout: 2500,
        // (Optional) Configure the clock tolerance in milliseconds, if the time on your server is running behind.
        clockTolerance: 10000
    }
})
