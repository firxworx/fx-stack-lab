import { createMachine } from 'xstate'

export interface UserData {
  // basic
  name: string | null
  surname: string | null

  // contact
  email: string | null
  phone: string | null

  // address
  street: string | null
  city: string | null
  code: string | null
  country: string | null

  // billing
  account: string | null
  creaditCardNo: string | null
  creditCardExp: string | null
  creditCardCvv: string | null
}

export enum UserDataStates {
  init = 'init',
  basic = 'basic',
  address = 'address',
  payment = 'payment',
  complete = 'complete',
}

export const USER_DATA_STATES = ['init', 'basic', 'address', 'payment', 'complete'] as const
export type UserDataState = (typeof USER_DATA_STATES)[number]

export interface UserDataMachineStates {
  states: Record<UserDataState, Record<string, unknown>>
}

export enum UserDataEvents {
  BASIC = 'BASIC',
  ADDRESS = 'ADDRESS',
  PAYMENT = 'PAYMENT',
  NEXT = 'NEXT',
  BACK = 'BACK',
}

const userRegisterMachine = createMachine({
  id: 'userDataMachine',
  initial: 'init',
  states: {
    init: {
      on: {
        BASIC: 'basic',
        ADDRESS: 'address',
        PAYMENT: 'payment',
      },
    },
    basic: {
      on: {
        NEXT: 'address',
      },
    },
    address: {
      on: {
        NEXT: 'payment',
        BACK: 'basic',
      },
    },
    payment: {
      on: {
        NEXT: 'complete',
        BACK: 'address',
      },
    },
    complete: {
      on: {
        BACK: 'payment',
      },
    },
  },
})
