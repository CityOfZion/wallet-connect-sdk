import WalletConnectTypes from '@walletconnect/types'
import { JsonRpcResult, ErrorResponse, JsonRpcError } from '@walletconnect/jsonrpc-utils'
import { Chain, Method } from '@cityofzion/wallet-connect-sdk-core'
import { AbstractWalletConnectNeonAdapter } from './adapter'

export type TSession = WalletConnectTypes.SessionTypes.Struct & {
  approvalUnix?: number
}

export type TSessionProposal = WalletConnectTypes.SignClientTypes.EventArguments['session_proposal']

export type TSessionRequest = WalletConnectTypes.SignClientTypes.EventArguments['session_request']

export enum EStatus {
  ERROR = 'ERROR',
  STARTING = 'STARTING',
  STARTED = 'STARTED',
  NOT_STARTED = 'NOT_STARTED',
}

export type TEvents = {
  proposals(proposals: TSessionProposal[]): void | Promise<void>
  requests(requests: TSessionRequest[]): void | Promise<void>
  sessions(sessions: TSession[]): void | Promise<void>
  status(status: EStatus): void | Promise<void>
}
export type TOptions = {
  autoAcceptMethods?: (Method | (string & Record<never, never>))[]
  methods: Method[]
  clientOptions: WalletConnectTypes.SignClientTypes.Options
  adapter?: AbstractWalletConnectNeonAdapter
}

export type TApproveSessionOptions = {
  account: { address: string; chain: Chain }
}

export type TApprovalDateStorage = {
  topic: string
  approvalUnix: number | undefined
}

export type TRejectReason = ErrorResponse

export type TRequestResult = JsonRpcResult

export type TRequestError = JsonRpcError

export type TNamespaces = WalletConnectTypes.SessionTypes.Namespaces

export type TAdapterMethodParam = {
  request: TSessionRequest
  session: TSession
}

export { WalletConnectTypes }
