import React from 'react';
import { useState } from 'react';
import { useLang } from '../contexts/LangContext';
import FinesJSON from '../assets/fines.json';

function Cezalar() {
    const [search, setSearch] = useState('');
    const { lang } = useLang();
    return (
        <div className="p-4 overflow-y-auto h-full">
            <div className="flex items-center justify-between text-white mb-5">
                <p className="text-xl">
                    {lang['lossantos_finelist'] ?? 'Los Santos Fine List'}
                </p>
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder={lang['search_fine'] ?? 'Search Fine'}
                    className="input w-min"
                />
            </div>
            <div className="grid grid-cols-4 gap-2 font-poppins">
                {FinesJSON['infractions']
                    .filter(a =>
                        a.title
                            .toLocaleLowerCase()
                            .includes(search.toLocaleLowerCase())
                    )
                    .map(x => (
                        <div className="bg-[#50cf44]/50 p-2 text-white rounded text-sm">
                            <p>
                                {lang['fine_name'] ?? 'Fine Name'}: {x.title}
                            </p>
                            <p>
                                {lang['jail_time'] ?? 'Jail Time'}: {x.months}
                            </p>
                            <p>
                                {lang['jail_point'] ?? 'Jail Point'}: {x.points}
                            </p>
                            <p>
                                {lang['jail_amount'] ?? 'Jail Amount'}: {x.fine}
                                $
                            </p>
                        </div>
                    ))}
                {FinesJSON['misdemeanors']
                    .filter(a =>
                        a.title
                            .toLocaleLowerCase()
                            .includes(search.toLocaleLowerCase())
                    )
                    .map(x => (
                        <div className="bg-[#cfc144]/50 p-2  text-white rounded text-sm">
                            <p>
                                {lang['fine_name'] ?? 'Fine Name'}: {x.title}
                            </p>
                            <p>
                                {lang['jail_time'] ?? 'Jail Time'}: {x.months}
                            </p>
                            <p>
                                {lang['jail_point'] ?? 'Jail Point'}: {x.points}
                            </p>
                            <p>
                                {lang['jail_amount'] ?? 'Jail Amount'}: {x.fine}
                                $
                            </p>
                        </div>
                    ))}
                {FinesJSON['felonies']
                    .filter(a =>
                        a.title
                            .toLocaleLowerCase()
                            .includes(search.toLocaleLowerCase())
                    )
                    .map(x => (
                        <div className="bg-[#cf4444]/50 p-2  text-white rounded text-sm">
                            <p>
                                {lang['fine_name'] ?? 'Fine Name'}: {x.title}
                            </p>
                            <p>
                                {lang['jail_time'] ?? 'Jail Time'}: {x.months}
                            </p>
                            <p>
                                {lang['jail_point'] ?? 'Jail Point'}: {x.points}
                            </p>
                            <p>
                                {lang['jail_amount'] ?? 'Jail Amount'}: {x.fine}
                                $
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Cezalar;
