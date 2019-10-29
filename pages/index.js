/**
 * Index page
 *
 * @author Nicklas König (niko14)
 */

import MainLayout from '../components/MainLayout';

const Index = () => (
    <div>
        <MainLayout>
        <div className='index-container slide-in-right'>
            <h1>Welcome to the BTH SERL booking system</h1>
            <h2>If you already have an account, use the login button</h2>
            <h2>If you are a new student and want to apply for an account, use the register button</h2>
        </div>
        </MainLayout>
    </div>
);

export default Index;
