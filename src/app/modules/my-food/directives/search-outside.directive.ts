import { Directive, HostListener } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { SearchOutsideComponent } from '../components/search-outside/search-outside.component';

@Directive({
  selector: '[appSearchOutside]'
})
export class SearchOutsideDirective {

  constructor(
    private dialog: MatDialog
  ) {}

  @HostListener('click')
  searchOutside() {
    this.dialog.open(SearchOutsideComponent, {
      width: '700px'
    });
  }


}
