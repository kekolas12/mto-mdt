import React from 'react';
import { useState } from 'react';
import { useMDT } from '../contexts/MdtContext';
import { useLang } from '../contexts/LangContext';
import Modal from './Modal';

function UserSearch({ onSelect, onClose, job, tutanakUsers }) {
    const { users } = useMDT();
    const { lang } = useLang();
    const [search, setSearch] = useState('');
    return (
        <Modal>
            <div className="p-4 flex flex-col">
                <div className="flex items-center justify-between">
                    <p>{lang['select_officer'] ?? 'Select Officer'}</p>
                    <div
                        className="w-4 h-4 bg-[#cf4444] cursor-pointer rounded-full"
                        onClick={onClose}
                    ></div>
                </div>

                <input
                    className="input text-xs py-2 rounded-md px-3 my-2"
                    placeholder={lang['search_person'] ?? 'Search Person'}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <div className="overflow-y-auto flex-1 max-h-[25rem]">
                    {users
                        .filter(
                            x =>
                                (x.firstname.toLowerCase().includes(search) ||
                                    x.lastname
                                        .toLowerCase()
                                        .includes(search)) &&
                                (x.job == job || job == 'all') &&
                                (tutanakUsers
                                    ? tutanakUsers.findIndex(
                                          us => us.citizenid == x.citizenid
                                      ) == -1
                                        ? true
                                        : false
                                    : true)
                        )
                        .map(user => (
                            <div
                                onClick={e => onSelect(user)}
                                className="bg-secondary my-1 p-1 px-3 rounded-md cursor-pointer flex items-center gap-2"
                            >
                                <img
                                    src={user.avatar}
                                    className="w-7 h-7 rounded-md"
                                />

                                <div>
                                    <p className="text-sm text-[#a6aeb4]">
                                        {user.firstname} {user.lastname}
                                    </p>
                                    <p className="text-xs text-[#A3A3A3]">
                                        {user.job}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </Modal>
    );
}

export default UserSearch;
