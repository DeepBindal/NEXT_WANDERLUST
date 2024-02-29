import connectToDB from "@utils/database";
import Listing from "@models/listing";
import Review from "@models/review";

export const DELETE = async (req, {params}) => {
    try {
        await connectToDB();
        await Listing.findByIdAndUpdate (params.id, {$pull : {reviews : params.reviewId}});
        await Review.findByIdAndDelete(params.reviewId);
        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }

}