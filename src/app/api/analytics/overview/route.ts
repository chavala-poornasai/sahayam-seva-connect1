
import { NextResponse } from 'next/server';
import { initializeFirebase } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    const { firestore } = initializeFirebase();

    const usersSnap = await getDocs(collection(firestore, 'users'));
    const missionsSnap = await getDocs(collection(firestore, 'missions'));

    const users = usersSnap.docs.map(d => d.data());
    const missions = missionsSnap.docs.map(d => d.data());

    const stats = {
      totalVolunteers: users.filter(u => u.role === 'citizen').length,
      totalNgos: users.filter(u => u.role === 'ngo').length,
      totalMissions: missions.length,
      completedMissions: missions.filter(m => m.status === 'completed').length,
      totalHoursContributed: users.reduce((acc, curr) => acc + (curr.hoursContributed || 0), 0),
      nationalSevaImpact: users.reduce((acc, curr) => acc + (curr.sevaScore || 0), 0)
    };

    return NextResponse.json(stats);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
