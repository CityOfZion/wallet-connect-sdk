import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react'
import WalletConnectClient from "@walletconnect/client";
import {ClientOptions} from "@walletconnect/types";
import WcSdk from "@cityofzion/wallet-connect-sdk-core";

interface IWalletConnectContext {
    wcSdk: WcSdk | null,
    setWcSdk: Dispatch<SetStateAction<WcSdk | null>>,
}

export const WalletConnectContext = React.createContext({} as IWalletConnectContext)

export const WalletConnectProvider: React.FC<{ children: any, options?: ClientOptions, manageSession?: boolean }> = ({ children, options, manageSession = false }) => {
    const [wcSdk, setWcSdk] = useState<WcSdk | null>(null)

    useEffect(() => {
        (async () => {
            if (!setWcSdk || !options || wcSdk) return

            const client = await WalletConnectClient.init(options)

            const sdk = new WcSdk(client)
            if (manageSession) {
                await sdk?.manageSession()
            }
            setWcSdk(() => sdk)
        })()
    }, [
        wcSdk,
        setWcSdk,
        options,
        manageSession,
    ])

    const contextValue: IWalletConnectContext = {
        wcSdk, setWcSdk,
    }

    return (
        <WalletConnectContext.Provider value={contextValue}>
            {children}
        </WalletConnectContext.Provider>
    );
};

export const useWalletConnect = () => useContext(WalletConnectContext)

export * from "@cityofzion/wallet-connect-sdk-core";