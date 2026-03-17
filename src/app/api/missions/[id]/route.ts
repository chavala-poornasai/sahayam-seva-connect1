
import { NextResponse } from 'next/server';
import { initializeFirebase } from '@/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { firestore } = initializeFirebase();
    const missionSnap = await getDoc(doc(firestore, 'missions', params.id));

    if (!missionSnap.exists()) {
      return NextResponse.json({ error: "Mission not found" }, { status: 404 });
    }

    return NextResponse.json(missionSnap.data());
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { firestore } = initializeFirebase();
    const missionRef = doc(firestore, 'missions', params.id);

    await updateDoc(missionRef, body);

    return NextResponse.json({ message: "Mission updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { firestore } = initializeFirebase();
    await deleteDoc(doc(firestore, 'missions', params.id));

    return NextResponse.json({ message: "Mission deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
