/**
 * Module for handlng validation of valid cookie token
 *
 * @author Nicklas König (niko14)
 */
'use strict';

import Router from 'next/router';
import cookies from 'next-cookies';

const jwt = require('jsonwebtoken');

export const auth = async (ctx) => {
    const { token } = cookies(ctx);

    if (ctx.req && !token) {
        ctx.res.writeHead(302, { location: '/login' });
        ctx.res.end();
        return
    }

    if(!token) {
        Router.push('/login');
    }

    //decode the token
    const decoded = await jwt.decode(token);

    if(ctx.pathname.includes('admin') && !decoded.admin) {
        ctx.res.writeHead(302, { location: '/user/dashboard' });
        ctx.res.end();
    }

    return token;
}

export const logout = async (ctx) => {
    document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    Router.push('/login');
}
