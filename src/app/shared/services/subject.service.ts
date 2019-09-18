import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private subjects: Subject<any>[] = [];

  private createIfNotExists(subjectName: string): void {
    if (!this.subjects[subjectName]) {
      this.subjects[subjectName] = new Subject<any>();
    }
  }

  public getSubject(subjectName: string): Subject<any> {
    this.createIfNotExists(subjectName);

    return this.subjects[subjectName];
  }

  public emitSubject(subjectName: string, value: any): void {
    this.createIfNotExists(subjectName);
    this.subjects[subjectName].next(value);
  }

  public deleteSubject(subjectName: string): void {
    if (this[subjectName]) {
      delete this[subjectName];
    }
  }

}
