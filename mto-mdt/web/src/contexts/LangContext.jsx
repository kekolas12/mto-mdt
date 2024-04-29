import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchNui } from '../utils/fetchNui';

const LangContext = createContext();
export const useLang = () => useContext(LangContext);
function LangProvider({ children }) {
    const [lang, setLang] = useState({});

    useEffect(() => {
        const getLang = () => fetchNui('getLang').then(setLang);
        getLang();
    }, []);

    useEffect(() => {
        console.log(lang);
    }, [lang]);

    return (
        <LangContext.Provider value={{ lang }}>{children}</LangContext.Provider>
    );
}

export default LangProvider;
