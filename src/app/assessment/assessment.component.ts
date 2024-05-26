import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';


@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})

export class AssessmentComponent implements OnInit {
  questionForm!: FormGroup;
  score: number = 0;
  Total: number = 0;

  Questions = [
    {
      questionText: 'What is Angular?',
      options: ['Framework', 'Library', 'Language', 'Tool'],
      correctAnswer: 0,

    },
    {
      questionText: 'What is TypeScript?',
      options: ['Superset of JavaScript', 'Programming Language', 'CSS Preprocessor', 'JavaScript Library'],
      correctAnswer: 0
    },
    {
      questionText: 'On which of the Architectural pattern AngularJS is based?',
      options: ['Observer Pattern', 'Decorator pattern', 'MVC Architecture pattern', 'MVVM Architectural pattern'],
      correctAnswer: 3
    },
    {
      questionText: 'AngularJS is perfect for?',
      options: ['SPAs', 'MPAs', 'DPAs', 'CPAs'],
      correctAnswer: 0
    },
    {
      questionText: 'Which of the following is the correct syntax for writing AngularJS expressions?',
      options: ['(expression)', '{{expression}}', '{{{expression}}}', '[expression]'],
      correctAnswer: 1
    },
    {
      questionText: 'Which of the following is an advantage of AngularJS?',
      options: ['AngularJS code is unit testable', 'AngularJS provides reusable components', 'AngularJS uses dependency injection and makes use of separation of concerns', 'All of the above'],
      correctAnswer: 3
    },
    {
      questionText: 'Which of the following statement is true about $dirty flag?',
      options: ['$dirty flag is used to state that value has been changed', '$dirty flag is used to state that the form has invalid data', 'Both of the above', 'None of the above'],
      correctAnswer: 0
    },
    {
      questionText: 'What is the use of Angular Controllers in the application?',
      options: ['Angular controllers are used for controlling the data', 'Angular controllers are used for displaying the data', 'Both of the above', 'None of the above'],
      correctAnswer: 0
    },
    {
      questionText: 'Which of the following syntax is used to create a module in AngularJS?',
      options: ['var myModule= angular.module();', 'var myModule= new Module();', 'module("app", []);', 'None of the above'],
      correctAnswer: 2
    },
    {
      questionText: 'Which of the following is used to share data between controller and view in AngularJS?',
      options: ['using Model', 'using services', 'using factory', 'using $scope'],
      correctAnswer: 0
    },
  ]

  constructor(private fb: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      'questions': this.fb.array(this.Questions.map(item => this.createItem(item)))
    });
  }

  private createItem(item: any) {
    return this.fb.group({
      Answer: ['', [Validators.required]],

    });
  }

  getValidity(i: any) {
    return (<FormArray>this.questionForm.get('questions')).controls[i].invalid && (<FormArray>this.questionForm.get('questions')).controls[i].touched;
  }

  finalScore(): void {
    var total = 0;
    this.questionForm.get('questions')?.markAllAsTouched();
    this.questionForm.updateValueAndValidity();
    if (this.questionForm.valid) {

      this.Total = this.getScore(total);
      console.log(" Total Value is : ", this.Total);
      if (this.Total < 60) {
        this.dialog.open(AlertDialogComponent, {
          data: { score: this.Total },
          width: "350px",
          height: "250px"
        }).afterClosed().subscribe(val => {
          this.onClose();
        });
      }
      else {
        this.dialog.open(AlertDialogComponent, {
          data: { score: this.Total },
          width: "350px",
          height: "250px"
        }).afterClosed().subscribe(val => {
          this.onClose();
        });
      }
    }
  }

  onItemChange(value: any, i: number) {
    const correctAnswer: any = this.Questions[i].correctAnswer;
    if (value === correctAnswer) {
      this.score += 10;
    }
    this.getScore(this.score);

  }

  getScore(total: number): number {
    return this.Total = this.score;
  }

  onClose() {
    this.resetForm();
  }

  resetForm() {
    this.questionForm.reset();
    this.score = 0;
    this.Total = 0;
  }
}

