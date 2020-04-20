import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import * as moment from 'moment';

import { Hour } from 'src/app/shared/models/hour.model';
import { APP } from 'src/app/shared/constants';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { User } from 'src/app/shared/models/user.model';
import { SettingsService } from '../../services/settings.service';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe.class';

@Component({
  selector: 'app-system',
  templateUrl: 'system.component.html',
  styleUrls: ['system.component.css']
})
export class SystemComponent extends Unsubscribe implements OnInit {

  public hours: Hour[] = APP.hours;
  public user: User;
  public progressBarVisibility: boolean;
  public languages: string[] = APP.languages;
  public isMobile = APP.isMobile;

  constructor(
    private realTimeDataService: RealTimeDataService,
    private changeDetectorRef: ChangeDetectorRef,
    private settingsService: SettingsService
  ) {
    super();
  }

  ngOnInit() {
    this.subscribeToCurrentUser();
  }

  public async reactOnSelectHour(hour: Hour): Promise<any> {
    const utcDifference =  moment().utcOffset() / 60;

    if (hour.value > 2) {
      hour.utc = hour.value - utcDifference;
    } else {
      hour.utc = 24 - (utcDifference - hour.value);
    }

    await this.settingsService.updateUserData({notificationTime: hour}, this.user.id);
  }

  public async reactOnSelectLanguage(language: string): Promise<any> {
    await this.settingsService.updateUserData({interfaceLanguage: language}, this.user.id);
  }

  public async reactOnChangeNotificationSound(notificationSound): Promise<any> {
    await this.settingsService.updateUserData({notificationSound}, this.user.id);
  }

  public async reactOnChangeSendDailyReportOnEmail(sendDailyReportOnEmail): Promise<any> {
    await this.settingsService.updateUserData({sendDailyReportOnEmail}, this.user.id);
  }

  private subscribeToCurrentUser(): void {
    this.subscribeTo = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => {
        this.user = user;
        this.changeDetectorRef.markForCheck();
      });
  }

}
