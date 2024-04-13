import create from 'zustand';

interface Token {
    accessToken: string;
    // Otros campos del token, si los hay
  }

interface State {
  token: Token | null;
  setToken: (newToken: Token | null) => void;
}

const useStore = create<State>((set) => ({
  token: null,
  setToken: (newToken) => set({ token: newToken }),
}));

export default useStore;
