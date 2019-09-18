import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SettingsComponent } from '../components/settings/settings.component';
import { PersonalComponent } from '../components/personal/personal.component';
import { SystemComponent } from '../components/system/system.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          { path: 'personal', component: PersonalComponent, data: {animation: 'personal'} },
          { path: 'system', component: SystemComponent, data: {animation: 'system'}  }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class SettingsRoutingModule {}
