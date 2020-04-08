import {CategoryValuesDto} from './CategoryValuesDto';

export interface CategoryDto {
  id: number;
  category: string;
  type: string;
  alias: string;
  title: string;
  values: CategoryValuesDto[];
  icon: string;
}
