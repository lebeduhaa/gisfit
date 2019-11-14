import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-icon',
  templateUrl: 'user-icon.component.html',
  styleUrls: ['user-icon.component.css']
})
export class UserIconComponent {

  @Input() small: boolean;
  @Input() mobile: boolean;
  @Input() avatar: string;
  @Input() fakeAvatar: string;
  @Input() preload: string | ArrayBuffer;

}
