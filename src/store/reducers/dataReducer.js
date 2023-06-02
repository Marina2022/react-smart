import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit'
import {api} from '../../index'
import {APIRoutes} from '../../consts'
import history from "../../browserHistory";
import mockExperts from "../../mocks/mockExperts";

export const fetchExperts = createAsyncThunk('data/fetchExperts',
  async () => {
    const data = await api.post(APIRoutes.getAllExpert, {}, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '74803c46-6f65-4aac-90b1-44d147938011'
        }
      }
    );
    //return data.data.data;
    return mockExperts;
  })


export const fetchOtherData = createAsyncThunk('data/fetchOtherData',
  async () => {
    const data = await api.post(APIRoutes.getOtherInfo, {}, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '74803c46-6f65-4aac-90b1-44d147938011'
        }
      }
    );
    // console.log(data.data)
    return data.data;
  })

export const fetchOneExpert = createAsyncThunk('data/fetchOneExpert',
  async (id) => {
    const data = await api.post(APIRoutes.Experts, {expertId: id}, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '74803c46-6f65-4aac-90b1-44d147938011'
        }
      }
    );
    return data.data;
  })

export const sendExpert = createAsyncThunk('data/sendExpert',
  async ({sendData, file}) => {
    //async ({sendData1, file}) => {

    //const data = await api.post(APIRoutes.sendExpert, sendData, {
    const data = await api.post(APIRoutes.sendExpert, sendData, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '74803c46-6f65-4aac-90b1-44d147938011'
      }
    });

    if (file) {
      const formData1 = new FormData();
      formData1.append('file', file);
      formData1.append('expertId', sendData.expertId);

      const result = await api.post(APIRoutes.uploadImage, formData1, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-api-key': '74803c46-6f65-4aac-90b1-44d147938011'
        }
      });
    }
    return sendData.expertId;
  })

const initialState = {
  experts: [],
  isLoading: false,
  wallet: null,
  role: null,
  round: {},
  connectIsShown: false,
  walletType: null,
  formIsSubmitting: false,
  currentExpertId: null,
  currentExpert: null,
  isOneExpertLoading: false
}

const dataReducer = createSlice({
  name: 'DATA',
  initialState,
  reducers: {
    setRoundData: (state, action) => {
      state.round = action.payload
    },
    setConnectIsShown: (state, action) => {
      state.connectIsShown = action.payload
    },

    setWalletType: (state, action) => {
      state.walletType = action.payload
    },

    setWallet: (state, action) => {
      state.wallet = action.payload
    },

    setUserRole: (state, action) => {
      state.role = action.payload
    },
    setFormIsSubmitting: (state, action) => {
      state.formIsSubmitting = action.payload
    },

    setIsVoted: (state, action) => {
      const id = action.payload;
      const targetExpertIndex = state.experts.findIndex((expert) => {
        return expert.expert.id === id
      })
      const newTargetExpert = Object.assign(state.experts[targetExpertIndex], {isVoted: true})
      state.experts = [...state.experts.slice(0, targetExpertIndex), newTargetExpert, ...state.experts.slice(targetExpertIndex + 1)]
    },
  },

  extraReducers: (builder) => builder
    .addCase(fetchExperts.pending, (state, action) => {
      state.isLoading = true
    })
    .addCase(fetchExperts.fulfilled, (state, action) => {

      const experts = action.payload


      // авторизация для эксперта, который раньше уже регистрировался
      experts.forEach((expert) => {
        if (state.wallet) {
          if (expert.expert.address === state.wallet.number) {
            state.currentExpertId = expert.expert.id
            state.role = 'expert'
          }
        }
      })


        // проверяем, не проголосовал ли юзер за эксперта в прошлое посещение сайта
        experts.forEach((expert) => {
          if (expert.donates.find((item) => {
            let found = false;
            if (state.wallet) { // если кошелек подключен
              found = item._sender === state.wallet.number
            }
            return found
          })) {
            expert.isVoted = true
          } else {
            expert.isVoted = false
          }
        })
        state.experts = experts
        state.isLoading = false
//      console.log(experts)
      })
        .addCase(fetchExperts.rejected, (state, action) => {
          console.log('experts fetching error ')
          state.isLoading = false
        })

        .addCase(sendExpert.pending, (state, action) => {
          state.formIsSubmitting = true;
        })

        .addCase(sendExpert.fulfilled, (state, action) => {
          state.currentExpertId = action.payload
          state.formIsSubmitting = false
          history.push('/expertProfile/' + state.currentExpertId);
        })
        .addCase(sendExpert.rejected, (state, action) => {
          console.log('expert uploading error ')
          state.formIsSubmitting = false
        })
        .addCase(fetchOneExpert.pending, (state, action) => {
          state.isOneExpertLoading = true;
        })
        .addCase(fetchOneExpert.fulfilled, (state, action) => {
          state.currentExpert = action.payload
          state.isOneExpertLoading = false
        })
        .addCase(fetchOneExpert.rejected, (state, action) => {
          console.log('expert downloading error ')
          state.isOneExpertLoading = false
        })
    })

  export const {
    setRoundData,
    setConnectIsShown,
    setWalletType,
    setWallet,
    setUserRole,
    setIsVoted
  } = dataReducer.actions

  export default dataReducer.reducer

  export const selectExperts = (state) => state.DATA.experts
  export const selectIsLoading = (state) => state.DATA.isLoading
  export const selectRound = (state) => state.DATA.round
  export const selectWallet = (state) => state.DATA.wallet
  export const selectConnectIsShown = (state) => state.DATA.connectIsShown
  export const selectWalletType = (state) => state.DATA.walletType
  export const selectCurrentExpertId = (state) => state.DATA.currentExpertId
  export const selectFormIsSubmitting = (state) => state.DATA.formIsSubmitting
  export const selectCurrentExpert = (state) => state.DATA.currentExpert
  export const selectIsOneExpertLoading = (state) => state.DATA.isOneExpertLoading
  export const selectRole = (state) => state.DATA.role
