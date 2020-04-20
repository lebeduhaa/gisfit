import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { VideosService } from '../../services/videos.service';
import { APP } from 'src/app/shared/constants';
import { CropperComponent } from 'src/app/shared/components/cropper/cropper.component';
import { RouterHelper } from 'src/app/shared/services/router.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe.class';

@Component({
  selector: 'app-uploader',
  templateUrl: 'uploader.component.html',
  styleUrls: ['uploader.component.css']
})
export class UploaderComponent extends Unsubscribe implements OnInit {

  @ViewChild('video') video: ElementRef<HTMLVideoElement>;

  public videoPreview: string | ArrayBuffer;
  public videoPreload: SafeResourceUrl;
  public videoFile;
  public previewFile;
  public videoClearFilesSubject = new Subject<boolean>();
  public imageClearFilesSubject = new Subject<boolean>();
  public videoForm: FormGroup;
  public currentProgress: number;
  public progressVisibility: boolean;

  private duration: number;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private videosService: VideosService,
    private dialog: MatDialog,
    private routerHelper: RouterHelper,
    private subjectService: SubjectService
  ) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  public getCurrentPercent(): string {
    return this.currentProgress.toFixed(1);
  }

  public reactOnDurationChange(event): void {
    this.videoForm.controls.duration.reset(event.target.duration);
  }

  public save(): void {
    this.progressVisibility = true;
    this.subscribeTo = this.videosService.saveVideo(this.videoForm.value)
      .subscribe(percent => {
        this.currentProgress = percent;
        this.changeDetectorRef.markForCheck();

        if (percent === 100) {
          this.routerHelper.navigateToPage(APP.pages.videos);
          this.subjectService.emitSubject(APP.subjects.notificationVisibility, {
            title: 'Videos',
            body: 'Your video was added successfully!',
            duration: 8000
          });
        }
      });
  }

  private openCropperDialog(): void {
    const dialogRef = this.dialog.open(CropperComponent, {
      width: '700px',
      id: APP.dialogs.cropper,
      data: {
        event,
        polygon: true
      }
    });

    this.subscribeTo = dialogRef.afterClosed()
      .subscribe(async base64 => {
        this.imageClearFilesSubject.next(true);
        this.videoPreview = base64;
        this.changeDetectorRef.markForCheck();
        this.videoForm.controls.imageFile.reset(base64);
      });
  }

  public getFileName(fileName: string): string {
    return fileName.length >= 20 ? `${fileName.substring(0, 20)}...` : fileName;
  }

  public reactOnSelectVideoFile(event): void {
    this.videoFile = event.target.files[0];
    this.videoForm.controls.videoFile.reset(this.videoFile);
    this.videoPreload = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.videoFile));
  }
  public reactOnSelectPreviewFile(event): void {
    this.previewFile = event.target.files[0];
    this.openCropperDialog();
  }

  public removeVideoFile(): void {
    this.videoFile = null;
    this.videoPreload = null;
    this.videoClearFilesSubject.next(true);
    this.videoForm.controls.videoFile.reset(null);
  }

  public removePreviewFile(): void {
    this.previewFile = null;
    this.videoPreview = '';
    this.imageClearFilesSubject.next(true);
    this.videoForm.controls.imageFile.reset(null);

  }

  private initForm(): void {
    this.videoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      videoFile: ['', Validators.required],
      imageFile: '',
      duration: ['', Validators.required]
    });
  }

}
