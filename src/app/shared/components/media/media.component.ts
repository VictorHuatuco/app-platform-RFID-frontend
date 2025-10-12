import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css',
})
export class MediaComponent {
  @Input() public mediaType: string = 'image';
  @Input() public videoURL = '';
  @Input() public imageURL = '';

  public showVideoFallback = false;
  handleVideoError(event: Event) {
    console.error('Error al cargar el video:', event);
    this.showVideoFallback = true;
  }
}
