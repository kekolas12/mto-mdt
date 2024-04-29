import React, { useEffect, useState } from 'react';
import { FaCamera, FaFile, FaPlus, FaSave } from 'react-icons/fa';
import Modal from '../components/Modal';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { fetchNui } from '../utils/fetchNui';
import { Report } from './Tutanaklar';
import TagsJSON from '../assets/tags.json';
import { useMDT } from '../contexts/MdtContext';
import { useLang } from '../contexts/LangContext';
import { MdOutlineClose } from 'react-icons/md';

function Profil({ data }) {
    const [reports, setReports] = useState([]);
    const [profile, setProfile] = useState(data);
    const { cars } = useMDT();
    const { lang } = useLang();
    useNuiEvent('setRecords', setReports);
    useEffect(() => {
        const get = () => fetchNui('getRecords');
        get();
    }, []);

    const [modals, setModals] = useState({
        tags: false,
        licences: false,
        banner: false
    });

    const setPicture = (image, type) => {
        let newProfile = profile;
        type == 'avatar'
            ? (newProfile.avatar = image)
            : (newProfile.banner = image);

        setProfile(newProfile);
    };

    useEffect(() => {
        console.log('profile: ', JSON.stringify(profile));
    }, [profile]);

    const changeModal = name => setModals({ ...modals, [name]: !modals[name] });
    const [tagSearch, setTagSearch] = useState('');
    const [bannerImage, setBanner] = useState('');

    const [licenceTypes, setLicenceTypes] = useState([
        {
            type: 'driver_license',
            label: lang['driver_licenseb'] ?? 'B Class License'
        },
        {
            type: 'driver_license',
            label: lang['driver_licensea'] ?? 'A Class License'
        },
        {
            type: 'driver_license',
            label: lang['driver_licensea2'] ?? 'A2 Class License'
        },
        {
            type: 'driver_license',
            label: lang['driver_licensea1'] ?? 'A1 Class License'
        },
        {
            type: 'hunting_license',
            label: lang['hunting_license'] ?? 'Hunting License'
        },
        {
            type: 'weaponlicense',
            label: lang['weapon_license'] ?? 'Weapon License'
        },
        {
            type: 'weaponlicense',
            label: lang['gun_license'] ?? 'Gun License'
        }
    ]);

    useEffect(() => {
        const get = () => fetchNui('getLicenses').then(setLicenceTypes);

        get();
    }, []);

    return (
        <div className="flex items-center h-full px-16 gap-6">
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
                            placeholder={lang['search_tags'] ?? 'Search Tags'}
                            value={tagSearch}
                            onChange={e => setTagSearch(e.target.value)}
                        />

                        <div className="mt-1 flex flex-wrap gap-1 text-white">
                            {TagsJSON.filter(x => x.includes(tagSearch))
                                .sort()
                                .map(tag => (
                                    <div
                                        onClick={e => {
                                            setProfile(p => {
                                                p.tags.push(tag);
                                                fetchNui('updateProfile', {
                                                    licences: p.licences,
                                                    note: p.note,
                                                    tags: p.tags,
                                                    citizenid: p.citizenid
                                                });
                                                return p;
                                            });
                                            changeModal('tags');
                                        }}
                                        className="rounded-md capitalize cursor-pointer hover:text-white transition-all  bg-secondary py-1.5 px-3 text-xs flex items-center font-poppins gap-2 text-[#a6aeb4]"
                                    >
                                        <p>{tag}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </Modal>
            )}
            {modals.licences && (
                <Modal>
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <p>{lang['licenses'] ?? 'Licenses'}</p>
                            <div
                                className="w-4 h-4 bg-[#cf4444] cursor-pointer rounded-full"
                                onClick={e => changeModal('licences')}
                            ></div>
                        </div>

                        <div className="mt-1 flex flex-wrap gap-1 text-white">
                            {licenceTypes
                                .filter(x =>
                                    profile.licences.findIndex(a =>
                                        a.type.includes(x.type)
                                    ) == -1
                                        ? true
                                        : false
                                )
                                .sort()
                                .map(licence => (
                                    <div
                                        onClick={e => {
                                            setProfile(p => {
                                                p.licences.push(licence);
                                                fetchNui('updateProfile', {
                                                    licences: p.licences,
                                                    note: p.note,
                                                    tags: p.tags,
                                                    citizenid: profile.citizenid
                                                });
                                                return p;
                                            });
                                            changeModal('licences');
                                        }}
                                        className="rounded-md capitalize cursor-pointer hover:text-white transition-all  bg-secondary py-1.5 px-3 text-xs flex items-center font-poppins gap-2 text-[#a6aeb4]"
                                    >
                                        <p>{licence.label}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </Modal>
            )}

            {modals.banner && (
                <Modal>
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[#a6aeb4]">
                                    {lang['change_banner'] ?? 'Change Banner'}
                                </p>
                            </div>
                            <div
                                onClick={e => changeModal('banner')}
                                className="bg-secondary w-8 h-8 text-[#a6aeb4]  p-2 rounded-full cursor-pointer hover:text-[#cf4444] flex items-center justify-center"
                            >
                                <MdOutlineClose />
                            </div>
                        </div>

                        <div className="mt-2">
                            <input
                                placeholder={lang['set_banner'] ?? 'set_banner'}
                                onChange={e => setBanner(e.target.value)}
                                value={bannerImage}
                                className="w-full font-poppins bg-secondary outline-none p-2 text-sm rounded-md  border-2 border-[#1f2123]"
                            />

                            <div className="flex items-center gap-2 mt-2">
                                <button
                                    onClick={e => {
                                        fetchNui('takePicture', {
                                            user: profile,
                                            type: 'banner'
                                        }).then(image => {
                                            setPicture(image, 'banner');
                                        });
                                    }}
                                    className="bg-[#46d676] hover:bg-[#4fee84] p-2 w-full text-sm rounded-md"
                                >
                                    {lang['take_picture'] ?? 'Share'}
                                </button>
                                <button
                                    onClick={e => {
                                        setPicture(bannerImage, 'banner');
                                        fetchNui('SetImage', {
                                            url: bannerImage,
                                            type: 'banner',
                                            user: profile
                                        });
                                    }}
                                    className="bg-[#4471cf] hover:bg-[#4f81ee] p-2 w-full text-sm rounded-md"
                                >
                                    {lang['save'] ?? 'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}

            <div className="flex-1 bg-box h-full flex flex-col max-h-full overflow-hidden overflow-y-auto">
                <div className="p-2">
                    <div
                        className="relative h-10 group"
                        onClick={() => changeModal('banner')}
                    >
                        <img
                            className="h-full w-full object-cover"
                            src={profile.banner}
                        />
                        <div className="w-full h-full  items-center justify-center top-0 left-0 bg-black/50 absolute  text-white hidden group-hover:flex transition-all cursor-pointer">
                            <FaCamera />
                        </div>
                    </div>
                    <div className="px-4 bg-secondary">
                        <div className="-translate-y-9">
                            <div
                                onClick={e => {
                                    fetchNui('takePicture', {
                                        user: profile,
                                        type: 'avatar'
                                    }).then(image => {
                                        setPicture(image, 'user');
                                    });
                                }}
                                className="w-16 h-16 relative group z-20"
                            >
                                <img
                                    src={profile.avatar}
                                    className="w-full h-full rounded-full border-4 border-box object-cover "
                                />
                                <div
                                    className={`w-3 h-3 ${
                                        profile.record == 1 && 'bg-green-500'
                                    } ${
                                        profile.record == 2 && 'bg-yellow-500'
                                    }  ${
                                        profile.record == 3 && 'bg-red-500'
                                    } rounded-full bottom-1 right-2 border border-box absolute`}
                                ></div>
                                <div className="w-full h-full  items-center justify-center top-0 left-0 bg-black/50 absolute rounded-full text-white hidden group-hover:flex transition-all cursor-pointer">
                                    <FaCamera />
                                </div>
                            </div>
                            <p className="text-[#a6aeb4] font-poppins text-xl font-medium">
                                {profile.firstname} {profile.lastname}
                            </p>

                            <div className="mt-2  text-[#A3A3A3]">
                                <div className="flex justify-between">
                                    <div className="">
                                        <p className="font-poppins text-[#535353] text-xs">
                                            {lang['phone_number'] ??
                                                'Phone Number'}
                                        </p>
                                        <p className=" font-poppins text-sm text-[#A3A3A3]">
                                            {profile.phoneNumber}
                                        </p>
                                    </div>
                                    <div className="">
                                        <p className="font-poppins text-[#535353] text-xs">
                                            {lang['job'] ?? 'Job'}
                                        </p>
                                        <p className=" font-poppins text-sm text-[#A3A3A3]">
                                            {profile.job}
                                        </p>
                                    </div>
                                    <div className="">
                                        <p className="font-poppins text-[#535353] text-xs">
                                            {lang['gender'] ?? 'Gender'}
                                        </p>
                                        <p className=" font-poppins text-sm text-[#A3A3A3]">
                                            {profile.gender}
                                        </p>
                                    </div>
                                    <div className="">
                                        <p className="font-poppins text-[#535353] text-xs">
                                            {lang['dateofbirth'] ??
                                                'Date of Birth'}
                                        </p>
                                        <p className=" font-poppins text-sm text-[#A3A3A3]">
                                            {profile.dateofbirth}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-2">
                    <div className="flex items-center justify-between">
                        <p className="text-[#a6aeb4] text-xs my-2">
                            {lang['notes'] ?? 'Notes'}
                        </p>
                        <div
                            onClick={e =>
                                fetchNui('updateProfile', {
                                    licences: profile.licences,
                                    note: profile.note,
                                    tags: profile.tags,
                                    citizenid: profile.citizenid
                                })
                            }
                            className="flex items-center text-white bg-[#4471cf] p-1 rounded-full gap-2 cursor-pointer w-7 h-7 justify-center"
                        >
                            <FaSave className="text-[10px]" />
                        </div>
                    </div>
                    <textarea
                        value={profile.note}
                        onChange={e =>
                            setProfile({ ...profile, note: e.target.value })
                        }
                        className="input min-h-[10rem] mt-2"
                        placeholder={lang['place_note'] ?? 'Place Note'}
                    />
                </div>
            </div>
            <div className="flex-1 bg-box h-full p-4 flex flex-col max-h-full overflow-hidden overflow-y-auto">
                <div className="p-2">
                    <p className="text-[#a6aeb4] text-xs">
                        {lang['licenses'] ?? 'Licenses'}
                    </p>
                    {/* {tutanak.evidences.map(evidence => ( */}
                    <div className="mt-1 flex items-center flex-wrap gap-1 text-white">
                        <div
                            onClick={e => changeModal('licences')}
                            className="flex items-center text-white bg-[#4471cf] p-1 rounded-full gap-2 cursor-pointer w-7 h-7 justify-center"
                        >
                            <FaPlus className="text-[10px]" />
                        </div>
                        {profile.licences.map(x => (
                            <div className="rounded-md  bg-secondary py-1.5 px-3 text-sm flex items-center font-poppins gap-2 text-[#a6aeb4]">
                                <p>{x.label}</p>
                            </div>
                        ))}
                    </div>
                    {/* ))} */}
                </div>

                <div className="p-2">
                    <p className="text-[#a6aeb4] text-xs">
                        {lang['tags'] ?? 'Tags'}
                    </p>
                    {/* {tutanak.evidences.map(evidence => ( */}
                    <div className="mt-1 flex items-center flex-wrap gap-1 text-white">
                        <div
                            onClick={e => changeModal('tags')}
                            className="flex items-center text-white bg-[#4471cf] p-1 rounded-full gap-2 cursor-pointer w-7 h-7 justify-center"
                        >
                            <FaPlus className="text-[10px]" />
                        </div>
                        {profile.tags?.map(x => (
                            <div className="rounded-md  bg-secondary py-1.5 px-3 text-sm flex items-center font-poppins gap-2 text-[#a6aeb4]">
                                <p>{x}</p>
                            </div>
                        ))}
                    </div>
                    {/* ))} */}
                </div>
                <div className="p-2">
                    <p className="text-[#a6aeb4] text-xs">
                        {lang['Vehicles'] ?? 'Vehicles'}
                    </p>
                    {/* {tutanak.evidences.map(evidence => ( */}
                    <div className="mt-1 flex items-center flex-wrap gap-1 text-white">
                        {cars
                            .filter(a => a.ownerCitizenid == profile.citizenid)
                            .map(x => (
                                <div className="rounded-md  bg-secondary py-1.5 px-3 text-sm flex items-center font-poppins gap-2 text-[#a6aeb4]">
                                    <p>
                                        {x.label} • {x.plate}
                                    </p>
                                </div>
                            ))}
                    </div>
                    {/* ))} */}
                </div>
                <div className="p-2">
                    <p className="text-[#a6aeb4] text-xs">
                        {' '}
                        {lang['records'] ?? 'Records'}
                    </p>

                    <div className="bg-primary h-full p-2 text-white mt-2">
                        {reports.map(x =>
                            x.users.findIndex(
                                y => y.citizenid == profile.citizenid
                            ) != -1 ? (
                                <Report data={x} />
                            ) : (
                                ''
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profil;
