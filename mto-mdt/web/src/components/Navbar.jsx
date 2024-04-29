import React from 'react';
import { useTab } from '../contexts/TabContext';
import { router } from '../utils/router';
import * as FaIcons from 'react-icons/fa';
import { useLang } from '../contexts/LangContext';

function Navbar() {
    const { addTab } = useTab();
    const { lang } = useLang();

    return (
        <div className="w-full h-full p-2">
            <div className="w-full h-32 relative">
                <img
                    src="https://cdn.discordapp.com/attachments/643438558782291988/1182343421394944071/mdtbanner.png?ex=658d949e&is=657b1f9e&hm=c635fe4d93cfd87dbeb0f6f763a9bfca0b9de67cff388842e93df30816b00724&"
                    className="rounded-lg"
                />
            </div>

            <div className="my-4 flex flex-col gap-2">
                {router.map(x => (
                    <div
                        onClick={e =>
                            addTab(
                                x.name,
                                React.createElement(x.getComponent())
                            )
                        }
                        className="gap-2 p-2 rounded-xl text-[#a6aeb4] cursor-pointer flex items-center"
                    >
                        {React.createElement(FaIcons[x.icon])}

                        <p className="font-poppins">{lang[x.name] ?? x.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Navbar;
