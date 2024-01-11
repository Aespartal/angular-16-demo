import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
  standalone: true
})
export class FiltrosComponent {

  @Input() filterForm!: FormGroup;

  @Output() deleteFilter = new EventEmitter();
  @Output() searchFilter = new EventEmitter();

}
