import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'codelab-quiz-intro',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent {

  constructor(private router: Router) {}

  startQuiz() {
    this.router.navigateByUrl('/question/1');
  }
}
