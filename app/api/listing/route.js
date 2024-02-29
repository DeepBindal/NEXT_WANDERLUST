import connectToDB from "@utils/database";
import Listing from "@models/listing";

export const GET = async (req, res) => {
    try {
        await connectToDB();

        const allListings = await Listing.find({});
        return new Response(JSON.stringify(allListings), {status: 201})
    } catch (error) {
        return new Response("Failed to fetch Listings", {status: 500})
    }
}