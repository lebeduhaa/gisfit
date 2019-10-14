import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import * as firebase from 'firebase';

import { Video } from 'src/app/shared/models/video.model';
import { LocalStorageHelper } from 'src/app/shared/services/local-storage.service';
import { APP } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private localStorageHelper: LocalStorageHelper
  ) {}

  public setLike(videoId: string): Promise<any> {
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);

    return this.firestore.collection('videos').doc(videoId).update({
      dislikes: firebase.firestore.FieldValue.arrayRemove(userId),
      likes: firebase.firestore.FieldValue.arrayUnion(userId)
    });
  }

  public setDislike(videoId: string): Promise<any> {
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);

    return this.firestore.collection('videos').doc(videoId).update({
      dislikes: firebase.firestore.FieldValue.arrayUnion(userId),
      likes: firebase.firestore.FieldValue.arrayRemove(userId)
    });
  }

  public unsetLike(videoId: string): Promise<any> {
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);

    return this.firestore.collection('videos').doc(videoId).update({
      likes: firebase.firestore.FieldValue.arrayRemove(userId)
    });
  }

  public unsetDislike(videoId: string): Promise<any> {
    const userId = this.localStorageHelper.getCachedData(APP.cachedData.userId);

    return this.firestore.collection('videos').doc(videoId).update({
      dislikes: firebase.firestore.FieldValue.arrayRemove(userId)
    });
  }

  public incViews(videoId: string): Promise<any> {
    return this.firestore.collection('videos').doc(videoId).ref.update({views: firebase.firestore.FieldValue.increment(1)});
  }

  public saveVideo(video: Video): Observable<number> {
    return new Observable(subscriber => {
      const videoId = this.firestore.createId();

      this.firestore.collection('videos').doc(videoId).set({
        title: video.title,
        description: video.description,
        duration: video.duration,
        views: 0,
        likes: [],
        dislikes: [],
        comments: [],
        timestamp: new Date().valueOf(),
        id: videoId
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
