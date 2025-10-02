import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import AOS from 'aos';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'yesglobal';

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}
  
  private initAos() {
    AOS.init({
      duration: 1000,
      once: true,        // animate only once
      offset: 0,         // fire even when already in view
      startEvent: 'load' // run on initial page load
    });
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.initAos();

    // Re-scan DOM after each navigation so new components animate
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        // wait for view to render, then refresh
        setTimeout(() => AOS.refreshHard(), 0);
      });
  }
}
