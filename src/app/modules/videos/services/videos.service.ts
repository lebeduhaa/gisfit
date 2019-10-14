import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { Video } from 'src/app/shared/models/video.model';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  public saveVideo(video: Video): Observable<number> {
    return new Observable(subscriber => {
      const videoId = this.firestore.createId();

      this.firestore.collection('videos').doc(videoId).set({
        title: video.title,
        description: video.description
      })
        .then(() => {
          const ref = this.storage.ref(`videos/${videoId}_${(video as any).videoFile.name}`);

          if (video.imageFile) {
            const pureBase64 = video.imageFile.slice(video.imageFile.indexOf('base64,') + 7);

            this.storage.ref(`video-previews/${videoId}.jpg`).putString(pureBase64, 'base64', {contentType: 'image'})
            .then(() => {

              ref.put(video.videoFile, {contentType: 'video'}).percentageChanges()
                .subscribe(percent => subscriber.next(percent));
            });
          } else {
            ref.put(video.videoFile, {contentType: 'video'}).percentageChanges()
              .subscribe(percent => subscriber.next(percent));
          }
        });
    });
  }

  public async getVideos(): Promise<any> {
    const docs = await this.firestore.collection('videos').get().toPromise();

    return docs.docs.map(doc => doc.data());
  }

}
