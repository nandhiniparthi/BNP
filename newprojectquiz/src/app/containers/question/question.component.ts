import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { QuizQuestion } from '../../model/QuizQuestion';

@Component({
  selector: 'codelab-question-container',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() answer: string;
  @Input() formGroup: FormGroup;
  @Output() question: QuizQuestion;
  totalQuestions: number;
  completionTime: number;
  correctAnswersCount = 0;

  questionID = 0;
  currentQuestion = 0;
  questionIndex: number;
  correctAnswer: boolean;
  hasAnswer: boolean;
  disabled: boolean;
  quizIsOver: boolean;
  progressValue: number;
  timeLeft: number;
  timePerQuestion = 20;
  interval: any;
  
  blueBorder = '2px solid #007aff';

  allQuestions: QuizQuestion[] = [
    {
      questionId: 1,
      questionText: '.MOV extension refers usually to what kind of file?',
      options: [
        { optionValue: '1', optionText: 'Image file.' },
        { optionValue: '2', optionText: 'Animation/movie file.' },
        { optionValue: '3', optionText: 'Audio file.' },
        { optionValue: '4', optionText: 'MS Office document.' }
      ],
      answer: '2',
      selectedOption: ''
    },
    {
      questionId: 2,
      questionText: 'The purpose of choke in tube light is ?',
      options: [
        { optionValue: '1', optionText: 'To decrease the current.' },
        { optionValue: '2', optionText: 'To increase the current.' },
        { optionValue: '3', optionText: 'To decrease the voltage momentarily.' },
        { optionValue: '4', optionText: 'To increase the voltage momentarily.' },
      ],
      answer: '4',
      selectedOption: ''
    },
    {
      questionId: 3,
      questionText: ' Garampani sanctuary is located at',
      options: [
        { optionValue: '1', optionText: 'Junagarh, Gujarat' },
        { optionValue: '2', optionText: 'Diphu, Assam' },
        { optionValue: '3', optionText: 'Kohima, Nagaland' },
        { optionValue: '4', optionText: '	Gangtok, Sikkim' }
      ],
      answer: '2',
      selectedOption: ''
    },
    {
      questionId: 4,
      questionText: 'In which of the following does dependency injection occur?',
      options: [
        { optionValue: '1', optionText: '@Injectable()' },
        { optionValue: '2', optionText: 'constructor' },
        { optionValue: '3', optionText: 'function' },
        { optionValue: '4', optionText: 'NgModule' },
      ],
      answer: '2', 
      selectedOption: ''
    },
    {
      questionId: 5,
      questionText: 'In SOLID principle, O stands for:',
      options: [
        { optionValue: '1', optionText: 'Require in the component.' },
        { optionValue: '2', optionText: 'Provide in the module.' },
        { optionValue: '3', optionText: 'Open-Closed Principle' },
        { optionValue: '4', optionText: 'Object Oriented Programming' }
      ],
      answer: '3',
      selectedOption: ''
    },
    {
      questionId: 6,
      questionText: 'MVC, MVP and MVVP are related to which layer of software architecture?',
      options: [
        { optionValue: '1', optionText: 'Data Access Layer' },
        { optionValue: '2', optionText: 'Business/Service Layer' },
        { optionValue: '3', optionText: 'Third Party Library' },
        { optionValue: '4', optionText: 'User Interface' }
      ],
      answer: '4',
     
      selectedOption: ''
    },
    {
      questionId: 7,
      questionText: 'Which of the following is NOT the method of an Array?',
      options: [
        { optionValue: '1', optionText: '.map()' },
        { optionValue: '2', optionText: '.includes()' },
        { optionValue: '3', optionText: '.subscribe()' },
        { optionValue: '4', optionText: '.flatMap()' }
      ],
      answer: '3',
     
      selectedOption: ''
    },
    {
      questionId: 8,
      questionText: 'Which tag asp:Label control by default renders to?',
      options: [
        { optionValue: '1', optionText: 'div' },
        { optionValue: '2', optionText: 'span' },
        { optionValue: '3', optionText: 'body' },
        { optionValue: '4', optionText: 'label.' }
      ],
      answer: '2',
      
      selectedOption: ''
    },
    {
      questionId: 9,
      questionText: 'Which is the correct order of Page life-cycle in asp.net webform?',
      options: [
        { optionValue: '1', optionText: 'Init, PreRender, Load' },
        { optionValue: '2', optionText: 'Load, PreRender, Init' },
        { optionValue: '3', optionText: 'Init, Load, PreRender' },
        { optionValue: '4', optionText: 'None of the above' }
      ],
      answer: '3',
     
      selectedOption: ''
    },
    {
      questionId: 10,
      questionText: 'Which ES6 feature helps in merging of a number of changed properties into an existing object?',
      options: [
        { optionValue: '1', optionText: 'Class syntex' },
        { optionValue: '2', optionText: 'Object.assign()' },
        { optionValue: '3', optionText: 'map data structure' },
        { optionValue: '4', optionText: 'Array.includes(obj);' }
      ],
      answer: '2',
      
      selectedOption: ''
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(params => {
      this.setQuestionID(+params.get('questionId'));  
      this.question = this.getQuestion;
    });
  }

  ngOnInit() {
    this.question = this.getQuestion;
    this.totalQuestions = this.allQuestions.length;
    this.timeLeft = this.timePerQuestion;
    this.progressValue = 100 * (this.currentQuestion + 1) / this.totalQuestions;
    this.countdown();
  }

  displayNextQuestion() {
    this.resetTimer();
    this.increaseProgressValue();

    this.questionIndex = this.questionID++;

    if (typeof document.getElementById('question') !== 'undefined' && this.getQuestionID() <= this.totalQuestions) {
      document.getElementById('question').innerHTML = this.allQuestions[this.questionIndex]['questionText'];
      document.getElementById('question').style.border = this.blueBorder;
    } else {
      this.navigateToResults();
    }
  }

  

  navigateToNextQuestion(): void {
    this.router.navigate(['/question', this.getQuestionID() + 1]);
    this.displayNextQuestion();
  }

  

  navigateToResults(): void {
    this.router.navigate(['/results'], { state:
      {
        totalQuestions: this.totalQuestions,
        correctAnswersCount: this.correctAnswersCount,
        completionTime: this.completionTime,
        allQuestions: this.allQuestions
      }
    });
  }


  checkIfAnsweredCorrectly() {
    if (this.isThereAnotherQuestion() && this.isCorrectAnswer()) {
      this.incrementCorrectAnswersCount();
      this.correctAnswer = true;
      this.hasAnswer = true;
      this.disabled = false;

     

      this.quizDelay(3000);

      if (this.getQuestionID() < this.totalQuestions) {
        this.navigateToNextQuestion();
      } else {
        this.navigateToResults();
      }
    }
  }

  incrementCorrectAnswersCount() {
    if (this.questionID <= this.totalQuestions && this.isCorrectAnswer()) {
      if (this.correctAnswersCount === this.totalQuestions) {
        return this.correctAnswersCount;
      } else {
        this.correctAnswer = true;
        this.hasAnswer = true;
        return this.correctAnswersCount++;
      }
    } else {
      this.correctAnswer = false;
      this.hasAnswer = false;
    }
  }

  increaseProgressValue() {
    this.progressValue = parseFloat((100 * (this.getQuestionID() + 1) / this.totalQuestions).toFixed(1));
  }

  

  calculateTotalElapsedTime(elapsedTimes) {
    return this.completionTime = elapsedTimes.reduce((acc, cur) => acc + cur, 0);
  }

 
  getQuestionID() {
    return this.questionID;
  }

  setQuestionID(id: number) {
    return this.questionID = id;
  }

  isThereAnotherQuestion(): boolean {
    return this.questionID <= this.allQuestions.length;
  }

  isFinalQuestion(): boolean {
    return this.currentQuestion === this.totalQuestions;
  }

  isCorrectAnswer(): boolean {
    return this.question.selectedOption === this.question.answer;
  }

  get getQuestion(): QuizQuestion {
    return this.allQuestions.filter(
      question => question.questionId === this.questionID
    )[0];
  }

  private countdown() {
    if (this.questionID <= this.totalQuestions) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.checkIfAnsweredCorrectly();

          
          if (this.timeLeft === 0 && !this.isFinalQuestion()) {
            this.navigateToNextQuestion();
          }
          if (this.timeLeft === 0 && this.isFinalQuestion()) {
            this.navigateToResults();
          }
          if (this.isFinalQuestion() && this.hasAnswer === true) {
            this.navigateToResults();
            this.quizIsOver = true;
          }

          
          this.question.selectedOption === '' ? this.disabled = true : this.disabled = false;
        }
      }, 1000);
    }
  }

  private resetTimer() {
    this.timeLeft = this.timePerQuestion;
  }

  quizDelay(milliseconds) {
    const start = new Date().getTime();
    let counter = 0;
    let end = 0;

    while (counter < milliseconds) {
      end = new Date().getTime();
      counter = end - start;
    }
  }
}






















