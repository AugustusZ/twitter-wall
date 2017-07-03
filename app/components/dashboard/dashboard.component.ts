import { Component, Input } from '@angular/core';

@Component({
  selector: 'tw-dashboard',
  templateUrl: './app/components/dashboard/dashboard.component.html'
})
export class DashboardComponent {
    @Input() havingServerError;
    @Input() ranks;
}
