export interface User {
  id?: string;
  name?: string;
  email: string;
  password?: string;
}

export interface LoginData {
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

export interface Board {
  id: string;
  title: string;
  description: string;
  owner: User;
  members: User[];
  createdAt: Date;
}

export interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null | undefined;
}

export interface BoardState {
  boards: Board[];
  isLoading: boolean;
  error: string | null;
}
export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  columnId: string;
  position: number;
  dueDate: Date;
  labels: string[];
  attachments: Array<{
    name: string;
    url: string;
  }>;
  createdAt: Date;
}

export interface InputFieldProps {
  type: string;
  name: string;
  value: string;
  placeholder: string;
  icon: JSX.Element;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
}
export interface PasswordInputProps {
  value: string;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ErrorMessageProps {
  message: string;
}
