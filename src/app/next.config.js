/* eslint-disable */
const withCss = require('@zeit/next-css')
const dotenv = require('dotenv')

const env = process.env.NODE_ENV

if (env && env.toLowerCase() !== 'production') {
    const path = `${__dirname}/.env${env ? `.${env}` : ''}`
    dotenv.config({ path })
}

module.exports = withCss({
    webpack: (config, { isServer }) => {
        if (isServer) {
            const antStyles = /antd\/.*?\/style\/css.*?/
            const origExternals = [...config.externals]
            config.externals = [
                (context, request, callback) => {
                    if (request.match(antStyles)) return callback()
                    if (typeof origExternals[0] === 'function') {
                        origExternals[0](context, request, callback)
                    } else {
                        callback()
                    }
                },
                ...(typeof origExternals[0] === 'function' ? [] : origExternals)
            ]

            config.module.rules.unshift({
                test: antStyles,
                use: 'null-loader'
            })
        }
        return config
    },
    serverRuntimeConfig: {
        AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
        SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
        SESSION_COOKIE_LIFETIME: 7200 // 2 hours
    },
    publicRuntimeConfig: {
        AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
        AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
        AUTH0_SCOPE: 'openid profile offline_access',
        API_AUDIENCE: 'https://devellisment.com',
        API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:5000',
        REDIRECT_URI: process.env.REDIRECT_URI || 'http://localhost:3000/api/callback',
        POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI || 'http://localhost:3000/'
    }
})
