import { create } from 'zustand';

interface RegistrationState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: Date | null;
  clubId: string;
  chdId: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setDob: (dob: Date | null) => void;
  setClubId: (clubId: string) => void;
  setChdId: (chdId: string) => void;
  reset: () => void;
}

export const useRegistrationStore = create<RegistrationState>((set) => ({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dob: null,
  clubId: '',
  chdId: '',
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setDob: (dob) => set({ dob }),
  setClubId: (clubId) => set({ clubId }),
  setChdId: (chdId) => set({ chdId }),
  reset: () => set({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: null,
    clubId: '',
    chdId: '',
  }),
})); 