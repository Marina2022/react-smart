import Header from "../Header/Header";
import MainPage from "../../pages/MainPage/MainPage";
import {Route, Routes, useNavigate} from "react-router-dom";
import Role from "../../pages/Role/Role";
import EditExpertProfile from "../../pages/EditExpertProfile/EditExpertProfile";
import ExpertProfile from "../../pages/ExpertProfile/ExpertProfile";
import UserProfile from "../../pages/UserProfile/UserProfile";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork
} from "wagmi";
import {useEffect, useState} from "react";
import {
  selectConnectIsShown, selectIsUserRegistered,
  selectWallet,
  setConnectIsShown,
  setIsUserRegistered,
  setWallet
} from "../../../store/reducers/dataReducer";
import {ethers} from "ethers";
import {useDispatch, useSelector} from "react-redux";
import {CONTRACT_ADDRESS, MainContract_abi, USDT_ADDRESS, USDT_abi} from "../../../consts";

const PageWrapper = () => {

  const {address, isConnected} = useAccount()

  const {data, isError, isLoading} = useBalance({
    address: address,
  })

  const connectModalIsShown = useSelector(selectConnectIsShown)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {switchNetwork} = useSwitchNetwork()

  const {config: registerConfig, error: errRegister} = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: MainContract_abi,
    functionName: 'register',

  });

  const {write: register} = useContractWrite(registerConfig)

  // не получилось сделать как выше, поэтому сделал вот так, так тоже сразу можно, но будет дольше транза готовиться, тк конфиг сосздается в момент нажатия
  const {
    data: approveData,
    isLoading: isLoadApprove,
    isSuccess: isSuccessApprove,
    write: approveUsdt
  } = useContractWrite({
    address: USDT_ADDRESS,
    abi: USDT_abi,
    functionName: 'approve',
    args: [CONTRACT_ADDRESS, 0] // вместо нуля надо сумму которую пользователь хочет задонатить
  })

  const {
    data: DonateData,
    isLoading: isLoadDonate,
    isSuccess: isSuccessDonate,
    write: donateInUsdt
  } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: MainContract_abi,
    functionName: 'donateInUSDT',
    args: [0, 1 * 10 ** 18] //аналогично, но тут пока 1 токен донатится и id эксперта 0
  })

  const {data: ApprovalData, isError: readApproveError, isLoading: isLoadingApprovalRead} = useContractRead({ //вот эта штука смотрит сколько approve в токенах
    address: USDT_ADDRESS,
    abi: USDT_abi,
    functionName: 'allowance',
    args: [address, CONTRACT_ADDRESS]
  })
  console.log(ApprovalData)


  if (isSuccessDonate) console.log('Задоначено')
  if (isLoadDonate) console.log('донат производится...')
  //

  const isUserRegistered = useSelector(selectIsUserRegistered) // берем из редакса значение - зареган или нет

  const {isRegistered} = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: MainContract_abi,
    functionName: 'isUserRegistered',
    args: [address],
    onError(error) {
      console.log('Ошибка', error)
    },
    onSuccess(data) {
      console.log('Юзер зареган:', data)
      dispatch(setIsUserRegistered(data))
      // setShowButton(!data)  // - теперь показ кнопок зависит от значения isUserRegistered из редакса
    },
  })

  useEffect(() => {
    if (isConnected) {
      if (switchNetwork) switchNetwork(80001)
      if (isRegistered) isRegistered()  // вызываем функцию (если хук useContractRead успел отработать и функция есть)


      if (data) {  // почему-то ошибка вылетает иногда, что data - undefined.
        dispatch(setWallet({
          number: address,
          balance: ethers.formatUnits(data.value, data.decimals).slice(0, -15),
        }))
      }
      if (connectModalIsShown) {
        dispatch(setConnectIsShown(false));
        navigate('role')
      }
    }
  }, [isConnected, data, isUserRegistered])

  return (
    <>
      {!isUserRegistered && isConnected && <button
        onClick={() => register()}
        style={{'padding': 20, 'border': '2px red solid', 'position': 'absolute', 'right': 180, 'top': 10, 'borderRadius': 15, 'backgroundColor':'#fff'}}
      >Register</button>}

      {/*теперь донатим по кнопке Donate - в списке экспертов*/}

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
