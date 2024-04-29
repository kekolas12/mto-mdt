import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useLang } from '../contexts/LangContext';
import { useTab } from '../contexts/TabContext';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { fetchNui } from '../utils/fetchNui';
import Tutanak from './Tutanak';

function Tutanaklar() {
    const emptyReport = {
        title: '',
        date: '10.10.2023',
        description: '',
        tags: [],
        evidences: [],
        users: [],
        id: '3'
    };

    const [reports, setReports] = useState([]);
    useNuiEvent('setRecords', setReports);
    useEffect(() => {
        const get = () => fetchNui('getRecords');
        get();
    }, []);

    const { addTab } = useTab();
    const { lang } = useLang();

    return (
        <div className="text-white px-2 py-4 ">
            <div className="flex items-center justify-between h-8">
                <p className="font-poppins text-xl">
                    {lang['minutes'] ?? 'Minutes'}
                </p>
                <div className="flex items-center gap-2">
                    <input
                        placeholder={lang['search_minutes'] ?? 'Tutanak Ara'}
                        className="w-full font-poppins bg-secondary outline-none p-1 px-2 text-sm rounded-xl  border-2 border-[#1f2123]"
                    />
                    <div
                        onClick={e =>
                            addTab(
                                lang['new_minutes'] ?? 'Yeni Tutanak',
                                <Tutanak data={emptyReport} />
                            )
                        }
                        className="bg-secondary border-2 border-[#1f2123] p-2 w-8 h-8 cursor-pointer rounded-full flex items-center justify-center text-sm"
                    >
                        <FaPlus />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 mt-4 gap-4 overflow-y-auto h-[44rem] ">
                {reports.reverse().map(data => (
                    <Report data={data} />
                ))}
            </div>
        </div>
    );
}

export function Report({ data }) {
    const { addTab } = useTab();
    const { lang } = useLang();

    const onClick = () => {
        addTab(data.title, <Tutanak data={data} />);
    };
    return (
        <div onClick={onClick} className="font-poppins cursor-pointer">
            <div className="bg-secondary py-2.5 px-4 rounded-t-md flex items-center justify-between">
                <h1>{data.title}</h1>
                <div className="flex items-center gap-2">
                    <p>{data.date}</p>
                    <FaTrash
                        onClick={e => fetchNui('deleteReport', data)}
                        className="text-xs hover:text-red-500"
                    />
                </div>
            </div>
            <div className="py-3 bg-box px-4 rounded-b-md flex flex-col gap-4">
                <p>{data.description}</p>

                <div>
                    <h1 className="text-sm font-medium">
                        {lang['tags'] ?? 'Tags'}
                    </h1>
                    <div className="mt-1 flex flex-wrap gap-1">
                        {data.tags.map(tag => (
                            <p className="rounded-md  bg-secondary py-1.5 px-3 text-xs">
                                {tag}
                            </p>
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="text-sm font-medium">
                        {lang['users'] ?? 'Users'}
                    </h1>
                    <div className="mt-1 flex flex-wrap gap-1">
                        {data.users.map(user => (
                            <div className="cursor-default rounded-md bg-secondary py-1.5 px-3 text-xs flex items-center gap-1">
                                <div
                                    className={`w-3 h-3 ${
                                        user.job == 'police'
                                            ? 'bg-blue-500'
                                            : 'bg-yellow-500'
                                    } rounded-full`}
                                ></div>
                                <p className="font-poppins">
                                    {user.firstname} {user.lastname}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tutanaklar;
