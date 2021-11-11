import { FieldValue } from '@firebase/firestore';

export default interface Contest {
  uid?: string;
  name: string;
  createdAt: FieldValue;
  updatedAt: FieldValue;
  createdBy?: string;
  updatedBy?: string;
  isWinner?: boolean;
}
