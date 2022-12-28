import { AutocompleteOption } from '../types/AutocompleteOption';
import { Rectangle } from '../types/Rectangle';

export type State = {
  minLength: number;
  optionsVisible: boolean;
  options: AutocompleteOption[];
  reference: Rectangle;
  value: string;
  selectedId: string | null;
};

export const initialState: State = {
  minLength: 2,
  optionsVisible: false,
  options: [],
  reference: { x: 0, y: 0, width: 0, height: 0 },
  value: '',
  selectedId: null,
};

export type ActionShowOptions = {
  type: 'SHOW_OPTIONS';
};

export type ActionHideOptions = {
  type: 'HIDE_OPTIONS';
};

export type ActionToggleOptions = {
  type: 'TOGGLE_OPTIONS';
};

export type ActionSetValue = {
  type: 'SET_VALUE';
  payload: string;
};

export type ActionSetOptions = {
  type: 'SET_OPTIONS';
  payload: {
    options: AutocompleteOption[];
    value: string;
  };
};

export type ActionSelectOptions = {
  type: 'SELECT_OPTION';
  payload: AutocompleteOption | null;
};

export type ActionSetReference = {
  type: 'SET_REFERENCE';
  payload: Rectangle;
};

export type Action =
  | ActionShowOptions
  | ActionHideOptions
  | ActionToggleOptions
  | ActionSetValue
  | ActionSetOptions
  | ActionSelectOptions
  | ActionSetReference;

const couldOptionsBeVisible = (state: State) => {
  return state.value.length >= state.minLength && state.options.length > 0;
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SHOW_OPTIONS':
      return {
        ...state,
        optionsVisible: couldOptionsBeVisible(state),
      };
    case 'HIDE_OPTIONS':
      return {
        ...state,
        optionsVisible: false,
      };
    case 'TOGGLE_OPTIONS':
      if (state.optionsVisible) {
        return {
          ...state,
          optionsVisible: false,
        };
      }

      return {
        ...state,
        optionsVisible: couldOptionsBeVisible(state),
      };
    case 'SET_VALUE':
      // eslint-disable-next-line no-case-declarations
      const selectedOption = state.options.find(
        (option) => option.text === action.payload,
      );

      // eslint-disable-next-line no-case-declarations
      const newState = {
        ...state,
        value: action.payload,
        selectedId: selectedOption?.id ?? null,
      };

      newState.optionsVisible = couldOptionsBeVisible(newState);

      return newState;
    case 'SET_OPTIONS':
      if (state.value !== action.payload.value) {
        return state;
      }

      return {
        ...state,
        options: action.payload.options,
        optionsVisible: true,
      };
    case 'SELECT_OPTION':
      return {
        ...state,
        value: action.payload?.text ?? '',
        selectedId: action.payload?.id ?? null,
        optionsVisible: false,
      };
    case 'SET_REFERENCE':
      return {
        ...state,
        reference: { ...action.payload },
      };
    default:
      throw new Error(`Unhandled action "${JSON.stringify(action)}"`);
  }
};
