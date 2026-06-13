import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type PowerState = 'OFF' | 'ON' | 'BOOTING';

interface SystemState {
  powerState: PowerState;
}


const initialState: SystemState = {
  powerState: 'ON',
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setPowerState: (state, action: PayloadAction<PowerState>) => {
      state.powerState = action.payload;
    },
  },
});

export const { setPowerState } = systemSlice.actions;

export default systemSlice.reducer;