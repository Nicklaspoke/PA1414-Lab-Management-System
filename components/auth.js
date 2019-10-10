/**
 * Authenticate component
 */

import cookies from 'next-cookies';
import Router from 'next/router';
import jwt from 'jsonwebtoken';

async function checkTokenCookie() {
    const token = cookies().token;

    if (!token) {
        Router.push('/login')
    } else {
        continue;
    }
}

async function checkForAdmin() {
    const token = cookies().token;

    const decoded = jwt.decode(token);

    if (!decoed.admin) {
        Router.push('/user/dashboard');
    } else {
        Router.push('/admin/dashboard')
    }
}
