
import { NextResponse } from 'next/server';
import { initializeFirebase } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, requiredSkills, location, urgency, volunteersNeeded } = body;

    const { firestore } = initializeFirebase();
    const missionId = `mission-${Math.random().toString(36).substr(2, 9)}`;
    const missionRef = doc(firestore, 'missions', missionId);

    const newMission = {
      id: missionId,
      title,
      description,
      requiredSkills: requiredSkills || [],
      location,
      urgency: urgency || 'Medium',
      volunteersNeeded: volunteersNeeded || 1,
      assignedVolunteers: [],
      status: 'open'
    };

    await setDoc(missionRef, newMission);

    return NextResponse.json({ message: "Mission created", mission: newMission });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
