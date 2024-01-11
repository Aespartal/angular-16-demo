import { CommonModule } from '@angular/common';
import { Component, signal, computed, effect, OnInit, ViewChild } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ItemComponent } from './item/item.component';
import { ItemService } from './principal.service';
import { Subscription, interval, map, take } from 'rxjs';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTable, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  standalone: true,
  imports: [
    MatExpansionModule,
    CommonModule,
    ItemComponent,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTableModule
  ]
})
export class PrincipalComponent implements OnInit {

  firstName = signal('Alejandro');
  lastName = signal('Espartal');

  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

  loading = signal(true);

  timerSub!: Subscription;

  dataSource: any[] = [];

  itemList = signal(this.dataSource);

  totalPrice = computed(() => {
    return this.itemList().reduce((acc, curr) => acc + curr.price, 0);
  });

  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatTable)
  table!: MatTable<any>;

  constructor(private itemService: ItemService) {
    effect(() => console.log('Item list: ', this.itemList()));
  }
  ngOnInit(): void {
      this.itemService.query()
      .subscribe((data) => {
        this.dataSource = data;
        this.itemList = signal(this.dataSource);
        this.updateItemsList();
        this.loading.set(false);
      });

      const observable = interval(1000).pipe(
        take(5), // Limitar la emisión a 5 números
        map(value => value + 1) // Incrementar el valor en 1
      );

      observable.subscribe(
        value => {
          console.log(`Número emitido: ${value}`);
        },
        error => {
          console.error(`Error: ${error}`);
        },
        () => {
          console.log('Secuencia completa');
        }
      );
  }

  setName(newName: string) {
    this.firstName.set(newName)
  }

  onRemoveItem(item: any) {
    this.itemList.set(this.itemList().filter((i) => i !== item));
    this.updateItemsList();
  }

  addItem(): void {
    const newItem = { name: 'Product D', price: 50, favourite: false }
    this.itemList().push(newItem);
    this.updateItemsList();
  }

  isLoading() {
    return this.loading();
  }

  toggleSelection(item: any): void {
    this.selection.toggle(item);
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.forEach(dataSource => this.selection.select(dataSource));
    }
  }

  private updateItemsList(): void {
    const items = this.itemList();
    this.itemList.set(items);
  }
}
