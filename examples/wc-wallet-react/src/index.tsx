import * as React from "react";
import * as ReactDOM from "react-dom";
import {ChakraProvider} from "@chakra-ui/react"
import {
    DEFAULT_APP_METADATA,
    DEFAULT_LOGGER,
    DEFAULT_RELAY_PROVIDER,
    DEFAULT_PROJECT_ID,
    DEFAULT_METHODS,
} from "./constants";
import App from "./App";
import {WalletConnectWalletProvider} from "@cityofzion/wallet-connect-sdk-wallet-react";
import {AccountContextProvider} from "./context/AccountContext";

const wcOptions = {
    clientOptions: {
        projectId: DEFAULT_PROJECT_ID,
        metadata: DEFAULT_APP_METADATA,
        logger: DEFAULT_LOGGER,
        relayUrl: DEFAULT_RELAY_PROVIDER,
    },
    methods: DEFAULT_METHODS
}

ReactDOM.render(
    <>
        <ChakraProvider>
            <WalletConnectWalletProvider options={wcOptions}>
                <AccountContextProvider>
                    <App/>
                </AccountContextProvider>
            </WalletConnectWalletProvider>
        </ChakraProvider>
    </>,
    document.getElementById("root"),
);
