import { Injectable } from '@nestjs/common';
import { firebaseConfig } from 'src/utils/firebase.config';
import * as admin from 'firebase-admin';

@Injectable()
class FirebaseService {
   private storage: admin.storage.Storage
   private static instance: FirebaseService;
   constructor() {
      admin.initializeApp({
         credential: admin.credential.cert(process.cwd() + "/serviceAccountKey.json"),
         storageBucket: firebaseConfig.storageBucket
      });
      this.storage = admin.storage();
   }
   public static getInstance(): FirebaseService {
      if (!FirebaseService.instance) {
         FirebaseService.instance = new FirebaseService();
      }
      return FirebaseService.instance;
   }

   async uploadImage(file: Express.Multer.File): Promise<any> {
      const bucket = this.storage.bucket();
      const filename = `${Date.now().toString()}_${file.originalname}`;
      const fileUrl = bucket.file(filename);
      const options = {
         destination: fileUrl,
         metadata: {
            contentType: file.mimetype,
         },
      };
      await fileUrl.save(file.buffer, options);

      const downloadUrl = await fileUrl.getSignedUrl({
         action: 'read',
         expires: '03-01-2500',
      });

      let returnedInformation = {
         imgUrl: downloadUrl[0],
         imgName: filename
      }

      return returnedInformation
   }

   async deleteImage(imagePath: string): Promise<any> {
      const bucket = admin.storage().bucket();
      const file = bucket.file(imagePath);
      const exists = await file.exists();
      if (!exists[0]) {
         throw new Error('File not found.');
      }
      await file.delete()
   }
}
export const firebaseService = FirebaseService.getInstance()