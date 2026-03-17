
import { NextResponse } from 'next/server';
import { initializeFirebase } from '@/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { calculateMatchScore } from '@/lib/matching-engine';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const missionId = params.id;
    const { firestore } = initializeFirebase();

    // 1. Get Mission
    const missionSnap = await getDoc(doc(firestore, 'missions', missionId));
    if (!missionSnap.exists()) {
      return NextResponse.json({ error: "Mission not found" }, { status: 404 });
    }
    const mission = missionSnap.data();

    // 2. Get All Volunteers
    const usersSnap = await getDocs(collection(firestore, 'users'));
    const volunteers = usersSnap.docs
      .map(doc => doc.data())
      .filter(u => u.role === 'citizen');

    // 3. Run Matching Algorithm
    const matches = volunteers.map(v => calculateMatchScore(v, mission))
      .filter(m => m.score > 0)
      .sort((a, b) => b.score - a.score);

    return NextResponse.json({ 
      mission: mission.title,
      totalVolunteersAnalyzed: volunteers.length,
      matches 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
