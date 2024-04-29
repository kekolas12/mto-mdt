import React, { useState } from 'react';
import { FaPen, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';
import Modal from '../components/Modal';
import UserCard from '../components/UserCard';
import { useLang } from '../contexts/LangContext';
import { useMDT } from '../contexts/MdtContext';
import { fetchNui } from '../utils/fetchNui';

function Homepage() {
    const { users, announcements } = useMDT();
    const [searchBar, setSearch] = useState('');
    const [modal, setModal] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const addAnnouncement = () => {
        fetchNui('addAnnouncement', { title, description });
        setModal(false);
    };

    const { lang } = useLang();

    return (
        <div className="flex items-center h-full px-16 gap-6">
            {modal && (
                <Modal>
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[#a6aeb4]">
                                    {lang['share_announcement'] ??
                                        'Duyuru Paylaş'}
                                </p>
                                <p className="text-xs text-[#a6aeb4]">
                                    {lang['announcement_option'] ??
                                        'Announcements cannot be edited after posting'}
                                </p>
                            </div>
                            <div
                                onClick={e => setModal(false)}
                                className="bg-secondary w-8 h-8 text-[#a6aeb4]  p-2 rounded-full cursor-pointer hover:text-[#cf4444] flex items-center justify-center"
                            >
                                <MdOutlineClose />
                            </div>
                        </div>

                        <div className="mt-2">
                            <input
                                placeholder={
                                    lang['announcement_header'] ??
                                    'Announcement Title'
                                }
                                onChange={e => setTitle(e.target.value)}
                                value={title}
                                className="w-full font-poppins bg-secondary outline-none p-2 text-sm rounded-md  border-2 border-[#1f2123]"
                            />
                            <textarea
                                placeholder={
                                    lang['announcement_details'] ??
                                    'Announcement Details'
                                }
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                                className="w-full font-poppins bg-secondary outline-none p-2 text-sm rounded-md my-2 border-2 border-[#1f2123] min-h-[8rem] max-h-56"
                            />

                            <button
                                onClick={addAnnouncement}
                                className="bg-[#4471cf] hover:bg-[#4f81ee] p-2 w-full text-sm rounded-md"
                            >
                                {lang['share'] ?? 'Share'}
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
            <div className="flex-1 bg-box h-full p-4 flex flex-col max-h-full overflow-hidden overflow-y-auto">
                <div>
                    <p className="text-[#a6aeb4] font-poppins text-xl font-medium">
                        {lang['person_enquiry'] ?? 'Person Enquiry'}
                    </p>
                    <p className="text-[#a6aeb4] font-poppins text-sm">
                        {lang['person_option'] ??
                            'Query all residents in the city in seconds'}
                    </p>

                    <div className="flex items-center text-[#a6aeb4] bg-secondary mt-4 p-2 rounded-xl gap-2">
                        <FaSearch />
                        <input
                            value={searchBar}
                            onChange={e => setSearch(e.target.value)}
                            placeholder={
                                lang['search_text'] ??
                                'You can make an enquiry with Name, Surname, ID No, Telephone'
                            }
                            className="flex-1 bg-transparent text-[#a6aeb4] outline-none border-none text-sm"
                        />
                    </div>
                </div>

                <div className="py-2 overflow-y-auto h-[90%]">
                    {searchBar != ''
                        ? users
                              .filter(
                                  x =>
                                      x.firstname
                                          .toLocaleLowerCase()
                                          .includes(
                                              searchBar.toLocaleLowerCase()
                                          ) ||
                                      x.lastname
                                          .toLocaleLowerCase()
                                          .includes(
                                              searchBar.toLocaleLowerCase()
                                          ) ||
                                      x.citizenid.includes(searchBar) ||
                                      x.phoneNumber.includes(searchBar)
                              )
                              .map(user => <UserCard data={user} />)
                        : users.map(user => <UserCard data={user} />)}
                </div>
            </div>
            <div className="flex-1 bg-box h-full p-4 flex flex-col max-h-full overflow-hidden">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[#a6aeb4] font-poppins text-xl font-medium">
                            {lang['share_announcement'] ?? 'Duyuru Paylaş'}
                        </p>
                        <p className="text-[#a6aeb4] font-poppins text-sm">
                            {lang['announcement_option'] ??
                                'Announcements cannot be edited after posting'}
                        </p>
                    </div>

                    <div
                        onClick={e => setModal(true)}
                        className="flex items-center text-white bg-[#4471cf] p-2 rounded-full gap-2 cursor-pointer text-xs"
                    >
                        <FaPlus />
                    </div>
                </div>
                <div>
                    {announcements.reverse().map(announce => (
                        <div className="bg-secondary mt-3 p-3 ">
                            <div>
                                <p className="text-[#a6aeb4] font-poppins text-xl font-medium">
                                    {announce.title}
                                </p>
                                <p className="text-[#a6aeb4] font-poppins text-sm mt-2">
                                    {announce.description}
                                </p>
                                <div className="w-full flex items-center justify-between mt-2">
                                    <div>
                                        <p className="text-[#a6aeb4] font-poppins text-xs">
                                            {announce.writer}
                                        </p>
                                        <p className="text-[#a6aeb4] font-poppins text-xs">
                                            12.03.2023
                                        </p>
                                    </div>
                                    <div
                                        onClick={e =>
                                            fetchNui(
                                                'deleteAnnouncment',
                                                announce.id
                                            )
                                        }
                                        className="bg-box text-[#a6aeb4] text-xs p-2 rounded-full cursor-pointer hover:text-[#cf4444]"
                                    >
                                        <FaTrash />
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

export default Homepage;
