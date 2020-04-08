import {IValues} from './IValues';

export interface IProps {
  id: number;
  category: string;
  type: string;
  alias: string;
  title: string;
  values: IValues[];
  icon: string;
}
