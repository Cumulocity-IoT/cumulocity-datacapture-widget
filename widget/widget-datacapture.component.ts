import { Component, Input, OnInit } from "@angular/core";
import {

  IMeasurementCreate,
  IUser,
  InventoryService,
  MeasurementService,
} from "@c8y/client";
import { BehaviorSubject } from "rxjs";
import { AlertService, AppStateService } from "@c8y/ngx-components";

@Component({
  selector: "c8y-widget-datacapture",
  templateUrl: "widget-datacapture.html",
  styleUrls: [
    "./widget-datacapture.component.css"],
})
export class DataCaptureWidgetComponent implements OnInit {
  @Input() config;
  values: any[] = [];
  dates: any[] = [];
  user$: BehaviorSubject<IUser>;
  user: string;

  constructor(
    private inventory: InventoryService,
    private measurement: MeasurementService,
    private alert: AlertService,
    private app: AppStateService
  ) {}

  ngOnInit() {
    console.log("New config:", this.config);
    this.user$ = this.app.currentUser;
    this.user$.subscribe((u) => {
      console.log("User", u);
      this.user = u.userName;
    });
  }

  async onSubmit(index: number) {
    console.log(
      "New submit:",
      index,
      this.values,
      this.dates,
      this.config.datapoints[index]
    );
    const time  = this.dates[index]?this.dates[index]  : new Date().toISOString();
    const m: Partial<IMeasurementCreate> = {
      source :{
        id:this.config.datapoints[index].__target.id,
      },
      type : this.config.datapoints[index].fragment,
      time: time
    };
    if (this.config.addAudit) {
      m.user = this.user;
    }
    const series = this.config.datapoints[index].series;
    const fragment = {};
    fragment[series] = {
      value: parseFloat(this.values[index]),
      unit: this.config.datapoints[index].unit,
    };

    m[this.config.datapoints[index].fragment] = fragment;
    /*
    "cpu": {
    "guest": {
      "unit": null,
      "value": 9.9
    }
    */
    console.log("New entry:", m);
    const {res, data} = await this.measurement.create(m);
    this.alert.success(`New measurement: ${data.id}`);
  }
}
