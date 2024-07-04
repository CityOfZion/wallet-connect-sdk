import WalletConnectTypes, { CoreTypes } from '@walletconnect/types'
import { JsonRpcResult, ErrorResponse, JsonRpcError } from '@walletconnect/jsonrpc-utils'
import { AbstractWalletConnectEIP155Adapter, AbstractWalletConnectNeonAdapter } from './adapters'
import { Web3WalletTypes } from '@walletconnect/web3wallet'

export type TSession = WalletConnectTypes.SessionTypes.Struct & {
  approvalUnix: number
  wccv: number | undefined
}

export type TSessionProposal = WalletConnectTypes.SignClientTypes.EventArguments['session_proposal']

export type TSessionRequest = WalletConnectTypes.SignClientTypes.EventArguments['session_request']

export enum EStatus {
  ERROR = 'ERROR',
  STARTING = 'STARTING',
  STARTED = 'STARTED',
  NOT_STARTED = 'NOT_STARTED',
}

export type TWalletCoreEvents = {
  proposals(proposals: TSessionProposal[]): void | Promise<void>
  requests(requests: TSessionRequest[]): void | Promise<void>
  sessions(sessions: TSession[]): void | Promise<void>
  status(status: EStatus): void | Promise<void>
}

export type TBaseBlockchainOptions<T> = {
  methods: string[]
  events?: string[]
  autoAcceptMethods?: string[]
  adapter?: T
}

export type TInitClientOptions = {
  core: CoreTypes.Options
  metadata: Web3WalletTypes.Options['metadata']
  signConfig: Web3WalletTypes.Options['signConfig']
}

export type TInitOptions = {
  clientOptions: TInitClientOptions
  blockchains: {
    neo3?: TBaseBlockchainOptions<AbstractWalletConnectNeonAdapter>
    eip155?: TBaseBlockchainOptions<AbstractWalletConnectEIP155Adapter>
  }
}

export type TApproveSessionOptions = {
  address: string
  chain: string
  blockchain: string
}

export type TSessionExtendedStorage = {
  topic: string
  approvalUnix: number
  wccv: number | undefined
}

export type TRejectReason = ErrorResponse

export type TRequestResult = JsonRpcResult

export type TRequestError = JsonRpcError

export type TNamespaces = WalletConnectTypes.SessionTypes.Namespaces

export type TAdapterMethodParam = {
  request: TSessionRequest
  session: TSession
}

export enum ResponseErrorCode {
  REJECT = 1,
  DISCONNECT = 5900,
}

export { WalletConnectTypes }
