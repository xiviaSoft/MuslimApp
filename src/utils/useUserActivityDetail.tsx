// hooks/useUserActivityDetail.ts
import { auth, db } from '@muc/libs';
import { useQuery } from '@tanstack/react-query';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

const useUserActivityDetail = (name: string) => {
  return useQuery({
    queryKey: ["userActivity", name, auth.currentUser?.uid],
    queryFn: async () => {
      if (!auth.currentUser?.uid) return [];

      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) return [];

      // dynamically access the field (likes, views, etc.)
      const ids: string[] = userSnap.data()[name] || [];
      if (ids.length === 0) return [];

      // fetch users where ID is in that array
      const q = query(
        collection(db, "users"),
        where("__name__", "in", ids.slice(0, 10)) // limit Firestore "in" to max 10
      );
      const snap = await getDocs(q);

      return snap.docs.map((doc) => ({
        id: doc.id,
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
        bio: doc.data().bio,
      }));
    },
    placeholderData: [],
     enabled: !!auth.currentUser?.uid,
  });
};

export default useUserActivityDetail;