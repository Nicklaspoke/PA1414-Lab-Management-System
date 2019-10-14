/**
 * User landing page/dashboard
 *
 * @author Nicklas König (niko14)
 */
'use strict';

import MainLayout from '../../components/MainLayout';
import { auth } from '../../utils/auth';

const Dashboard = props => (
    <MainLayout>
        <h1>User dashboard</h1>
    </MainLayout>
);

Dashboard.getInitialProps = async ctx => {
    const token = await auth(ctx);

    return { token }
}
export default Dashboard;
