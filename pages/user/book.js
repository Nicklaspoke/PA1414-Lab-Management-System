/**
 * Page for the user to book equipment
 *
 * @auth Nicklas König (niko14)
 */

'use strict';

import MainUserLayout from '../../components/MainUserLayout';
import { auth } from '../../utils/auth';
import config from '../../config/config.json';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { bookingStatusToString } from '../../utils/utils';

const book = props => (

)

book.getInitialProps = async ctx => {
    const token = await auth(ctx);
}
export default book
