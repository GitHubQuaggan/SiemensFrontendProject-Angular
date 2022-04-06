import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { DropdownItem } from '../../models/dropdown-item'

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit, AfterViewInit {
  @Input() contentType = 'Content';
  @Input() items: DropdownItem[] = new Array<DropdownItem>();
  @Output() itemsSelected: EventEmitter<string[]> = new EventEmitter();

  selectedItems: string[] = new Array<string>();

  constructor() { }

  ngOnInit(): void {
    this.selectAllItems();
  }

  ngAfterViewInit(): void {
    const headings = document.querySelectorAll('.btn-toggle-next');
    Array.prototype.forEach.call(headings, h => {
      let btn = h.querySelector('button');
      let target = h.nextElementSibling;
      this.setElementState(btn, target, false);
      btn.onclick = () => {
        this.toggleElement(btn, target);
      }
    });

    const toggles = document.querySelectorAll('.btn-toggle-previous');
    Array.prototype.forEach.call(toggles, toggle => {
      let toggleTarget = toggle.previousElementSibling;
      this.setElementState(toggle, toggleTarget, false);
      toggle.onclick = () => {
        this.toggleElement(toggle, toggleTarget);
      }
    });
  }

  toggleElement = (element: HTMLElement, elementTarget: HTMLElement) => {
    let expanded = element.getAttribute('aria-expanded') === 'true';
    this.setElementState(element, elementTarget, !expanded);
  }

  setElementState(element: HTMLElement, elementTarget: HTMLElement, expanded: boolean) {
    element.setAttribute('aria-expanded', expanded.toString());
    element.classList.toggle("is-toggled");
    elementTarget.hidden = !expanded;
  }

  onItemSelect(event: any) {
    const checked = event.target.checked;
    const value = event.target.value;

    if (checked) {
      if (this.selectedItems.length === this.items.length) {
        this.selectedItems = [];
      }
      if (!this.selectedItems.includes(value)) {
        this.selectedItems.push(value);
      }
    } else if (!checked && this.selectedItems.includes(value)) {
      const index = this.selectedItems.indexOf(value);
      this.selectedItems.splice(index, 1);
      if (this.selectedItems.length === 0) {
        this.selectAllItems();
      }
    }

    this.itemsSelected.emit(this.selectedItems.sort());
  }

  selectAllItems() {
    this.items.forEach((item) => {
      this.selectedItems.push(item.label);
    });
    this.selectedItems = this.selectedItems.sort();
  }

}
