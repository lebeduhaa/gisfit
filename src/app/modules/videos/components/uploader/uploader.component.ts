import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subject, Subscription } from 'rxjs';
import { VideosService } from '../../services/videos.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-uploader',
  templateUrl: 'uploader.component.html',
  styleUrls: ['uploader.component.css']
})
export class UploaderComponent implements OnInit, OnDestroy {

  public videoPreview: string | ArrayBuffer;
  public videoPreload: SafeResourceUrl;
  public videoFile;
  public previewFile;
  public videoClearFilesSubject = new Subject<boolean>();
  public imageClearFilesSubject = new Subject<boolean>();
  public videoForm: FormGroup;
  public currentProgress: number;
  public progressVisibility: boolean;

  private percentSubscription: Subscription;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private videosService: VideosService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  public save(): void {
    this.progressVisibility = true;
    this.percentSubscription = this.videosService.saveVideo(this.videoForm.value)
      .subscribe(percent => {
        this.currentProgress = percent;
        this.changeDetectorRef.markForCheck();
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
    const fileReader = new FileReader();

    fileReader.onload = () => {
      this.videoPreview = fileReader.result;
      this.previewFile = event.target.files[0];
      this.videoForm.controls.imageFile.reset(this.previewFile);
      this.changeDetectorRef.markForCheck();
    };

    fileReader.readAsDataURL(event.target.files[0]);
  }

  public removeVideoFile(): void {
    this.videoFile = null;
    this.videoPreload = null;
    this.videoClearFilesSubject.next(true);
  }

  public removePreviewFile(): void {
    this.previewFile = null;
    this.videoPreview = '';
    this.imageClearFilesSubject.next(true);
  }

  private initForm(): void {
    this.videoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      videoFile: ['', Validators.required],
      imageFile: ''
    });
  }

  ngOnDestroy() {}

}
