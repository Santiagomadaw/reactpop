import { ReactElement, useState } from 'react';
import { ConfirmContext } from './confirmCustomHook';
interface IConfirmContextProviderProps {
    defaultConfirmState: boolean;
    defaulthiddenState: boolean;
    children: ReactElement;
}
export interface IConfirmValue {
    confirmState: boolean;
    onAccept: () => void;
    onCancel: () => void;
    hiddenState: boolean;
    onHidden: () => void;
    onUnhidden: () => void;
    textState: string;
    onSession:  () => void;
    onDeleter: () => void;
}



export default function ConfirmContextProvider({
    defaultConfirmState,
    defaulthiddenState,
    children,
}: IConfirmContextProviderProps) {
/* --------------------------------------------------------------- */
    const [confirmState, setAcceptState] = useState(defaultConfirmState);
    const setAccept = () => setAcceptState(true);
    const setCancel = () => setAcceptState(false);
    const [hiddenState, sethiddenState] = useState(defaulthiddenState);
    const setHidden = () => sethiddenState(true);
    const setUnhidden = () => sethiddenState(false);
    const [textState, settextState] = useState('');
    const setSesion = () => settextState('cerrar sesión');
    const setDeleter = () => settextState('borrar el anuncio');
    const confirmValues: IConfirmValue = {
        confirmState,
        onAccept: setAccept,
        onCancel: setCancel,
        hiddenState,
        onHidden: setHidden,
        onUnhidden: setUnhidden,
        textState,
        onSession: setSesion,
        onDeleter: setDeleter,
    };

    return (
        <ConfirmContext.Provider value={confirmValues}>
            {children}
        </ConfirmContext.Provider>
    );
}
