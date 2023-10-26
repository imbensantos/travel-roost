import prisma from "@libs/prismadb";

export interface IListingsParams {
  userId?: string;
  category?: string;
  locationValue?: string;
  startDate?: string;
  endDate?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      category,
      locationValue,
      startDate,
      endDate,
      guestCount,
      roomCount,
      bathroomCount,
    } = params;

    let query: any = {};

    if (userId) query.userId = userId;
    if (category) query.category = category;
    if (locationValue) query.locationValue = locationValue;
    
    if (guestCount) query.guestCount = { gte: +guestCount };
    if (roomCount) query.roomCount = { gte: +roomCount };
    if (bathroomCount) query.bathroomCount = { gte: +bathroomCount };
    
    // NOT has to be at the end of the query, otherwise it won't work
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                startDate: { gte: startDate }, // reservation startDate is after start of availability
                endDate: { lte: endDate }, // reservation endDate is before end of availability
              },
              {
                startDate: { lte: endDate }, // reservation startDate is before end of availability
                endDate: { gte: startDate }, // reservation endDate is after start of availability
              }
            ]
          }
        }
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
