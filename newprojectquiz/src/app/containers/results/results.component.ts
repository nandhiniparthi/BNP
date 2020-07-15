import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { QuizQuestion } from '../../model/QuizQuestion';


@Component({
  selector: 'codelab-quiz-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  @Input() answer: string;
  @Input() question: QuizQuestion;
  totalQuestions: number;
  allQuestions: QuizQuestion[];
  correctAnswersCount: number;
  percentage: number;
  
  constructor(private router: Router) {
    this.totalQuestions = this.router.getCurrentNavigation().extras.state.totalQuestions;
    this.correctAnswersCount = this.router.getCurrentNavigation().extras.state.correctAnswersCount;
    this.allQuestions = this.router.getCurrentNavigation().extras.state.allQuestions;
  }

  ngOnInit() {
    this.percentage = Math.round(100 * this.correctAnswersCount / this.totalQuestions);
  }
}
