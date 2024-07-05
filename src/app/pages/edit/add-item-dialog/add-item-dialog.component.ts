import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemsService } from '../../../core/services/items.service';
import { MaterialModule } from '../../../core/feature/material/material.module';
import { NgIf } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-item-dialog',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, NgIf],
  templateUrl: './add-item-dialog.component.html',
  styleUrl: './add-item-dialog.component.scss'
})
export class AddItemDialogComponent {
  itemsService = inject(ItemsService);
  fb = new FormBuilder();
  dialog = inject(MatDialogRef);

  addItemForm = this.fb.group({
    title: ['', Validators.required],
    price: ['', Validators.required],
    description: ['']
  });

  onAddItem() {
    if (!this.addItemForm.valid) return
    
    this.itemsService.addItem(this.addItemForm.value).subscribe(() => {
      this.dialog.close()
    });
  }
}
