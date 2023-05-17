import { regex } from "./constants";

export const registerEmail = {
  required: 'Введите E-mail',
  pattern: {
    value: regex.email,
    message: 'E-mail введен некорректно',
  },
}

export const registerPassword = {
  required: 'Введите пароль',
  minLength: {
    value: 6,
    message: 'Минимум 6 символа',
  },
  maxLength: {
    value: 32,
    message: 'Максимум 32 символа',
  },
  pattern: {
    value: regex.password,
    message: 'Только латинские буквы'
  }
}

export const registerText = {
  required: 'Обязательное поле для ввода',
  minLength: {
    value: 2,
    message: 'Минимум 2 символа',
  },
  maxLength: {
    value: 32,
    message: 'Максимум 32 символа',
  },
}