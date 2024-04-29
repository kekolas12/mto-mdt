import React from 'react';
import { useState } from 'react';
import { FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import Modal from '../components/Modal';
import UserCard from '../components/UserCard';
import UserSearch from '../components/UserSearch';
import { useMDT } from '../contexts/MdtContext';
import { useLang } from '../contexts/LangContext';
import { fetchNui } from '../utils/fetchNui';

function Arananlar() {
    const { users, cars } = useMDT();
    const { lang } = useLang();
    const [modals, setModals] = useState({
        suclu: false,
        arac: false
    });

    const addUser = user => {
        console.log(user);
        fetchNui('addWanted', user.citizenid);
        changeModal('suclu');
    };

    const changeModal = name => setModals({ ...modals, [name]: !modals[name] });

    return (
        <div className="flex items-center h-full px-16 gap-6">
            {modals.suclu && (
                <UserSearch
                    onSelect={user => addUser(user, false)}
                    job="all"
                    onClose={e => changeModal('suclu')}
                    tutanakUsers={users.filter(x => x.record == 3)}
                />
            )}
            {modals.arac && (
                <Modal className="">
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <p>{lang['search_vehicle'] ?? 'Search Vehicle'}</p>
                            <div
                                className="w-4 h-4 bg-[#cf4444] cursor-pointer rounded-full"
                                onClick={e => changeModal('arac')}
                            ></div>
                        </div>

                        <div className="overflow-y-auto max-h-[30rem]">
                            {cars.map(car => (
                                <div
                                    onClick={e => {
                                        fetchNui('addCarWanted', car.plate);
                                        changeModal('arac');
                                    }}
                                    className="bg-secondary p-2 my-2 text-sm cursor-pointer"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <img
                                            className="w-6 h-6"
                                            src={
                                                users.find(
                                                    x =>
                                                        x.citizenid ==
                                                        car.ownerCitizenid
                                                ).avatar
                                            }
                                        />
                                        <p>
                                            {
                                                users.find(
                                                    x =>
                                                        x.citizenid ==
                                                        car.ownerCitizenid
                                                ).firstname
                                            }{' '}
                                            {
                                                users.find(
                                                    x =>
                                                        x.citizenid ==
                                                        car.ownerCitizenid
                                                ).lastname
                                            }
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-xs">
                                        <p className="bg-box px-2 py-1 rounded-xl">
                                            {lang['plate'] ?? 'Plate'}:
                                            {car.plate}
                                        </p>
                                        <p className="bg-box px-2 py-1 rounded-xl">
                                            {lang['model'] ?? 'Model'}:{' '}
                                            {car.label}
                                        </p>
                                        <p className="bg-box px-2 py-1 rounded-xl">
                                            {lang['garage'] ?? 'Garage'}:{' '}
                                            {car.garage}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal>
            )}
            <div className="flex-1 bg-box h-full p-4 flex flex-col max-h-full overflow-hidden overflow-y-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[#a6aeb4] font-poppins text-xl font-medium">
                            {lang['search_person'] ?? 'Search Person'}
                        </p>
                        <p className="text-[#a6aeb4] font-poppins text-sm">
                            {lang['search_desc'] ??
                                'You can find every wanted person in the city in seconds Question'}
                        </p>
                    </div>
                    <div
                        onClick={e => changeModal('suclu')}
                        className="flex items-center text-white bg-[#4471cf] p-1 rounded-full gap-2 cursor-pointer "
                    >
                        <FaPlus className="text-[10px]" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto mt-5">
                    {users.map(
                        user =>
                            user.record == 3 && (
                                <UserCard
                                    customButtons={[
                                        {
                                            icon: FaTrash,
                                            iconClass:
                                                'text-xs group-hover:text-red-500',
                                            onClick: () => {
                                                fetchNui(
                                                    'removeWanted',
                                                    user.citizenid
                                                );
                                            }
                                        }
                                    ]}
                                    data={user}
                                />
                            )
                    )}
                </div>
            </div>
            <div className="flex-1 bg-box h-full p-4 flex flex-col max-h-full overflow-hidden overflow-y-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[#a6aeb4] font-poppins text-xl font-medium">
                            {lang['search_vehicle'] ?? 'Search Vehicle'}
                        </p>
                        <p className="text-[#a6aeb4] font-poppins text-sm">
                            {lang['search_desc2'] ??
                                'All wanted vehicles in the city in seconds Question'}
                        </p>
                    </div>
                    <div
                        onClick={e => changeModal('arac')}
                        className="flex items-center text-white bg-[#4471cf] p-1 rounded-full gap-2 cursor-pointer "
                    >
                        <FaPlus className="text-[10px]" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto mt-5 gap-2">
                    {cars
                        .filter(x => x.wanted == true)
                        .map(car => (
                            <div className="px-4 py-3 bg-secondary text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[#a6aeb4] text-lg font-medium font-poppins">
                                            {car.label}
                                        </p>
                                        <p className="text-[#A3A3A3] text-sm font-medium font-poppins">
                                            {car.plate}
                                        </p>
                                    </div>

                                    <div
                                        onClick={() => {
                                            fetchNui('addCarWanted', car.plate);
                                        }}
                                        className="w-8 h-8 bg-box text-[#a6aeb4] rounded-full flex items-center justify-center text-sm cursor-pointer group hover:text-red-500"
                                    >
                                        <FaTrash className="text-xs" />
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <p className=" text-[#A3A3A3] text-xs font-medium font-poppins">
                                        {lang['vehicle_owner'] ??
                                            'Vehicle Owner'}
                                        :
                                    </p>
                                    <div className="text-[#A3A3A3] bg-box p-2 mt-1 rounded-md text-sm font-medium font-poppins flex items-center gap-2">
                                        <img
                                            className="w-7 h-7  rounded-full"
                                            src={
                                                users.find(
                                                    x =>
                                                        x.citizenid ==
                                                        car.ownerCitizenid
                                                ).avatar
                                            }
                                        />
                                        <div>
                                            <p>
                                                {
                                                    users.find(
                                                        x =>
                                                            x.citizenid ==
                                                            car.ownerCitizenid
                                                    ).firstname
                                                }{' '}
                                                {
                                                    users.find(
                                                        x =>
                                                            x.citizenid ==
                                                            car.ownerCitizenid
                                                    ).lastname
                                                }
                                            </p>
                                            <p className="text-xs">
                                                {car.ownerCitizenid}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Arananlar;
