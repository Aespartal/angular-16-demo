import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, effect, signal } from '@angular/core';
import { isFavourite } from 'src/app/shared/helper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ]
})
export class ItemComponent implements OnChanges{
  @Input({ required: true }) items: any[] = [];
  @Output() removeItem = new EventEmitter<any>();

  totalFavourite = signal(0);

  constructor() {
    effect(() => console.log(this.totalFavourite())) // Esto es solo para propósitos de depuración, puedes eliminarlo si lo deseas
  }

  ngOnChanges(): void {
    this.updateTotalFavourite();
  }

  onRemoveItem(item: any): void {
    this.removeItem.emit(item);
    this.updateTotalFavourite(); // Actualiza totalFavourite después de eliminar un elemento
  }

  onFavouriteItem(item: any): void {
    const itemSelected = this.items.find(i => i === item);
    if (itemSelected) {
      itemSelected.favourite = !item.favourite;
      this.updateTotalFavourite();  // Actualiza totalFavourite cuando cambia un elemento a favorito
    }
  }

  private updateTotalFavourite(): void {
    const total = this.items.filter(isFavourite).length;
    this.totalFavourite.set(total);
  }
}
