import { Component, inject } from '@angular/core';
import { ItemsService } from '../../core/services/items.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  itemsServices = inject(ItemsService);
  
  date = new Date().getDate();
  month = new Date().toLocaleString('ro-RO', { month: 'long' });
  
  items$ = this.itemsServices.getItems();
}
