
import { NextResponse } from 'next/server';
import { initializeFirebase } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, email, phone, skills, location, availabilityDates } = body;

    if (!id || !email) {
      return NextResponse.json({ error: "Missing required fields: id, email" }, { status: 400 });
    }

    const { firestore } = initializeFirebase();
    const userRef = doc(firestore, 'users', id);

    const newUser = {
      id,
      name,
      email,
      phone: phone || "",
      skills: skills || [],
      location: location || "",
      availabilityDates: availabilityDates || [],
      trustScore: 50,
      missionsCompleted: 0
    };

    await setDoc(userRef, newUser);

    return NextResponse.json({ message: "User registered successfully", user: newUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
