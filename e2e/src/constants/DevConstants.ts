import { DAPP_REACT, DAPP_VITE_SVELTEKIT, DAPP_VITE_VANILLA, WALLET_REACT } from './ProjectsDefinitions'

export const RUN_CONCURRENTLY_COMMAND: string = `concurrently ${[
  DAPP_REACT.runCommand,
  WALLET_REACT.runCommand,
  DAPP_VITE_VANILLA.runCommand,
  DAPP_VITE_SVELTEKIT.runCommand,
].join(' ')}`

export const HTML_ENTITIES = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#x2F;': '/',
  '&#x60;': '`',
  '&#x3D;': '=',
}

export const MAX_RETRIES: number = 3
