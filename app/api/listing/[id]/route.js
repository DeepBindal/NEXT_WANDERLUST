import connectToDB from "@utils/database";
import Listing from "@models/listing";
import { listingSchema } from "@lib/schema";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    let listing = await Listing.findById(params.id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      });
    // if (!listing) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify(listing), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
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
    let listing = await Listing.findByIdAndUpdate(params.id, {
      title,
      description,
      location,
      country,
      price,
      category,
    });
    if (image.filename !== listing.image.filename) {
      listing.image.url = image.url;
      listing.image.filename = image.filename;
    }

    let savedListing = await listing.save();
    return new Response(JSON.stringify(savedListing), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Listing.findByIdAndDelete(params.id);
    return new Response("Deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
