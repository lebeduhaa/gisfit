import { Component, OnInit, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

import { SubjectService } from 'src/app/shared/services/subject.service';
import { APP } from 'src/app/shared/constants';
import { CurrentEat } from 'src/app/shared/models/current-eat.model';

@AutoUnsubscribe()
@Component({
  selector: 'app-current-eating',
  templateUrl: 'current-eating.component.html',
  styleUrls: ['current-eating.component.css']
})
export class CurrentEatingComponent implements OnInit, OnDestroy {

  private newProductSubscription: Subscription;

  constructor(
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.subscribeToNewProduct();
  }

  private subscribeToNewProduct(): void {
    this.newProductSubscription = this.subjectService.getSubject(APP.subjects.newProduct)
      .subscribe((newProduct: CurrentEat) => {
        console.log(newProduct);
      });
  }

  ngOnDestroy() {}

}
