import Listing from "@models/listing";
import Review from "@models/review";

import connectToDB from "@utils/database";
import { clerkClient } from '@clerk/nextjs';

export const POST = async (request, { params }) => {
  try {
    await connectToDB();
    let { userId, rating, comment } = await request.json();
    let newReview = new Review({
      comment,
      rating,
    });
    const user = await clerkClient.users.getUser(userId);
    newReview.author.id = user.id;
    newReview.author.username = user.username;

    console.log(newReview);
    let listing = await Listing.findById(params.id);
    listing.reviews.push(newReview);
    await listing.save();
    await newReview.save();
    return new Response(JSON.stringify(listing), { status: 200 })
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
