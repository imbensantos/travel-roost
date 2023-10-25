import { NextResponse } from "next/server";

import prisma from "@libs/prismadb";
import getCurrentUser from "@actions/getCurrentUser";

interface IParams {
  listingId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { listingId } = params;

  if (!listingId || typeof listingId != "string") throw new Error("Invalid ID");

  const listing = await prisma.listing.deleteMany({
    where: { 
      id: listingId, 
      userId: currentUser.id 
    },
  });

  return NextResponse.json(listing);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await request.json()
  const {
    title,
    description,
    imageSrc,
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    price,
    listingId,
  } = body

  Object.keys(body).forEach((value: any) => {
    if(!body[value]) NextResponse.error()
  })

  if (!listingId || typeof listingId != "string") throw new Error("Invalid ID");

  const listing = await prisma.listing.updateMany({
    where: { 
      id: listingId, 
      userId: currentUser.id 
    },
    data: {
      title,
      description,
      imageSrc,
      category,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      price: parseInt(price, 10),
      userId: currentUser.id,
    }
  });

  return NextResponse.json(listing);
}
