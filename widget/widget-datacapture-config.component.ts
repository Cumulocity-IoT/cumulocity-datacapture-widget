import { Component, Input, OnInit } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";
import {
  DynamicComponent,
  OnBeforeSave,
  AlertService,
} from "@c8y/ngx-components";
import {
  DatapointSelectorService,
} from "@c8y/ngx-components/datapoint-selector";

@Component({
  selector: "c8y-widget-datacapture-config",
  templateUrl: "widget-datacapture-config.html",
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class DataCaptureWidgetConfig
  implements DynamicComponent, OnBeforeSave, OnInit
{
  @Input() config: any = {};

  constructor(
    private alert: AlertService,
    private datapointSelection: DatapointSelectorService
  ) {}
  ngOnInit(): void {
    if (!this.config["datapoints"]) {
      this.config["datapoints"] = [];
    }
    if (!this.config["addAudit"]) {
      this.config["addAudit"] = false;
    }
  }

  addDatapoints(): void {
    this.datapointSelection
      .selectDataPoints({ selectedDatapoints: [...this.config.datapoints] })
      .then(
        (res) => {
          this.config.datapoints = res;
        },
        () => {
          // nothing to do, modal was canceled
        }
      );
  }

  onBeforeSave(config: any): boolean {
    return true;
  }
}
