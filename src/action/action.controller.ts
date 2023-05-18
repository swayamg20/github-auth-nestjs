import {
  Controller,
  Get,
  Post,
  Res,
  Req,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import axios from 'axios';
import { DataGithub } from 'src/data.dto';

@Controller('api/github')
export class ActionController {
  @Get('authorize')
  authorize(@Res() res: Response) {
    // Redirect the user to the Github authorization URL
    // Include your client_id and redirect_uri
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

  @Post('create-repo')
  createRepo(
    @Query() params: any,
    @Body() body: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // Implement code to create a repo in the user's Github account
    // Include your client_id, client_secret, and access_token
    const clientId = '1775e163d2a6271dea24';
    const clientSecret = '289cb5dda0d89304a8363ac08051f2a19ce65ebd';
    const accessToken = params.token;
    console.log(accessToken, 'fetched');
    // Make API requests to create the repo using the Github REST API
    // Example code using Axios:
    axios
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
      axios
        .post(
          'https://api.github.com/user/repos',
          {
            name: 'my-repo',
            description: 'Sample repository',
          },
          {
            headers: {
              Authorization: `Bearer ${validToken}`,
              Accept: 'application/vnd.github+json',
              Cookie: 'cookie_name=cookie_value',
            },
          },
        )
        .then((response) => {
          console.log(response);
          res.json({ success: true });
        })
        .catch((error) => {
          console.error('Error2:', error.response.data);
          res.json({ success: false });
        });
    }

    // Replace the example code with your actual implementation to create the repo

    // For this example, we'll simply return a success response
  }
}
