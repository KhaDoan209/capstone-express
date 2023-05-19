import { Injectable } from '@nestjs/common';
import { firebaseConfig } from 'src/utils/firebase.config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
   private storage: admin.storage.Storage
   constructor() {
      admin.initializeApp({
         credential: admin.credential.cert(process.cwd() + "/serviceAccountKey.json"),
         storageBucket: firebaseConfig.storageBucket
      });
      this.storage = admin.storage();
   }

   async uploadImage(file: Express.Multer.File): Promise<string> {
      const bucket = this.storage.bucket();
      const filename = `${Date.now().toString()}_${file.originalname}`;
      const fileRef = bucket.file(filename);
      const options = {
         destination: fileRef,
         metadata: {
            contentType: file.mimetype,
         },
      };
      await fileRef.save(file.buffer, options);

      const downloadUrl = await fileRef.getSignedUrl({
         action: 'read',
         expires: '03-01-2500',
      });

      return downloadUrl[0];
   }
}
