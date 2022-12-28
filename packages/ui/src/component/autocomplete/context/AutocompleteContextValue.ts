import { AutocompleteOption } from '../types/AutocompleteOption';
import { Rectangle } from '../types/Rectangle';

export type AutocompleteContextValue = {
  minLength: number;
  optionsVisible: boolean;
  options: AutocompleteOption[];
  reference: Rectangle;
  value: string;
  selectedId: string | null;
  showOptions: () => void;
  hideOptions: () => void;
  toggleOptions: () => void;
  setValue: (value: string) => void;
  selectOption: (option: AutocompleteOption | null) => void;
  setReference: (reference: Rectangle) => void;
};
