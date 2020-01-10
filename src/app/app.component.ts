import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { PeoplePickerService } from './services/people-picker.service';
import { PeoplePickerUser } from './models/people-picker.response';
import { PeoplePickerQuery } from './models/people-picker.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  nominationForm: FormGroup;
  ppUserOptions: PeoplePickerUser[];
  spuser: PeoplePickerUser;
  spusers: PeoplePickerUser[];
  peoplePickerQuery: PeoplePickerQuery = {
    queryParams: {
      QueryString: '',
      MaximumEntitySuggestions: 10,
      AllowEmailAddresses: true,
      AllowOnlyEmailAddresses: false,
      PrincipalSource: 15,
      PrincipalType: 1,
      SharePointGroupID: 0
    }
  };
  filteredCountriesMultiple: any[];

  constructor(
    private fb: FormBuilder,
    private ppService: PeoplePickerService
  ) { }

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

    // this.setFilterUsersEventListener(this.candidates.get('name')[0]);
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

    // this.setFilterUsersEventListener(this.candidates.get('name')[this.candidates.length - 1]);
  }

  deleteCandidate(index) {
    this.candidates.removeAt(index);
  }

  // setFilterUsersEventListener(control: FormControl) {
  //   control.valueChanges.subscribe(() => this.filterSPUsers(control.value));
  // }

  displayFn(user?: PeoplePickerUser): string | undefined {
    return user ? user.DisplayText : undefined;
  }

  filterSPUserSingle(event) {
    this.filterSPUsers(event.target.value);
    // setTimeout(() => {
    //   event.target.blur();
    //   event.target.focus();
    // }, 1500);
  }

  filterSPUsers(query: string) {
    this.peoplePickerQuery = Object.assign({
      queryParams: {
        QueryString: query,
        MaximumEntitySuggestions: 10,
        AllowEmailAddresses: true,
        AllowOnlyEmailAddresses: false,
        PrincipalSource: 15,
        PrincipalType: 1,
        SharePointGroupID: 0
      }
    });

    this.ppService
      .getUserSuggestions(this.peoplePickerQuery)
      .subscribe((result: any) => {
        try {
            this.ppUserOptions = [];
            const allUsers: PeoplePickerUser[] = JSON.parse(
              result.d.ClientPeoplePickerSearchUser
            );
            allUsers.forEach(user => {
              this.ppUserOptions = [...this.ppUserOptions, user];
            });

            console.log('User Suggestions', this.ppUserOptions);
        } catch (error) {
          console.log(error);
        }
      });
  }
}
