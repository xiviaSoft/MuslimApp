// hooks/useUserActivityDetail.ts
import { useAuth, useUsers } from '@muc/context';
import { db } from '@muc/libs';
import { useQuery } from '@tanstack/react-query';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

const useUserActivityDetail = (name: string) => {
  const { user } = useAuth();
  const { users: allUsers, myBlocked: blockedUsers } = useUsers();

  return useQuery({
    queryKey: ["userActivity", name, user?.uid],
    queryFn: async () => {
      if (!user?.uid) return [];


      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) return [];


      let ids: string[] = userSnap.data()[name] || [];
      if (ids.length === 0) return [];

      ids = ids.filter(id => !blockedUsers.includes(id));

      if (ids.length === 0) return [];


      const localMatches = allUsers.filter(u => ids.includes(u.id));


      const missingIds = ids.filter(id => !localMatches.some(u => u.id === id));

      let firestoreMatches: any[] = [];
      if (missingIds.length > 0) {
        const usersCol = collection(db, "users");
        const q = query(
          usersCol,
          where("__name__", "in", missingIds.slice(0, 10))
        );
        const snap = await getDocs(q);

        firestoreMatches = snap.docs.map(d => ({
          id: d.id,
          firstName: d.data().firstName,
          lastName: d.data().lastName,
          bio: d.data().bio,
        }));
      }


      const combined = [...localMatches, ...firestoreMatches];
      return ids.map(id => combined.find(u => u.id === id)).filter(Boolean);
    },
    enabled: !!user?.uid,
  });
};

export default useUserActivityDetail;
