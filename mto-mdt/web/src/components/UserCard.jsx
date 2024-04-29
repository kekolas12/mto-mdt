import React from 'react';
import { MdOutlineOpenInNew } from 'react-icons/md';
import { useLang } from '../contexts/LangContext';
import { useTab } from '../contexts/TabContext';
import Profil from '../pages/Profil';

function UserCard({ data, children, customButtons }) {
    const { addTab } = useTab();
    const { lang } = useLang();
    return (
        <div className="mb-2">
            <img className="h-10 w-full object-cover" src={data.banner} />
            <div className="bg-secondary px-4">
                <div className="-translate-y-7">
                    <div className="w-16 h-16 relative">
                        <img
                            src={data.avatar}
                            className="w-full h-full rounded-full border-4 border-secondary object-cover "
                        />
                        <div
                            className={`w-3 h-3 ${
                                data.record == 1 && 'bg-green-500'
                            } ${data.record == 2 && 'bg-yellow-500'}  ${
                                data.record == 3 && 'bg-red-500'
                            } rounded-full bottom-1 right-2 border border-secondary absolute`}
                        ></div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[#A3A3A3] text-lg font-medium font-poppins">
                                {data.firstname} {data.lastname}
                            </p>
                            <p className="text-[#535353] text-sm font-medium font-poppins">
                                #{data.citizenid}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            {customButtons?.map(but => (
                                <div
                                    onClick={but.onClick}
                                    className="w-8 h-8 bg-box text-[#a6aeb4] rounded-full flex items-center justify-center text-sm cursor-pointer group"
                                >
                                    {React.createElement(but.icon, {
                                        className: but.iconClass ?? ''
                                    })}
                                </div>
                            ))}
                            <div
                                onClick={e =>
                                    addTab(
                                        `${lang['person'] ?? 'Person'}: ${
                                            data.firstname
                                        } ${data.lastname}`,
                                        <Profil data={data} />
                                    )
                                }
                                className="w-8 h-8 bg-box text-[#a6aeb4] rounded-full flex items-center justify-center text-sm cursor-pointer"
                            >
                                <MdOutlineOpenInNew />
                            </div>
                        </div>
                    </div>

                    <div className="mt-2  text-[#A3A3A3]">
                        <div className="flex justify-between">
                            <div className="">
                                <p className="font-poppins text-[#535353] text-xs">
                                    {lang['phone_number'] ?? 'Telefon Numarası'}
                                </p>
                                <p className=" font-poppins text-sm text-[#A3A3A3]">
                                    {data.phoneNumber}
                                </p>
                            </div>
                            <div className="">
                                <p className="font-poppins text-[#535353] text-xs">
                                    {lang['job'] ?? 'Job'}
                                </p>
                                <p className=" font-poppins text-sm text-[#A3A3A3]">
                                    {data.job}
                                </p>
                            </div>
                            <div className="">
                                <p className="font-poppins text-[#535353] text-xs">
                                    {lang['gender'] ?? 'Gender'}
                                </p>
                                <p className=" font-poppins text-sm text-[#A3A3A3]">
                                    {data.gender}
                                </p>
                            </div>
                            <div className="">
                                <p className="font-poppins text-[#535353] text-xs">
                                    {lang['dateofbirth'] ?? 'Date of birth'}
                                </p>
                                <p className=" font-poppins text-sm text-[#A3A3A3]">
                                    {data.dateofbirth}
                                </p>
                            </div>
                        </div>

                        {children && children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCard;
