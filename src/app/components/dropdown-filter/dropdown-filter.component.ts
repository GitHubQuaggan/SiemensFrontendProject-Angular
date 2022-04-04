import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { DropdownItem } from '../../models/dropdown-item'

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit, AfterViewInit {
  @Input() contentType = 'Content';
  @Input() items: DropdownItem[] = [];

  constructor() { }

  ngOnInit(): void {
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

}
