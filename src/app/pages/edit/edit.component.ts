import { Component, inject } from '@angular/core';
import { ItemsService } from '../../core/services/items.service';
import { MaterialModule } from '../../core/feature/material/material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [MaterialModule, NgIf, AsyncPipe, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  itemsService = inject(ItemsService);
  dialog = inject(MatDialog);

  items$ = this.itemsService.getItems();

  onAddItem() {
    this.dialog.open(AddItemDialogComponent);
  }

  onUpdateItem(item: any) {
    this.itemsService.updateItem(item);
  }

  onRemoveItem(item: any, items: any, index: any) {
    this.itemsService.removeItem(item).subscribe(() => {
      items.splice(index, 1);
    });
  }
}
