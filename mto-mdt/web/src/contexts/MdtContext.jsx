import { createContext, useContext, useState } from 'react';
import { useNuiEvent } from '../hooks/useNuiEvent';

const MDTContext = createContext();
export const useMDT = () => useContext(MDTContext);

export default function MDTProvider({ children }) {
    const [users, setUsers] = useState([
        {
            firstname: 'Kagan',
            lastname: 'Baba',
            citizenid: '1232112',
            phoneNumber: '5532212',
            job: 'Yazılımcı',
            gender: 'Erkek',
            dateofbirth: '10/10/2004',
            record: 1,
            avatar: '/Erick.png',
            tags: ['adam kaçırma', 'adam yaralama'],
            licences: [
                { type: 'car', label: 'Araç Lisansı' },
                { type: 'gun', label: 'Silah Lisansı' }
            ],
            note: ''
        },
        {
            firstname: 'Arda',
            lastname: 'Doğanok',
            citizenid: '123sad1',
            phoneNumber: '5532212',
            job: 'Yazılımcı',
            gender: 'Erkek',
            dateofbirth: '10/10/2004',
            record: 2,
            avatar: '/Erick.png',
            tags: ['adam kaçırma', 'adam yaralama'],
            licences: [
                { type: 'car', label: 'Araç Lisansı' },
                { type: 'gun', label: 'Silah Lisansı' }
            ],
            note: ''
        },
        {
            firstname: 'Arda',
            lastname: 'Doğanok',
            citizenid: '123sad1',
            phoneNumber: '5532212',
            job: 'Yazılımcı',
            gender: 'Erkek',
            dateofbirth: '10/10/2004',
            record: 2,
            avatar: '/Erick.png',
            tags: ['adam kaçırma', 'adam yaralama'],
            licences: [
                { type: 'car', label: 'Araç Lisansı' },
                { type: 'gun', label: 'Silah Lisansı' }
            ],
            note: ''
        },
        {
            firstname: 'Arda',
            lastname: 'Doğanok',
            citizenid: '123sad1',
            phoneNumber: '5532212',
            job: 'Yazılımcı',
            gender: 'Erkek',
            dateofbirth: '10/10/2004',
            record: 2,
            avatar: '/Erick.png',
            tags: ['adam kaçırma', 'adam yaralama'],
            licences: [
                { type: 'car', label: 'Araç Lisansı' },
                { type: 'gun', label: 'Silah Lisansı' }
            ],
            note: ''
        },
        {
            firstname: 'Arda',
            lastname: 'Doğanok',
            citizenid: '123sad1',
            phoneNumber: '5532212',
            job: 'Yazılımcı',
            gender: 'Erkek',
            dateofbirth: '10/10/2004',
            record: 2,
            avatar: '/Erick.png',
            tags: ['adam kaçırma', 'adam yaralama'],
            licences: [
                { type: 'car', label: 'Araç Lisansı' },
                { type: 'gun', label: 'Silah Lisansı' }
            ],
            note: ''
        },
        {
            firstname: 'Arda',
            lastname: 'Doğanok',
            citizenid: '123sad1',
            phoneNumber: '5532212',
            job: 'Yazılımcı',
            gender: 'Erkek',
            dateofbirth: '10/10/2004',
            record: 2,
            avatar: '/Erick.png',
            tags: ['adam kaçırma', 'adam yaralama'],
            licences: [
                { type: 'car', label: 'Araç Lisansı' },
                { type: 'gun', label: 'Silah Lisansı' }
            ],
            note: ''
        },
        {
            firstname: 'Arda',
            lastname: 'Doğanok',
            citizenid: '123sad1',
            phoneNumber: '5532212',
            job: 'Yazılımcı',
            gender: 'Erkek',
            dateofbirth: '10/10/2004',
            record: 2,
            avatar: '/Erick.png',
            tags: ['adam kaçırma', 'adam yaralama'],
            licences: [
                { type: 'car', label: 'Araç Lisansı' },
                { type: 'gun', label: 'Silah Lisansı' }
            ],
            note: ''
        },
        {
            firstname: 'Arda',
            lastname: 'Doğanok',
            citizenid: '123sad1',
            phoneNumber: '5532212',
            job: 'Yazılımcı',
            gender: 'Erkek',
            dateofbirth: '10/10/2004',
            record: 2,
            avatar: '/Erick.png',
            tags: ['adam kaçırma', 'adam yaralama'],
            licences: [
                { type: 'car', label: 'Araç Lisansı' },
                { type: 'gun', label: 'Silah Lisansı' }
            ],
            note: ''
        },
        {
            firstname: 'Arda',
            lastname: 'Doğanok',
            citizenid: '123sad1',
            phoneNumber: '5532212',
            job: 'Yazılımcı',
            gender: 'Erkek',
            dateofbirth: '10/10/2004',
            record: 2,
            avatar: '/Erick.png',
            tags: ['adam kaçırma', 'adam yaralama'],
            licences: [
                { type: 'car', label: 'Araç Lisansı' },
                { type: 'gun', label: 'Silah Lisansı' }
            ],
            note: ''
        },
        {
            firstname: 'Arda',
            lastname: 'Doğanok',
            citizenid: '123sad1',
            phoneNumber: '5532212',
            job: 'Yazılımcı',
            gender: 'Erkek',
            dateofbirth: '10/10/2004',
            record: 2,
            avatar: '/Erick.png',
            tags: ['adam kaçırma', 'adam yaralama'],
            licences: [
                { type: 'car', label: 'Araç Lisansı' },
                { type: 'gun', label: 'Silah Lisansı' }
            ],
            note: ''
        },
        {
            firstname: 'Arda',
            lastname: 'Doğanok',
            citizenid: '123sad1',
            phoneNumber: '5532212',
            job: 'Yazılımcı',
            gender: 'Erkek',
            dateofbirth: '10/10/2004',
            record: 2,
            avatar: '/Erick.png',
            tags: ['adam kaçırma', 'adam yaralama'],
            licences: [
                { type: 'car', label: 'Araç Lisansı' },
                { type: 'gun', label: 'Silah Lisansı' }
            ],
            note: ''
        },
        {
            firstname: 'Arda',
            lastname: 'Doğanok',
            citizenid: '123sad1',
            phoneNumber: '5532212',
            job: 'Yazılımcı',
            gender: 'Erkek',
            dateofbirth: '10/10/2004',
            record: 2,
            avatar: '/Erick.png',
            tags: ['adam kaçırma', 'adam yaralama'],
            licences: [
                { type: 'car', label: 'Araç Lisansı' },
                { type: 'gun', label: 'Silah Lisansı' }
            ],
            note: ''
        },
        {
            firstname: 'Yiğit',
            lastname: 'Gürses',
            citizenid: '98762',
            phoneNumber: '553221',
            job: 'police',
            gender: 'Erkek',
            dateofbirth: '10/10/2005',
            record: 3,
            avatar: '/Jonas.png',
            tags: ['adam kaçırma', 'adam yaralama'],
            licences: [
                { type: 'car', label: 'Araç Lisansı' },
                { type: 'gun', label: 'Silah Lisansı' }
            ],
            note: ''
        }
    ]);

    const [cars, setCars] = useState([
        {
            ownerCitizenid: '1232112',
            plate: '10KGN10',
            strike: 1,
            model: 'tofas',
            label: 'Tofaş',
            wanted: true,
            garage: 'A'
        },
        {
            ownerCitizenid: '123sad1',
            plate: '123sad1',
            strike: 1,
            model: 'tofas',
            label: 'Tofaş',
            wanted: false,
            garage: 'B'
        },
        {
            ownerCitizenid: '1232112',
            plate: '98762',
            strike: 1,
            model: 'tofas',
            label: 'Tofaş SLX',
            wanted: false,
            garage: 'C'
        }
    ]);

    const [announcements, setAnnouncements] = useState([
        {
            title: 'Duyuru başlığı',
            description:
                'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim saepe repudiandae culpa vel laudantium odit veritatis ea, minima ipsa, in quasi ducimus alias nulla minus, porro dolore explicabo. Totam, eos.',
            date: new Date(),
            writer: 'kagan baba',
            id: '12345678'
        },
        {
            title: 'Kagan baba bir numara',
            description:
                'Lorem ipsum,osasdasdas dasd asdasd epe repudiandae culpa vel laudantium odit veritatis ea, minima ipsa, in .',
            date: new Date(),
            writer: 'yiğit gürses',
            id: '123123'
        }
    ]);

    useNuiEvent('sendMDTData', data => {
        console.log(JSON.stringify(data));
        setUsers(data.users);
        setAnnouncements(data.announcements);
        setCars(data.cars);
    });

    useNuiEvent('setAnnouncements', setAnnouncements);
    useNuiEvent('setUsers', setUsers);
    useNuiEvent('setCars', setCars);

    const values = { users, announcements, cars };

    return <MDTContext.Provider value={values}>{children}</MDTContext.Provider>;
}
