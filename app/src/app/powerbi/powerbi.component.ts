import { Component } from '@angular/core';

@Component({
  selector: 'app-powerbi',
  templateUrl: './powerbi.component.html',
  styleUrls: ['./powerbi.component.css']
})
export class PowerbiComponent{
  ForecastWindow() {
    const url = 'https://app.powerbi.com/groups/me/reports/1772ef70-1ee2-49f5-b732-20a76e0861eb/ReportSection'; // Replace with the desired webpage URL
    const windowWidth = 500; // Width of the small window in pixels
    const windowHeight = 300; // Height of the small window in pixels
    const windowFeatures = `width=${windowWidth},height=${windowHeight},resizable=yes,scrollbars=yes`;

    window.open(url, '_blank', windowFeatures);
  }
  PredictionWindow() {
    const url = 'https://app.powerbi.com/groups/me/reports/1772ef70-1ee2-49f5-b732-20a76e0861eb/ReportSectiona128ac45e2649f56500b'; // Replace with the desired webpage URL
    const windowWidth = 500; // Width of the small window in pixels
    const windowHeight = 300; // Height of the small window in pixels
    const windowFeatures = `width=${windowWidth},height=${windowHeight},resizable=yes,scrollbars=yes`;

    window.open(url, '_blank', windowFeatures);
  }
}
