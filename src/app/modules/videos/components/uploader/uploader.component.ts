import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-uploader',
  templateUrl: 'uploader.component.html',
  styleUrls: ['uploader.component.css']
})
export class UploaderComponent implements OnInit {

  public videoPreview: string | ArrayBuffer;
  public file;

  constructor(
    private fireStorage: AngularFireStorage,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.fireStorage.ref('videos/hd1967.mov').getDownloadURL()
      .subscribe(qwe => console.log(qwe));
  }

  public reactOnSelectVideoFile(event): void {
    this.file = event.target.files[0];
  }

  public reactOnSelectPreviewFile(event): void {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      this.videoPreview = fileReader.result;
      this.changeDetectorRef.markForCheck();
    };

    fileReader.readAsDataURL(event.target.files[0]);
  }

}
