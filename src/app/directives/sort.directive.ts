import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { Sort } from '../classes/util/sort';

@Directive({
  selector: '[appSort]'
})
export class SortDirective {
  @Input() appSort: any[] = [];

  sortOrder: number = -1;
  collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
  });

  constructor(private elemRef: ElementRef) { }

  @HostListener('click') sortData(){
    const elem = this.elemRef.nativeElement;
    const colName = elem.getAttribute('data-name');
    const dataType = elem.getAttribute('data-type');
    const order = elem.getAttribute('data-order');

    const sortOb = new Sort();

    this.appSort.sort(sortOb.sortData(colName, dataType, order));
    if(order === 'asc'){
      elem.setAttribute("data-order", 'desc');
    }else{
      elem.setAttribute("data-order", 'asc');
    }
    
  }


}
