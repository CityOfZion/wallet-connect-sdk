import { execSync } from 'child_process'
import { RUN_CONCURRENTLY_COMMAND } from '../constants/DevConstants'

execSync(RUN_CONCURRENTLY_COMMAND, { stdio: 'inherit' })
