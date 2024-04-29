import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LangProvider from './contexts/LangContext';
import MDTProvider from './contexts/MdtContext';
import { TabContextProvider } from './contexts/TabContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <TabContextProvider>
        <LangProvider>
            <MDTProvider>
                <App />
            </MDTProvider>
        </LangProvider>
    </TabContextProvider>
);
