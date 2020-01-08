import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  nominationForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // Init Nomination Form
    this.nominationForm = this.fb.group({
      candidates: this.fb.array([this.fb.group({
        et: ['', Validators.required],
        name: ['', Validators.required],
        dept: ['', Validators.required],
      })]),
      tier: '',
      valor: ''
    });
  }

  get candidates() {
    return this.nominationForm.get('candidates') as FormArray;
  }

  addCandidate() {
    this.candidates.push(this.fb.group({
      et: ['', Validators.required],
      name: ['', Validators.required],
      dept: ['', Validators.required],
    }));
  }

  deleteCandidate(index) {
    this.candidates.removeAt(index);
  }
}
