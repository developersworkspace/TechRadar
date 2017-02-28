// Imports
import * as request from 'request';
import * as jwt from 'jsonwebtoken';

export class OAuth {


    jwtSecret: string = 'techradar';

    github = {
        clientId: '6e7d85d80257ee842525',
        clientSecret: '558b485c9662e71109b2d935288e7eed608617f9',
        redirectUri: 'http://techradar.developersworkspace.co.za/api/oauth/github/callback'
    }

    public getRedirectUrlToProvider(type: string) {
        switch (type) {
            case 'github':
                return `https://github.com/login/oauth/authorize?client_id=${this.github.clientId}&redirect_uri=${this.github.redirectUri}&scope=user:email&state=hello_world&allow_signup=true`;
            default:
                return null
        }
    }


    public getAccessTokenFromProvider(type: string, code: string) {

        return new Promise((resolve: Function, reject: Function) => {
            request({
                method: 'post',
                body: {
                    client_id: this.getProvider(type).clientId,
                    client_secret: this.getProvider(type).clientSecret,
                    code: code,
                    redirect_uri: this.getProvider(type).redirectUri,
                    state: 'hello_world'
                },
                json: true,
                url: this.getAccessTokenUriForProvider(type),
                headers: {
                    'User-Agent': 'request'
                }
            }, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    resolve(this.buildJWT(body));
                } else {
                    reject();
                }
            });
        });
    }

    private buildJWT(response: any) {
        let token = jwt.sign({ accessToken: response.access_token }, this.jwtSecret, {
            expiresIn: 3600,
            audience: this.github.clientId,
            issuer: 'techradar.developersworkspace.co.za',
            jwtid: response.access_token
        });

        return token;
    }

    private getAccessTokenUriForProvider(type: string) {
        switch (type) {
            case 'github':
                return 'https://github.com/login/oauth/access_token';
            default:
                return null
        }
    }

    private getProvider(type: string) {
        switch (type) {
            case 'github':
                return this.github;
            default:
                return null
        }
    }
}