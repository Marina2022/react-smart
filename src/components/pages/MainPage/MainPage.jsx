// import About from "./About/About";
// import {useSelector} from "react-redux";
// import {selectIsLoading} from "../../../store/reducers/dataReducer";
// import {RotatingLines} from 'react-loader-spinner';
// import ExpertList from "./ExpertList/ExpertList";
//
// const MainPage = () => {
//   const isLoading = useSelector(selectIsLoading);
//   if (isLoading) return <div style={{'textAlign': 'center', 'padding': 50}}><RotatingLines strokeColor="#4481c3"/></div>
//   return (
//     <>
//       <About/>
//       <ExpertList/>
//     </>
//   )
// }
//
// export default MainPage;


import About from "./About/About";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchExperts,
  fetchOtherData,
  selectIsLoading,
  selectWallet, setRoundData,
  setWallet
} from "../../../store/reducers/dataReducer";
import {RotatingLines} from 'react-loader-spinner';
import ExpertList from "./ExpertList/ExpertList";
import {useAccount, useBalance, useConnect, useContractWrite, useEnsName} from 'wagmi'
import {InjectedConnector} from 'wagmi/connectors/injected'

//
import {Web3Button, Web3NetworkSwitch} from '@web3modal/react'
import {ethers} from "ethers"
import {usePrepareContractWrite} from 'wagmi'
import {useContractRead} from 'wagmi'
import {useEffect} from "react";
import {store} from "../../../index";

//
const MainPage = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchExperts())
    dispatch(fetchOtherData())

// будет потом подтягиваться санкой из АПИ
    dispatch(setRoundData({
      status: 1,
      timeLeft: 202530,
    }))
  }, [])


  const isMainPageLoading = useSelector(selectIsLoading);
  if (isMainPageLoading) return <div style={{'textAlign': 'center', 'padding': 50}}><RotatingLines
    strokeColor="#4481c3"/></div>


  return (
    <>
      <About/>
      <ExpertList/>

    </>
  )
}

export default MainPage;
