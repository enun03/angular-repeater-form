import { Component, OnInit } from '@angular/core';
import { PeoplePickerService } from '../../services/people-picker.service';
import { PeoplePickerResponse, PeoplePickerUser } from '../../models/people-picker.response';
import { PeoplePickerQuery } from '../../models/people-picker.query';

@Component({
  selector: 'app-peoplepicker',
  templateUrl: './peoplepicker.component.html',
  styleUrls: ['./peoplepicker.component.scss']
})
export class PeoplepickerComponent implements OnInit {
  users: PeoplePickerUser[];
  multipleUsers: PeoplePickerUser[];
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

  constructor(private ppService: PeoplePickerService) { }

  ngOnInit() {
    this.users = [];
    this.multipleUsers = [];
  }

  filterSPUserSingle(event) {
    this.filterSPUsers(event.query, 'single');
  }

  filterSPUserMultiple(event) {
    this.filterSPUsers(event.query, 'multiple');
  }

  filterSPUsers(query, type) {
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
          if (type === 'single') {
            this.users = [];
            const allUsers: PeoplePickerUser[] = JSON.parse(
              result.d.ClientPeoplePickerSearchUser
            );
            allUsers.forEach(user => {
              this.users = [...this.users, user];
            });

            console.log('User Suggestions', this.users);
          } else {
            this.multipleUsers = [];
            const allUsers: PeoplePickerUser[] = JSON.parse(
              result.d.ClientPeoplePickerSearchUser
            );
            allUsers.forEach(user => {
              this.multipleUsers = [...this.multipleUsers, user];
            });

            console.log('Multiple User Suggestions', this.multipleUsers);
          }
        } catch (error) {
          console.log(error);
        }
      });
  }

}
