import { execSync } from 'child_process'
import { readFileSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

type DeployConfig = {
  name: string
  host: string
  port: number
  username: string
  remotePath: string
  privateKeyPath: string
  files: string[]
}

const thisDirname = dirname(fileURLToPath(import.meta.url))
process.chdir(thisDirname)

const configPath = join(thisDirname, 'deploy.config.json')

if (!existsSync(configPath)) {
  console.error('❌ No deploy config found!')
  console.log('📝 Create deploy.config.json')
  process.exit(1)
}

const config = JSON.parse(readFileSync(configPath, 'utf8')) as DeployConfig

console.log(`🚀 Deploying to ${config.name}`)

try {
  const sshCmd = `ssh -i ${config.privateKeyPath} -p ${config.port}`
  const files = config.files.map((f) => `'${f}'`).join(' ')

  execSync(
    `rsync -avz -e "${sshCmd}" ${files} ${config.username}@${config.host}:${config.remotePath}/`,
    { stdio: 'inherit' },
  )
  console.log('✅ Deploy complete')
} catch {
  console.error('❌ Deploy failed')
  process.exit(1)
}
