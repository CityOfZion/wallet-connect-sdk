import { SignClientTypes, SessionTypes } from '@walletconnect/types'
import { JsonRpcResult, ErrorResponse, JsonRpcError } from '@walletconnect/jsonrpc-utils'
import { Chain, Method } from '@cityofzion/wallet-connect-sdk-core'
import { WalletConnectNeo3Adapter } from './adapter'

export type TSession = SessionTypes.Struct & {
  approvalUnix?: number
}

export type TSessionProposal = SignClientTypes.EventArguments['session_proposal']

export type TSessionRequest = SignClientTypes.EventArguments['session_request']

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
  methods?: (Method | (string & Record<never, never>))[]
  clientOptions: SignClientTypes.Options
  adapter?: WalletConnectNeo3Adapter
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

export type TNamespaces = SessionTypes.Namespaces

export type TAdapterMethodParam = {
  request: TSessionRequest
  session: TSession
}

export * from '@cityofzion/wallet-connect-sdk-core'
