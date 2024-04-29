// Will return whether the current environment is in a regular browser

import { fetchNui } from "./fetchNui";
// and not CEF
export const isEnvBrowser = () => !(window).invokeNative

// Basic no operation function
export const noop = () => {}

export function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
