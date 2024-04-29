import Arananlar from '../pages/Arananlar';
import Cezalar from '../pages/Cezalar';
import Homepage from '../pages/Homepage';
import Sinavlar from '../pages/Sinavlar';
import Tutanaklar from '../pages/Tutanaklar';

export const router = [
    {
        getComponent: () => Homepage,
        name: 'homepage',
        icon: 'FaHome',
        active: false
    },
    {
        getComponent: () => Tutanaklar,
        name: 'reports',
        icon: 'FaInbox',
        active: false
    },
    {
        getComponent: () => Arananlar,
        name: 'wanted',
        icon: 'FaFolderOpen',
        active: false
    },
    {
        getComponent: () => Cezalar,
        name: 'crim',
        icon: 'FaHammer'
    },
    {
         getComponent: () => Sinavlar,
         name: 'sinavlar',
         icon: 'FaFileSignature'
    },
];
