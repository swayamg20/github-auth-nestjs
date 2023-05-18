"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let ActionController = class ActionController {
    authorize(res) {
        const clientId = '1775e163d2a6271dea24';
        const redirectUri = 'http://localhost:3000/';
        const authorizationUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=public_repo`;
        res.redirect(authorizationUrl);
        console.log(res);
        const url = window.location.href;
        const urlParams = new URLSearchParams(url);
        const code = urlParams.get('code');
        console.log(code);
    }
    createRepo(params, body, req, res) {
        const clientId = '1775e163d2a6271dea24';
        const clientSecret = '289cb5dda0d89304a8363ac08051f2a19ce65ebd';
        const accessToken = params.token;
        console.log(accessToken, 'fetched');
        axios_1.default
            .post(`https://github.com/login/oauth/access_token`, null, {
            params: {
                code: accessToken,
                client_id: '1775e163d2a6271dea24',
                client_secret: '289cb5dda0d89304a8363ac08051f2a19ce65ebd',
            },
            headers: {
                Accept: 'application/json',
                Cookie: 'cookie_name=cookie_value',
            },
        })
            .then((response) => {
            const validToken = response.data.access_token;
            console.log(validToken);
            accessTokenGet(validToken);
        })
            .catch((error) => {
            console.error('Error1:', error.response.data);
        });
        async function accessTokenGet(validToken) {
            console.log(validToken);
            axios_1.default
                .post('https://api.github.com/user/repos', {
                name: 'my-repo',
                description: 'Sample repository',
            }, {
                headers: {
                    Authorization: `Bearer ${validToken}`,
                    Accept: 'application/vnd.github+json',
                    Cookie: 'cookie_name=cookie_value',
                },
            })
                .then((response) => {
                console.log(response);
                res.json({ success: true });
            })
                .catch((error) => {
                console.error('Error2:', error.response.data);
                res.json({ success: false });
            });
        }
    }
};
__decorate([
    (0, common_1.Get)('authorize'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ActionController.prototype, "authorize", null);
__decorate([
    (0, common_1.Post)('create-repo'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Request, Object]),
    __metadata("design:returntype", void 0)
], ActionController.prototype, "createRepo", null);
ActionController = __decorate([
    (0, common_1.Controller)('api/github')
], ActionController);
exports.ActionController = ActionController;
//# sourceMappingURL=action.controller.js.map