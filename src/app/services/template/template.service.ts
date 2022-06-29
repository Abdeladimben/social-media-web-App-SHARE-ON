import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor() { }

  private subject = new Subject<any>();

  sendvalue(value: boolean){
      this.subject.next(value);
  }

  onValue(): Observable<any> {
      return this.subject.asObservable();
  }

}
