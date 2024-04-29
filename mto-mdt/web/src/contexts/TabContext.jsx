import React, { useEffect, useState } from 'react';
import Homepage from '../pages/Homepage';

const TabContext = React.createContext([]);

export const TabContextProvider = ({ children }) => {
    const [tabs, setTabs] = useState([]);
    const [activeTabId, setActiveTabId] = useState('');
    const [currentTabIndex, setCurrentTabIndex] = useState('');
    const [searchBar, setSearch] = useState('homepage');

    useEffect(() => {
        const tab = {
            id: new Date().getTime().toString(),
            title: 'Anasayfa',
            component: <Homepage />
        };
        const newTabs = [...tabs, tab];

        setTabs(newTabs);

        const index = newTabs.length - 1;
        setCurrentTabIndex(index);
        setActiveTabId(tab.id);
        setSearch(tab.title);
    }, []);

    function addTab(title, component) {
        if (tabs.length >= 10) return console.log('daha fazla sayfa açamazsın');
        const hasTab = tabs.findIndex(x => x.title == title) 
        console.log(hasTab)
        if (tabs.findIndex(x => x.title == title) == -1) {
            const tab = {
                id: new Date().getTime().toString(),
                title,
                component
            };
            const newTabs = [...tabs, tab];
            setTabs(newTabs);

            const index = newTabs.length - 1;
            setCurrentTabIndex(index);
            setActiveTabId(tab.id);
            setSearch(tab.title);
        } else {
            setActiveTab(tabs[hasTab].id)
        }



    }

    function changeTabComponent(id, name, component) {
        const index = tabs.findIndex(x => x.id === id);
        if (index === -1) return console.log('böyle bir tab yok!');

        let g = tabs[index];
        g.component = component;
        g.title = name;

        setTabs([...tabs.slice(0, index), g, ...tabs.slice(index + 1)]);

        setSearch(name);
    }

    function removeTab(id) {
        const newTabs = tabs.filter(x => x.id !== id);
        setTabs(newTabs);

        if (currentTabIndex - 1 >= 0) {
            const index = currentTabIndex - 1;
            const prev = newTabs[index];

            setCurrentTabIndex(index);
            setActiveTabId(prev.id);
        } else {
            setCurrentTabIndex(-1);
            setActiveTabId('');
        }
    }


    function setActiveTab(id) {
        const index = tabs.findIndex(x => x.id === id);
        setCurrentTabIndex(index);
        setActiveTabId(id);
    }

    function setTabName(id, title) {
        const index = tabs.findIndex(x => x.id === id);
        let g = tabs[index];
        g.title = title;

        setTabs([...tabs.slice(0, index), g, ...tabs.slice(index + 1)]);
        setSearch(title);
    }

    const data = {
        addTab,
        removeTab,
        activeTabId,
        setActiveTab,
        tabs,
        setTabName,
        changeTabComponent,
        searchBar,
        setSearch
    };

    return <TabContext.Provider value={data}>{children}</TabContext.Provider>;
};

export const useTab = () => React.useContext(TabContext);
