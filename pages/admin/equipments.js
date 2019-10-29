/**
 * Page to see all equipment
 */
import AdminMainLayout from '../../components/MainAdminLayout';
import { auth } from '../../utils/auth';
import { equipmentStatusToString } from '../../utils/utils';
import config from '../../config/config.json';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

const Equipments = props => (
    <AdminMainLayout>
            <table className='equipmentTableContainer slide-in-bottom'>
                <thead>
                <tr>
                    <th>Barcode</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Borrow Time (days)</th>
                </tr>
                </thead>
                {props.equipments.map(equipment => (
                    <Link href='equipment/[id]' as={`equipment/${equipment.barcode}`}>
                            <tr>
                                <td>{equipment.barcode}</td>
                                <td>{equipment.name}</td>
                                <td>{equipmentStatusToString(equipment.status)}</td>
                                <td>{equipment.borrow_time}</td>
                            </tr>
                    </Link>
                ))}
            </table>

            <Link href='equipment/addEquipment' as={'/equipment/addEquipment'}>
                <button className='leftButton submitStyle slide-in-left'>Add New Equipment</button>
            </Link>

    </AdminMainLayout>
);

Equipments.getInitialProps = async ctx => {
    let data;
    const token = await auth(ctx);

    let equipmentData;
    //Get the equipment data
    const res = await fetch(`${config.apiAddr}/equipment`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'GET'
    }).then(async function (responce) {
        equipmentData = await responce.json();
    });

    data = {
        token: token,
        equipments: equipmentData.data
    }
    return data;
}

export default Equipments;
