import { Component, ViewChild } from '@angular/core';
import { FiltrosComponent } from 'src/app/shared/filtro/filtros.component';
// Material
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DynamicControlComponent } from 'src/app/shared/dynamcic-control/dynamic-control.component';
import { CommonModule } from '@angular/common';
import { FILTER_TYPE } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FiltrosComponent,
    ReactiveFormsModule,
    DynamicControlComponent
  ],
})
export class ProductosComponent {

  @ViewChild('country') countryListControl: DynamicControlComponent | undefined;
  @ViewChild('year') countryAutocompleteControl: DynamicControlComponent | undefined;

  filterForm = this.fb.group({
    name: [''],
    country: [''],
    year: [''],
  });

  countryOptions = [
    { name: 'Spain', value: 'ES' },
    { name: 'France', value: 'FR' },
    { name: 'Germany', value: 'DE' },
  ];

  yearOptions = [
    { name: '2020', value: 2020 },
    { name: '2021', value: 2021 },
    { name: '2022', value: 2022 },
  ]

  get FILTER_TYPE () {
    return FILTER_TYPE;
  }

  constructor(private fb: FormBuilder) {}

  closeMenu(field: any) {
    if (this.countryListControl && field !== this.countryListControl.field) {
      this.countryListControl.dropdownOpen = false;
    }
    if (this.countryAutocompleteControl && field !== this.countryAutocompleteControl.field) {
      this.countryAutocompleteControl.dropdownOpen = false;
    }
  }

  deleteFilter() {
    this.filterForm.reset();
    this.countryListControl!.clearSelection();
    this.countryAutocompleteControl!.clearSelection();
  }

  searchFilter() {
    console.log(this.filterForm.value);
  }

  onTypeSelectionChange(event: any, type: string) {
    this.filterForm.get(type)!.setValue(event);
  }
}
