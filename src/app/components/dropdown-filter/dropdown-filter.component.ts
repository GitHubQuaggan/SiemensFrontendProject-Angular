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
    // Initialize the dropdown to have all items selected, even if they aren't checked
    this.selectAllItems();
  }

  ngAfterViewInit(): void {
    // Set the event handler for expanding/closing the dropdown

    // The <h4> HTML element that acts as the <select> element of the dropdown
    const headings = document.querySelectorAll('.btn-toggle-next');

    // Go through each heading found
    Array.prototype.forEach.call(headings, h => {
      const btn = h.querySelector('button'); // Get the button within the <h4> element
      const target = h.nextElementSibling; // The target of the button (the dropdown options) which will be shown/hidden
      this.setElementState(btn, target, false); // Set the state of the dropdown to closed by default

      // Add the click event handler to the button
      btn.onclick = () => {
        this.toggleElement(btn, target);
      }
    });
  }

  /**
   * Toggles the dropdown between expanded/closed.
  */
  toggleElement = (element: HTMLElement, elementTarget: HTMLElement) => {
    const expanded = element.getAttribute('aria-expanded') === 'true';
    this.setElementState(element, elementTarget, !expanded);
  }

  /**
   * Sets the HTML attributes and values to determine the expanded/closed state of the dropdown.
  */
  setElementState(element: HTMLElement, elementTarget: HTMLElement, expanded: boolean) {
    element.setAttribute('aria-expanded', expanded.toString());
    element.classList.toggle("is-toggled");
    elementTarget.hidden = !expanded;
  }

  /**
   * Event handler for when an item in the dropdown is selected.
   * @param event The event fired when the checkbox is clicked
  */
  onItemSelect(event: any) {
    const checked = event.target.checked;
    const value = event.target.value;

    if (checked) {
      // If the checkbox was checked...

      // If the number of selected items is currently the same as the total number of items in the dropdown...
      // That means that nothing in the dropdown is actually checked...
      // Since having nothing checked will still act as if everything is selected
      if (this.selectedItems.length === this.items.length) {
        // Clear the selected items list, since now that at least 1 item is checked, only want to filter using that 1 item
        this.selectedItems = [];
      }
      // If the checked item isn't currently in the selected items list, add it
      if (!this.selectedItems.includes(value)) {
        this.selectedItems.push(value);
      }
    } else if (!checked && this.selectedItems.includes(value)) {
      // If the item's checkbox was unchecked and if the item is currently in the selected items list...
      // Remove it from the selected items list
      const index = this.selectedItems.indexOf(value);
      this.selectedItems.splice(index, 1);

      // If the selected items list is now empty, re-select all items (without actually checking the boxes)
      if (this.selectedItems.length === 0) {
        this.selectAllItems();
      }
    }

    // Emit the event for selecting dropdown items
    this.itemsSelected.emit(this.selectedItems.sort());
  }

  /**
   * Sets all items in the dropdown as "selected".
  */
  selectAllItems() {
    this.items.forEach((item) => {
      this.selectedItems.push(item.label);
    });
    this.selectedItems = this.selectedItems.sort();
  }

}
