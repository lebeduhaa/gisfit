import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/modules/shared.module';
import { SettingsComponent } from '../components/settings/settings.component';
import { InputTextModule } from 'src/app/shared/components/input-text/input-text.module';
import { SpinnerButtonModule } from 'src/app/shared/components/spinner-button/spinner-button.module';
import { UserIconModule } from 'src/app/shared/components/user-icon/user-icon.module';
import { InputFileModule } from 'src/app/shared/components/input-file/input-file.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { PersonalComponent } from '../components/personal/personal.component';
import { SystemComponent } from '../components/system/system.component';
import { CustomButtonModule } from 'src/app/shared/components/custom-button/custom-button.module';
import { CropperModule } from 'src/app/shared/components/cropper/cropper.module';
import { RadioGroupModule } from 'src/app/shared/components/radio-group/radio-group.module';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SelectModule } from 'src/app/shared/components/select/modules/select.module';
import { OpenChangePasswordDirective } from '../directives/open-change-password.directive';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { ToggleModule } from 'src/app/shared/components/toggle/toggle.module';
import { RectIconButtonModule } from 'src/app/shared/components/rect-icon-button/rect-icon-button.module';

@NgModule({
  imports: [
    SharedModule,
    SettingsRoutingModule,
    InputTextModule,
    SpinnerButtonModule,
    UserIconModule,
    InputFileModule,
    CustomButtonModule,
    CropperModule,
    RadioGroupModule,
    DirectivesModule,
    MaterialModule,
    SelectModule,
    ToggleModule,
    RectIconButtonModule
  ],
  declarations: [
    SettingsComponent,
    PersonalComponent,
    SystemComponent,
    ChangePasswordComponent,
    OpenChangePasswordDirective
  ],
  entryComponents: [
    ChangePasswordComponent
  ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule {}
