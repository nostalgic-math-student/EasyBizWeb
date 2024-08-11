import { http, createConfig } from 'wagmi'
import { celo, celoAlfajores } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [celoAlfajores],
  ssr: true,
  connectors: [injected()],
  transports: {
    [celoAlfajores.id]: http("https://alfajores-forno.celo-testnet.org"),
  },
  
})

export default config;
