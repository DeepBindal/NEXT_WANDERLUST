import Listing from "@models/listing";
import connectToDB from "@utils/database";
import { geoCode } from "@utils/geocode";
import { clerkClient } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import { listingSchema } from "@lib/schema";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { userId } = auth();
  try {
    await connectToDB();
    let { title, description, image, location, country, price, category } =
      await req.json();

    let result = listingSchema.safeParse({
      title,
      description,
      price,
      location,
      country,
    });
    if (!result.success) {
      let errorMsg = "";
      result.error.issues.forEach((issue) => {
        errorMsg =
          errorMsg +
          issue.path[0].toUpperCase() +
          " : " +
          issue.message +
          ". ";
      });
      console.log(errorMsg);
      throw new Error(errorMsg);
    }
    let geometry = await geoCode(location);
    const user = await clerkClient.users.getUser(userId);

    let newListing = new Listing({
      title,
      description,
      location,
      country,
      price,
      category,
      geometry,
    });
    newListing.image.url = image.url;
    newListing.image.filename = image.filename;
    newListing.owner.id = userId;
    newListing.owner.username = user.username;

    let savedListing = await newListing.save();

    return new Response(JSON.stringify(savedListing), { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
