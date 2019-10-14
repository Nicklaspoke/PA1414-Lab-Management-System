/**
 * Admin landing page/dashboard
 *
 * @author Nicklas König (niko14)
 */
'use strict';

import AdminMainLayout from '../../components/MainAdminLayout';
import { auth } from '../../utils/auth';

const Dashboard = props => (
    <AdminMainLayout>
        <h1>Admin dashboard</h1>
    </AdminMainLayout>
);


Dashboard.getInitialProps = async ctx => {
    const token = await auth(ctx);
    console.log(token);
    return { token }
}

export default Dashboard;
