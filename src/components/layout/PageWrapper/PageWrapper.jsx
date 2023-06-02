import Header from "../Header/Header";
import MainPage from "../../pages/MainPage/MainPage";
import {Route, Routes, useNavigate} from "react-router-dom";
import Role from "../../pages/Role/Role";
import EditExpertProfile from "../../pages/EditExpertProfile/EditExpertProfile";
import ExpertProfile from "../../pages/ExpertProfile/ExpertProfile";
import UserProfile from "../../pages/UserProfile/UserProfile";
import {useAccount, useBalance, useNetwork, useSwitchNetwork} from "wagmi";
import {useEffect} from "react";
import {selectConnectIsShown, selectWallet, setConnectIsShown, setWallet} from "../../../store/reducers/dataReducer";
import {ethers} from "ethers";
import {useDispatch, useSelector} from "react-redux";

const PageWrapper = () => {

  const {address, isConnected} = useAccount()

  const {data, isError, isLoading} = useBalance({
    address: address,
  })

  const connectModalIsShown = useSelector(selectConnectIsShown)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {switchNetwork} = useSwitchNetwork()

  useEffect(() => {

    if (isConnected) {
      if (switchNetwork) switchNetwork(80001)
      dispatch(setWallet({
        number: address,
        balance: ethers.formatUnits(data.value, data.decimals).slice(0, -15),
        donated: null
      }))
      if (connectModalIsShown) {
        dispatch(setConnectIsShown(false));
        navigate('role')
      }
    }

  }, [isConnected])

  return (
    <>
      <Header/>
      <Routes>
        <Route path={'/'} element={<MainPage/>}/>
        <Route path={'/role'} element={<Role/>}/>
        <Route path={'/edit'} element={<EditExpertProfile/>}/>
        <Route path={'/expertProfile/:id'} element={<ExpertProfile/>}/>
        <Route path={'/profile'} element={<UserProfile/>}/>
        <Route path={'*'} element={<div style={{'textAlign': 'center', 'marginTop': 100}}>Страница не найдена</div>}/>
      </Routes>
    </>
  )
}

export default PageWrapper;
