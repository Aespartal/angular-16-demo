import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FILTER_TYPE } from '../constants/constants';

import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-dynamic-control',
  templateUrl: './dynamic-control.component.html',
  styleUrls: ['./dynamic-control.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatMenuModule,
    MatButtonModule,
    MatAutocompleteModule
  ]
})
export class DynamicControlComponent implements AfterContentInit  {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  currentEvent!: any;

  private _field!: any;

  @Input()
  get field(): any {
    return this._field;
  }

  set field(value: any) {
    this._field = value;
  }

  @Input() controlType: string | null = null;
  @Input() placeholder: string = '';
  @Input() label: string | null = null;
  @Input() options: any[] | null = null;
  @Input() autoComplete: boolean | null = null;

  @Output() ngModelChange = new EventEmitter();

  @Output() closeMenu = new EventEmitter();

  @ViewChild('autoCompleteInput', { static: false })
  autoCompleteInput!: ElementRef<HTMLInputElement>;

  selectedOption!: any;

  public dropdownOpen: boolean = false;

  optionsFiltered = signal(this.options);

  get FILTER_TYPE() {
    return FILTER_TYPE;
  }

  get isAutocomplete() {
    return this.controlType === FILTER_TYPE.AUTOCOMPLETE;
  }

  constructor() {
  }

  ngAfterContentInit(): void {
    console.log(this.autoCompleteInput);
  }

  ngOnInit(): void {
    this.optionsFiltered = signal(this.options);
  }

  toggleDropdown(event: any): void {
    this.dropdownOpen = !this.dropdownOpen;
    this.currentEvent = event;
    this.closeMenu.emit(this.field);
  }

  selectType(event: any): void {
    const value = this.isAutocomplete ? event.option.value : event;
    this.selectedOption = value;
    this.dropdownOpen = false;
    this.ngModelChange.emit(value);
  }

  clearSelection(): void {
    this.selectedOption = null;
    this.field = null;
    this.ngModelChange.emit(null);
  }

  searchFilter(): void {
    if (!this.autoCompleteInput) {
      return;
    }
    this._filter(this.autoCompleteInput.nativeElement.value);
  }

  private _filter(value: string): any {
    const filterValue = value.toLowerCase();
    if (this.options) {
      this.optionsFiltered.set(this.options.filter((option) => option.name.toLowerCase().includes(filterValue)));
    } else {
      this.optionsFiltered.set(this.options);
    }
  }
}
