export interface User {
  _id?: string;
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
  _id: string;
  title: string;
  description: string;
  owner: User;
  members: User[];
  createdAt: Date;
  backgroundColor?: string;
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

export interface Column {
  _id: string;
  boardId: string;
  title: string;
  position: number;
  tasks: Task[];
  createdAt: Date;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  assignee: string | null;
  columnId: string;
  position: number;
  dueDate: Date | null;
  labels: string[];
  attachments: Array<{
    name: string;
    path: string;
    url: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
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
