export let config = {
    production: true,
    web: {
        uri: 'http://yourdomain.com'
    },
    api: {
        uri: 'http://yourdomain.com/api'
    },
    oauth: {
        jwtSecret: 'techradar_secret',
        jwtIssuer: 'yourdomain.com',
        providers: {
            github: {
                clientId: 'yourclientid',
                clientSecret: 'yourclientsecret',
                redirectUri: 'http://yourdomain.com/api/oauth/github/callback'
            }
        }
    },
    datastores: {
        mongo: {
            uri: 'mongodb://mongo:27017/techradar_prod'
        }
    },
    logging: {
        path: '/logs/'
    }
};