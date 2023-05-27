import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit'
import {api, store} from '../../index'
import {APIRoutes} from '../../consts'
import history from "../../browserHistory";

export const fetchExperts = createAsyncThunk('data/fetchExperts',
  async () => {
    const data = await api.post(APIRoutes.Experts, {expertId: 1685177137}, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '74803c46-6f65-4aac-90b1-44d147938011'
        }
      }
    );
    return [data.data, data.data, data.data, data.data, data.data];
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
  // wallet: {
  //   number: '0x2o39u423094u',
  //   balance: 256,
  //   donated: 30
  // },
  role: null,  // student / expert,
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
    }
  },

  extraReducers: (builder) => builder
    .addCase(fetchExperts.pending, (state, action) => {
      state.isLoading = true
    })
    .addCase(fetchExperts.fulfilled, (state, action) => {
      state.experts = action.payload
      state.isLoading = false
    })
    .addCase(fetchExperts.rejected, (state, action) => {
      console.log('fetching error ')
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
      console.log('set Expert error ')
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
      console.log('load Expert error ')
      state.isOneExpertLoading = false
    })


})

export const {
  setRoundData,
  setConnectIsShown,
  setWalletType,
  setWallet,
  setUserRole
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


