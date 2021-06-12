import { Component, OnInit } from '@angular/core';
import { NotificationPermissionService } from '../notification-permission.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {

  constructor(public notificationPermission:NotificationPermissionService) { }

  ngOnInit(): void {
  }

}
