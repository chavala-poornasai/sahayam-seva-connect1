
import { NextResponse } from 'next/server';
import { initializeFirebase } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    const { firestore } = initializeFirebase();
    const missionsSnap = await getDocs(collection(firestore, 'missions'));
    const missions = missionsSnap.docs.map(doc => doc.data());

    return NextResponse.json(missions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
