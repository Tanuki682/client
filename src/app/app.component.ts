import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { HeaderComponent } from "./header/header.component"
import { CommonModule } from '@angular/common'
import { NgxSpinnerComponent } from 'ngx-spinner'
@Component({
  selector: 'app-root',
  imports: [NgxSpinnerComponent, RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
