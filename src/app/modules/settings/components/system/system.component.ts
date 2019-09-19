import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Hour } from 'src/app/shared/models/hour.model';
import { APP } from 'src/app/shared/constants';
import { RealTimeDataService } from 'src/app/shared/services/real-time-data.service';
import { User } from 'src/app/shared/models/user.model';
import { SettingsService } from '../../services/settings.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-system',
  templateUrl: 'system.component.html',
  styleUrls: ['system.component.css']
})
export class SystemComponent implements OnInit, OnDestroy {

  public hours: Hour[] = APP.hours;
  public user: User;
  public progressBarVisibility: boolean;
  public languages: string[] = APP.languages;

  private currentUserSubscription: Subscription;

  constructor(
    private realTimeDataService: RealTimeDataService,
    private changeDetectorRef: ChangeDetectorRef,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.subscribeToCurrentUser();
  }

  public async reactOnSelectHour(hour: Hour): Promise<any> {
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
    this.currentUserSubscription = this.realTimeDataService.subscribeToCurrentUserData()
      .subscribe(user => {
        this.user = user;
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy() {}

}
