import Navbar from './components/Navbar';
import { useTab } from './contexts/TabContext';
import { IoIosClose } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { useNuiEvent } from './hooks/useNuiEvent';
import { fetchNui } from './utils/fetchNui';

function App() {
    const { tabs, activeTabId, setActiveTab, removeTab } = useTab();
    const [display, setDisplay] = useState(false);

    useNuiEvent('setDisplay', setDisplay);

    useEffect(() => {
        // Only attach listener when we are visible
        if (!display) return;

        const keyHandler = e => {
            if (['Escape'].includes(e.code)) {
                setDisplay(false);
                fetchNui('hideFrame');
            }
        };

        window.addEventListener('keydown', keyHandler);

        return () => window.removeEventListener('keydown', keyHandler);
    }, [display]);

    return (
        <div className="w-full h-screen  flex items-center justify-center">
            {display && (
                <div className="w-[80%] h-[80%] bg-primary flex relative">
                    <div className="h-full w-1/6 bg-secondary  mr-2">
                        <Navbar />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="w-full h-[10%] bg-secondary flex items-center gap-2 px-3">
                            {tabs.map(x => (
                                <div
                                    className={`bg-box p-2 px-4 cursor-pointer group font-poppins text-sm rounded-xl text-white flex items-center gap-2 group  ${
                                        x.id == activeTabId &&
                                        'border-2 border-[#1f2123]'
                                    }`}
                                >
                                    <div onClick={e => setActiveTab(x.id)}>
                                        {x.title}
                                    </div>

                                    <IoIosClose
                                        className="hidden group-hover:block text-base"
                                        onClick={e => removeTab(x.id)}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="h-[90%]">
                            {tabs.map(tab => (
                                <div
                                    className={`h-full ${
                                        activeTabId !== tab.id && 'hidden'
                                    }`}
                                >
                                    {tab.component}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
