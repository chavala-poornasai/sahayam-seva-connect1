
import { NextResponse } from 'next/server';
import { initializeFirebase } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { location, urgency = 'critical' } = body;

    const { firestore } = initializeFirebase();
    const usersSnap = await getDocs(collection(firestore, 'users'));
    const volunteers = usersSnap.docs.map(doc => doc.data());

    // Simple location clustering for emergency
    const nearbyVolunteers = volunteers.filter(v => 
      v.role === 'citizen' && 
      v.location?.toLowerCase().includes(location?.toLowerCase())
    );

    // Simulate notification dispatch
    console.log(`EMERGENCY: Dispatching alerts to ${nearbyVolunteers.length} volunteers in ${location}`);

    return NextResponse.json({ 
      status: "PROTOCOL_ACTIVE",
      location,
      notifiedCount: nearbyVolunteers.length,
      message: `Emergency alerts dispatched to verified responders in the ${location} cluster.`
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
