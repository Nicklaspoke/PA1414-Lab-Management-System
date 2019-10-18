/**
 * Various useful utils for the web app
 *
 * @auth Nicklas König (niko14)
 */
'use strict';

export const bookingStatusToString = (bookingStaus) => {
    switch (bookingStaus) {
        case 1:
            return 'Avaiting aproval';
        case 2:
            return 'Booked';
        case 3:
            return 'Checked Out';
        case 4:
            return 'Returned';
        case 5:
            return 'Late';
        case 6:
            return 'Denied';
    }
};

export const accountRoleToString = (accountRole) => {
    switch (accountRole) {
        case 1:
            return 'Admin';
        case 2:
            return 'Teacher';
        case 3:
            return 'Student';
        case 4:
            return 'Avaiting Approval';
        case 5:
            return 'Deactivated';
    }
}
