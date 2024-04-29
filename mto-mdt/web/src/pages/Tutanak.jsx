import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaCamera, FaPen, FaPlus, FaSave, FaTrash } from 'react-icons/fa';
import Modal from '../components/Modal';
import UserSearch from '../components/UserSearch';
import TagsJSON from '../assets/tags.json';
import FinesJSON from '../assets/fines.json';
import { fetchNui } from '../utils/fetchNui';
import { useTab } from '../contexts/TabContext';
import Tutanaklar from './Tutanaklar';
import { useLang } from '../contexts/LangContext';

function Tutanak({ data }) {
    const [tutanak, setTutanak] = useState(data);
    const [modals, setModals] = useState({
        polis: false,
        tags: false,
        kanit: false,
        suclu: false,
        sucekle: false,
        bigImage: false
    });
    const { addTab, removeTab, activeTabId } = useTab();
    const { lang } = useLang();

    const changeModal = name => setModals({ ...modals, [name]: !modals[name] });
    const addUser = (user, isCop) => {
        setTutanak({
            ...tutanak,
            users: [
                ...tutanak.users,
                {
                    ...user,
                    isCop,
                    fines: [],
                    islemler: false,
                    tutuklama: false,
                    kabul: false
                }
            ]
        });
        changeModal(isCop ? 'polis' : 'suclu');
    };

    const [tagSearch, setTagSearch] = useState('');
    const [sucSearch, setSucSearch] = useState('');
    const [kanit, setKanit] = useState({
        image: '',
        title: ''
    });

    const [currentUser, setCurrentUser] = useState(0);

    const addCrim = tag => {
        console.log(currentUser);
        const index = tutanak.users.findIndex(x => x.citizenid == currentUser);
        if (index == -1) return;

        let g = tutanak.users[index];
        g.fines.push(tag);
        console.log(g.fines);

        setTutanak({
            ...tutanak,
            users: [
                ...tutanak.users.slice(0, index),
                g,
                ...tutanak.users.slice(index + 1)
            ]
        });
    };

    const changeBox = (type, checked, citizenid) => {
        const index = tutanak.users.findIndex(x => x.citizenid == citizenid);
        if (index == -1) return;

        let g = tutanak.users[index];
        g[type] = checked;

        setTutanak({
            ...tutanak,
            users: [
                ...tutanak.users.slice(0, index),
                g,
                ...tutanak.users.slice(index + 1)
            ]
        });
    };

    const [cachePic, setCachePic] = useState('');

    return (
        <div className="flex items-center h-full px-16 gap-6">
            {modals.polis && (
                <UserSearch
                    onSelect={user => addUser(user, true)}
                    job="police"
                    onClose={e => changeModal('polis')}
                    tutanakUsers={tutanak.users}
                />
            )}

            {modals.suclu && (
                <UserSearch
                    onSelect={user => addUser(user, false)}
                    job="all"
                    onClose={e => changeModal('suclu')}
                    tutanakUsers={tutanak.users}
                />
            )}

            {modals.bigImage && (
                <Modal>
                    <div className="p-4">
                        <div className="flex justify-end w-full">
                            <div
                                className="w-4 h-4 bg-[#cf4444] cursor-pointer rounded-full mb-2"
                                onClick={e => changeModal('bigImage')}
                            ></div>
                        </div>
                        <img src={cachePic} />
                    </div>
                </Modal>
            )}

            {modals.tags && (
                <Modal>
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <p>{lang['tags'] ?? 'Tags'}</p>
                            <div
                                className="w-4 h-4 bg-[#cf4444] cursor-pointer rounded-full"
                                onClick={e => changeModal('tags')}
                            ></div>
                        </div>

                        <input
                            className="input text-xs my-2"
                            placeholder={lang['search_tag'] ?? 'Etiket ara '}
                            value={tagSearch}
                            onChange={e => setTagSearch(e.target.value)}
                        />

                        <div className="mt-1 flex flex-wrap gap-1 text-white">
                            {TagsJSON.filter(
                                x =>
                                    tutanak.tags.findIndex(t => x == t) == -1 &&
                                    x.includes(tagSearch)
                            )
                                .sort()
                                .map(tag => (
                                    <div
                                        onClick={e =>
                                            setTutanak({
                                                ...tutanak,
                                                tags: [...tutanak.tags, tag]
                                            })
                                        }
                                        className="rounded-md capitalize cursor-pointer hover:text-white transition-all  bg-secondary py-1.5 px-3 text-xs flex items-center font-poppins gap-2 text-[#a6aeb4]"
                                    >
                                        <p>{tag}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </Modal>
            )}

            {modals.kanit && (
                <Modal>
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <p>{lang['add_evidence'] ?? 'Kanıt Ekle'}</p>
                            <div
                                className="w-4 h-4 bg-[#cf4444] cursor-pointer rounded-full"
                                onClick={e => changeModal('kanit')}
                            ></div>
                        </div>

                        <div className="input flex items-center gap-2 my-2">
                            <FaCamera className="cursor-pointer" />
                            <input
                                placeholder={
                                    lang['picture_format'] ??
                                    'Fotoğraf URL(png, jpng)'
                                }
                                value={kanit.image}
                                onChange={e =>
                                    setKanit({
                                        ...kanit,
                                        image: e.target.value
                                    })
                                }
                                className="border-none outline-none text-white bg-transparent text-sm w-full"
                            />
                        </div>
                        <div className="input flex items-center gap-2 my-2">
                            <input
                                placeholder={lang['description'] ?? 'Açıklama'}
                                value={kanit.title}
                                onChange={e =>
                                    setKanit({
                                        ...kanit,
                                        title: e.target.value
                                    })
                                }
                                className="border-none outline-none text-white bg-transparent text-sm w-full"
                            />
                        </div>
                        <button
                            onClick={e => {
                                setTutanak({
                                    ...tutanak,
                                    evidences: [...tutanak.evidences, kanit]
                                });
                                changeModal('kanit');
                            }}
                            className="bg-[#4471cf] hover:bg-[#4f81ee] p-2 w-full text-sm rounded-md"
                        >
                            {lang['add'] ?? 'Add'}
                        </button>
                    </div>
                </Modal>
            )}

            {modals.sucekle && (
                <Modal>
                    <div className="p-4 max-h-96 overflow-y-auto">
                        <div className="flex items-center justify-between">
                            <p>Suç Ekle</p>
                            <div
                                className="w-4 h-4 bg-[#cf4444] cursor-pointer rounded-full"
                                onClick={e => changeModal('sucekle')}
                            ></div>
                        </div>

                        <div className="mt-1 flex flex-wrap gap-1 text-white">
                            <input
                                value={sucSearch}
                                placeholder="Suç ara"
                                onChange={e => setSucSearch(e.target.value)}
                                className="input text-sm py-1 px-3 mb-2"
                            />
                            {FinesJSON['infractions']
                                .filter(x =>
                                    x.title
                                        .toLocaleLowerCase()
                                        .includes(sucSearch.toLocaleLowerCase())
                                )
                                .map(tag => (
                                    <div
                                        onClick={e => addCrim(tag)}
                                        className="rounded-md capitalize cursor-pointer hover:text-white transition-all bg-[#50cf44]/50 py-1.5 px-3 text-xs flex items-center font-poppins gap-2 text-[#a6aeb4]"
                                    >
                                        <p>
                                            {tag.title} • ${tag.fine}
                                        </p>
                                    </div>
                                ))}
                            {FinesJSON['misdemeanors']
                                .filter(x =>
                                    x.title
                                        .toLocaleLowerCase()
                                        .includes(sucSearch.toLocaleLowerCase())
                                )
                                .map(tag => (
                                    <div
                                        onClick={e => addCrim(tag)}
                                        className="rounded-md capitalize cursor-pointer hover:text-white transition-all bg-[#cfc144]/50 py-1.5 px-3 text-xs flex items-center font-poppins gap-2 text-[#a6aeb4]"
                                    >
                                        <p>
                                            {tag.title} • ${tag.fine}
                                        </p>
                                    </div>
                                ))}
                            {FinesJSON['felonies']
                                .filter(x =>
                                    x.title
                                        .toLocaleLowerCase()
                                        .includes(sucSearch.toLocaleLowerCase())
                                )
                                .map(tag => (
                                    <div
                                        onClick={e => addCrim(tag)}
                                        className="rounded-md capitalize cursor-pointer hover:text-white transition-all bg-[#cf4444]/50 py-1.5 px-3 text-xs flex items-center font-poppins gap-2 text-[#a6aeb4]"
                                    >
                                        <p>
                                            {tag.title} • ${tag.fine}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </Modal>
            )}

            <div className="flex-1 bg-box h-full p-4 flex flex-col max-h-full overflow-hidden overflow-y-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[#fff] font-poppins text-xl font-medium">
                            {lang['minutes_details'] ?? 'Minutes Details'}
                        </p>
                        <p className="text-[#a6aeb4] font-poppins text-xs max-w-md">
                            {lang['minutes_option']
                                ? lang['minutes_option'].replace('%s', data.id)
                                : `Details of the minutes ${data.id} are below. Minutes can be edited after it has been created.`}
                        </p>
                    </div>
                    <div
                        onClick={e => {
                            fetchNui('handleRecord', tutanak);
                            addTab('Tutanaklar', <Tutanaklar />);
                            removeTab(activeTabId);
                        }}
                        className="flex items-center justify-center text-white bg-[#4471cf] hover:bg-[#2d56af] transition-all p-1 rounded-full gap-2 cursor-pointer w-8 h-8"
                    >
                        <FaSave className="text-[15px]" />
                    </div>
                </div>

                <div className="my-2">
                    <p className="text-[#a6aeb4] font-poppins text-sm font-medium">
                        {lang['minutes_header'] ?? 'Minutes Header'}
                    </p>
                    <input
                        placeholder={lang['minutes_header'] ?? 'Minutes Header'}
                        className="input  p-2 px-3 text-sm mt-1"
                        value={tutanak.title}
                        onChange={e =>
                            setTutanak({ ...tutanak, title: e.target.value })
                        }
                    />
                </div>

                <div className="my-2">
                    <p className="text-[#a6aeb4] font-poppins text-sm font-medium">
                        {lang['minutes_details'] ?? 'Minutes Details'}
                    </p>
                    <textarea
                        placeholder={
                            lang['minutes_details'] ?? 'Minutes Details'
                        }
                        value={tutanak.description}
                        onChange={e =>
                            setTutanak({
                                ...tutanak,
                                description: e.target.value
                            })
                        }
                        className="input  p-1 px-3 text-sm mt-1 min-h-[8rem] max-h-40"
                    />
                </div>

                <div className="my-2">
                    <div className="w-full flex items-center justify-between">
                        <p className="text-[#a6aeb4] font-poppins text-sm font-medium">
                            {lang['evidences'] ?? 'Evidences'}
                        </p>
                        <div
                            onClick={e => changeModal('kanit')}
                            className="flex items-center text-white bg-[#4471cf] p-1 rounded-full gap-2 cursor-pointer "
                        >
                            <FaPlus className="text-[10px]" />
                        </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1 text-white">
                        {tutanak.evidences.map((evidence, id) => (
                            <div className="rounded-md w-full group bg-secondary py-1.5 px-3 text-sm flex items-center font-poppins gap-2 text-[#a6aeb4]">
                                <div className="flex items-center">
                                    <img
                                        src={evidence.image}
                                        onClick={e => {
                                            changeModal('bigImage');
                                            setCachePic(evidence.image);
                                        }}
                                        className="w-6 h-6 rounded-md outline-none object-cover"
                                    />
                                    <p>{evidence.title}</p>
                                </div>
                                <FaTrash
                                    onClick={e => {
                                        setTutanak(data => {
                                            data.evidences.splice(id, 1);
                                            return data;
                                        });
                                    }}
                                    className="hidden group-hover:block"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="my-2">
                    <div className="w-full flex items-center justify-between">
                        <p className="text-[#a6aeb4] font-poppins text-sm font-medium">
                            {lang['tags'] ?? 'Tags'}
                        </p>
                        <div
                            onClick={e => changeModal('tags')}
                            className="flex items-center text-white bg-[#4471cf] p-1 rounded-full gap-2 cursor-pointer "
                        >
                            <FaPlus className="text-[10px]" />
                        </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1 text-white">
                        {tutanak.tags.map(tag => (
                            <div className="rounded-md  bg-secondary py-1.5 px-3 text-xs flex items-center font-poppins gap-2 text-[#a6aeb4]">
                                <p>{tag}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="my-2">
                    <div className="w-full flex items-center justify-between">
                        <p className="text-[#a6aeb4] font-poppins text-sm font-medium">
                            {lang['relevant_officers'] ?? 'Relevant Officers'}
                        </p>
                        <div
                            onClick={e => changeModal('polis')}
                            className="flex items-center text-white bg-[#4471cf] p-1 rounded-full gap-2 cursor-pointer "
                        >
                            <FaPlus className="text-[10px]" />
                        </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1 text-white">
                        {tutanak.users
                            .filter(x => x.isCop == true)
                            .map(user => (
                                <div className="rounded-md w-full  bg-secondary py-1.5 px-3 text-xs flex items-center font-poppins gap-2 text-[#a6aeb4]">
                                    <div className="w-5 h-5 bg-blue-500 rounded-md" />
                                    <p>
                                        {user.firstname} {user.lastname} •
                                        Los Santos Police Department
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-box h-full p-4 flex flex-col max-h-full overflow-hidden overflow-y-auto">
                <div className="flex items-center justify-between">
                    <p className="text-[#fff] font-poppins text-xl font-medium">
                        {lang['criminals'] ?? 'Criminals'}
                    </p>
                    <div
                        onClick={e => changeModal('suclu')}
                        className="flex items-center text-white bg-[#4471cf] p-1 rounded-full gap-2 cursor-pointer "
                    >
                        <FaPlus className="text-[10px]" />
                    </div>
                </div>

                {tutanak.users
                    .filter(x => x.isCop == false)
                    .map((user, id) => (
                        <UserCardTutanak
                            data={user}
                            id={id}
                            onAddCrim={id => {
                                setCurrentUser(id);
                                changeModal('sucekle');
                            }}
                            onChangeBox={changeBox}
                        />
                    ))}
            </div>
        </div>
    );
}

function UserCardTutanak({ data, id, onAddCrim, onChangeBox }) {
    const { lang } = useLang();
    const calculateFine = () => {
        let fines = 0;
        let months = 0;
        for (const x of data.fines) {
            fines += parseInt(x.fine);
            months += parseInt(x.months);
        }

        if (data.kabul) {
            fines -= (fines * 10) / 100;

            if (months > 0) {
                months -= (months * 5) / 100;
            }
        }

        return { fines, months };
    };

    useEffect(() => {
        calculateFine();
    }, []);

    return (
        <div className="mb-2">
            <img
                className="h-10 w-full object-cover"
                src={
                    lang['images_bg'] ??
                    'https://cdn.discordapp.com/attachments/643438558782291988/1182343421394944071/mdtbanner.png?ex=658d949e&is=657b1f9e&hm=c635fe4d93cfd87dbeb0f6f763a9bfca0b9de67cff388842e93df30816b00724&'
                }
            />
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
                    </div>

                    <div className="mt-2 flex flex-col gap-2">
                        <div className="">
                            <p className="font-poppins text-[#a6aeb4] text-xs">
                                {lang['crimes'] ?? 'Crimes'}
                            </p>

                            <div className="mt-1 flex items-center flex-wrap gap-1 text-white">
                                <div
                                    onClick={e => onAddCrim(data.citizenid)}
                                    className=" text-white bg-[#4471cf] p-1 rounded-full gap-2 cursor-pointer w-6 flex items-center justify-center h-6 "
                                >
                                    <FaPlus className="text-[10px]" />
                                </div>
                                {data.fines?.map(fine => (
                                    <div className="rounded-md capitalize bg-box py-1.5 px-3 text-xs flex items-center font-poppins gap-2 text-[#a6aeb4]">
                                        <p>{fine.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="">
                            <p className="font-poppins text-[#a6aeb4] text-xs">
                                {lang['fines'] ?? 'Fines'}
                            </p>

                            <div className="mt-1 flex items-center flex-wrap gap-1 text-white">
                                <div className="rounded-md capitalize bg-box py-1.5 px-3 text-xs flex items-center font-poppins gap-2 text-[#a6aeb4]">
                                    <p>{calculateFine().fines}$</p>
                                </div>
                                <div className="rounded-md capitalize bg-box py-1.5 px-3 text-xs flex items-center font-poppins gap-2 text-[#a6aeb4]">
                                    <p>{calculateFine().months} ay</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-7 text-[#a6aeb4]">
                        <div className="flex items-center font-poppins gap-2">
                            <input
                                className="w-5 h-5 bg-secondary"
                                type={'checkbox'}
                                checked={data.tutuklama}
                                onChange={e =>
                                    onChangeBox(
                                        'tutuklama',
                                        e.target.checked,
                                        data.citizenid
                                    )
                                }
                            />
                            <p className="text-sm">
                                {lang['arrest_warrant'] ?? 'Arrest Warant'}
                            </p>
                        </div>
                        <div className="flex items-center font-poppins gap-2">
                            <input
                                className="w-5 h-5 bg-secondary"
                                type={'checkbox'}
                                checked={data.islemler}
                                onChange={e =>
                                    onChangeBox(
                                        'islemler',
                                        e.target.checked,
                                        data.citizenid
                                    )
                                }
                            />
                            <p className="text-sm">
                                {lang['transactions_made'] ??
                                    'Transactions Made'}
                            </p>
                        </div>
                        <div className="flex items-center font-poppins gap-2">
                            <input
                                className="w-5 h-5 bg-secondary"
                                type={'checkbox'}
                                checked={data.kabul}
                                onChange={e =>
                                    onChangeBox(
                                        'kabul',
                                        e.target.checked,
                                        data.citizenid
                                    )
                                }
                            />
                            <p className="text-sm">Suçunu kabul etti</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tutanak;
