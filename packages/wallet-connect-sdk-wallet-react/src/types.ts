import {
  WcWalletSDK,
  EStatus,
  TApproveSessionOptions,
  TInitOptions,
  TRejectReason,
  TRequestResult,
  TSession,
  TSessionProposal,
  TSessionRequest,
  TWalletCoreEvents,
} from '@cityofzion/wallet-connect-sdk-wallet-core'
import { ReactNode } from 'react'
import TypedEventEmitter from 'typed-emitter'

export interface IWalletConnectWalletContext {
  /**
   * The list of WcWalletSDK instance
   */
  sdk: WcWalletSDK

  /**
   * The current WalletConnect event emitter
   */
  emitter: TypedEventEmitter<TWalletCoreEvents>

  /**
   * The list of WalletConnect connected sessions
   */
  sessions: TSession[]

  /**
   * The list of WalletConnect connected proposals
   */
  proposals: TSessionProposal[]

  /**
   * The list of WalletConnect connected requests
   */
  requests: TSessionRequest[]

  /**
   * the current status of initialization
   */
  status: EStatus

  /**
   * Start the process of establishing a new connection
   * @param uri URI provided by the dapp you want to connect to
   * @return {Promise.void}
   */
  connect(uri: string): Promise<void>

  /**
   * Disconnects from the specific dapp
   * @param session Session you want to disconnect
   * @param reason [reason="USER_DISCONNECTED"] The reason for the disconnection
   * @return {Promise.void}
   */
  disconnect(session: TSession, reason?: TRejectReason): Promise<void>

  /**
   * Approve a specific proposal
   * @param proposal Session proposal you want to approve
   * @param options Options to build the session namespace
   * @param options.accounts An array of accounts that you want to connect to
   * @param options.accounts[].chain The key of supported chain to which the account belongs
   * @param options.accounts[].address The account address
   * @params options.blockchain [blockchain=DEFAULT_BLOCKCHAIN] The key of supported blockchain you want to connect to
   * @return {Promise.TSession} The session that was created
   */
  approveProposal(proposal: TSessionProposal, options: TApproveSessionOptions): Promise<TSession>

  /**
   * Reject a specific proposal
   * @param proposal Session proposal you want to reject
   * @param reason [reason="Rejected by the user"] The reason for the rejection
   * @return {Promise.void}
   */
  rejectProposal(proposal: TSessionProposal, reason?: TRejectReason): Promise<void>

  /**
   * Approve a specific request
   * @param request Session request you want to approve
   * @return {Promise.TRequestResult} The result of request invocation
   */
  approveRequest(request: TSessionRequest): Promise<TRequestResult>

  /**
   * Reject a specific request
   * @param request Session request you want to reject
   * @param reason [reason="Rejected by the user"] The reason for the rejection
   *  @return {Promise.void}
   */
  rejectRequest(request: TSessionRequest, reason?: TRejectReason): Promise<void>

  /**
   * set the sdk adapter
   * @param adapter The Adapter to perform the WalletConnect requests
   *  @return {void}
   */
  setAdapters(adapters: TSetAdaptersParam): void
}

export type TSetAdaptersParam = {
  [K in keyof TInitOptions['blockchains']]: Exclude<TInitOptions['blockchains'][K], undefined>['adapter']
}

export type TWalletConnectWalletProps = {
  options: TInitOptions
  children: ReactNode
}
