import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { sp } from '@pnp/sp/presets/all';

import { PeoplePickerQuery } from '../models/people-picker.query';
import { FormDigestResponse } from '../models/people-picker.response';

@Injectable({
  providedIn: 'root'
})
export class PeoplePickerService {
  baseUrl = 'https://evertecgroup.sharepoint.com/Development';
  PEOPLE_PICKER_URL =
  '_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.ClientPeoplePickerSearchUser';

  constructor(private http: HttpClient) {
    sp.setup({
      sp: {
        headers: {
          Accept: 'application/json; odata=verbose'
        },
        baseUrl: this.baseUrl
      }
    });
  }

  public getUserSuggestions(query: PeoplePickerQuery): Observable<any> {
    return this.http.post(`${this.baseUrl}/_api/contextinfo`, '').pipe(
      mergeMap((xRequest: FormDigestResponse) => {
        const digest = xRequest.FormDigestValue;
        const headers = new HttpHeaders({
          accept: 'application/json;odata=verbose',
          'X-RequestDigest': digest
        });
        const httpOptions = {
          headers
        };
        return this.http.post(
          `${this.baseUrl}/${this.PEOPLE_PICKER_URL}`,
          query,
          httpOptions
        );
      })
    );
  }
}
