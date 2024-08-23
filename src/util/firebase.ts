import admin, { ServiceAccount } from 'firebase-admin';
import { TokenMessage, getMessaging } from 'firebase-admin/messaging';
import serviceAccount from '../serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  projectId: 'gradproject-7956f',
});

export default getMessaging;