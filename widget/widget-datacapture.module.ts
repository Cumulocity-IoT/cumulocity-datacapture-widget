// Assets need to be imported into the module, or they are not available
import { assetPaths } from "../assets/assets";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataCaptureWidgetComponent } from "./widget-datacapture.component";
import { DataCaptureWidgetConfig } from "./widget-datacapture-config.component";
import { FormsModule, hookComponent, gettext } from "@c8y/ngx-components";
import { ContextWidgetConfig } from "@c8y/ngx-components/context-dashboard";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [DataCaptureWidgetComponent, DataCaptureWidgetConfig],
  entryComponents: [DataCaptureWidgetComponent, DataCaptureWidgetConfig],
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    TranslateModule
  ],
  exports: [],
  providers: [
    BsDatepickerConfig,
    hookComponent({
      id: "datacapture.widget",
      label: gettext("Data capture widget"),
      description: gettext("Widget added data capture"),
      component: DataCaptureWidgetComponent,
      previewImage: assetPaths.previewImage,
      configComponent: DataCaptureWidgetConfig,
      /** new Angular-Dashboard definition */
      data: {
        // The settings object can be used to configure the configComponent
        settings: {
          noNewWidgets: false, // Set this to true, to don't allow adding new widgets.
          ng1: {
            options: {
              noDeviceTarget: true, // Set this to true to hide the AngularJS device selector.
              groupsSelectable: false, // Set this, if not only devices should be selectable.
              noNewWidgets: false,
              deviceTargetNotRequired: false,
            },
          },
        },
        // Settings that are attached to the display component (in this case: WidgetDemo)
        displaySettings: {
          globalTimeContext: true, // Set this to true, to add a global time context binding
        },
      } as ContextWidgetConfig,
    }),
  ],
})
export class DataCaptureWidgetModule {}
