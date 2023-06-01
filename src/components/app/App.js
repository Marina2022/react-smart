import PageWrapper from "../layout/PageWrapper/PageWrapper";

import './normalize.scss';
import './App.scss';

import {EthereumClient, w3mConnectors, w3mProvider} from '@web3modal/ethereum'
import {Web3Modal} from '@web3modal/react'
import {configureChains, createConfig, useAccount, useBalance, WagmiConfig} from 'wagmi'
import {polygonMumbai} from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import {useDispatch, useSelector} from "react-redux";
import {selectWallet, setWallet} from "../../store/reducers/dataReducer";
import {useEffect} from "react";
import {ethers} from "ethers";

const chains = [polygonMumbai]
const projectId = '678dd611607cf4d445084821cf371cb9' //вот это надо будет засунуть в .env файл

const {publicClient} = configureChains(chains, [w3mProvider({projectId})])

const { webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()],
)

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({projectId, version: 1, chains}),
  publicClient,
  webSocketPublicClient,
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

function App() {

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <div className="App">
          <PageWrapper/>
        </div>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient}/>
    </>
  );
}

export default App;


