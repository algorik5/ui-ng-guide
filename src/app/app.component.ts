import { Component } from '@angular/core';

declare var Flatted;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  isCollapsed = false;

  menuType = "main";
  setMenuType(type) {
    console.log("=== setMenuType type="+type);
    this.menuType = type;
  }
}
