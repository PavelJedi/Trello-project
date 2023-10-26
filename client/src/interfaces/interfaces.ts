export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
}

export interface ErrorState {
  hasMessageError: boolean;
  hasNameError: string;
  hasEmailError: boolean;
  hasPasswordError: boolean;
}

export interface ShowPasswordState {
  current: boolean;
  confirm: boolean;
}

