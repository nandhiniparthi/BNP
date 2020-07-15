import { Option } from './Option';

export interface QuizQuestion {
  questionId: number;
  questionText: string;
  options: Option[];
  answer: string;
  
  selectedOption: string;
}
