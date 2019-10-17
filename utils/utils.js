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
