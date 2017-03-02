// Imports
import * as request from 'request';
import * as jwt from 'jsonwebtoken';

// Imports configuration
import { config } from './../config';

export class OAuth {

    public getRedirectUrlToProvider(type: string): string {
        switch (type) {
            case 'github':
                return `https://github.com/login/oauth/authorize?client_id=${config.oauth.providers.github.clientId}&redirect_uri=${config.oauth.providers.github.redirectUri}&scope=user:email&state=hello_world&allow_signup=true`;
            default:
                return null
        }
    }


    public getAccessTokenFromProvider(type: string, code: string): Promise<string> {
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
            }, (error, response, accessTokenResponse: any) => {
                if (!error && response.statusCode == 200) {
                    request({
                        url: 'https://api.github.com/user?access_token=' + accessTokenResponse.access_token,
                        headers: {
                            'User-Agent': 'request'
                        }
                    }, (error, response, userResponse: any) => {
                        if (!error && response.statusCode == 200) {
                            resolve(this.buildJWT(type, accessTokenResponse.access_token, JSON.parse(userResponse).email, JSON.parse(userResponse).id));
                        } else {
                            reject();
                        }
                    });
                } else {
                    reject();
                }
            });
        });
    }

    private buildJWT(type: string, accessToken: string, emailAddress: string, userId: number): string {
        let token = jwt.sign({ type: type, accessToken: accessToken, emailAddress: emailAddress, userId: userId }, config.oauth.jwtSecret, {
            //expiresIn: 3600,
            audience: this.getProvider(type).clientId,
            issuer: config.oauth.jwtIssuer,
            jwtid: accessToken
        });

        return token;
    }

    private getAccessTokenUriForProvider(type: string): string {
        switch (type) {
            case 'github':
                return 'https://github.com/login/oauth/access_token';
            default:
                return null
        }
    }

    private getProvider(type: string): any {
        switch (type) {
            case 'github':
                return config.oauth.providers.github
            default:
                return null
        }
    }
}