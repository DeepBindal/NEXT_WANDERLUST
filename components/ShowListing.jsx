import ReviewForm from "./ReviewForm";

import ReviewCard from "./ReviewCard";
import Image from "next/image";
import { useSession } from "@clerk/nextjs";
function ShowListing({
  submitting,
  listing,
  handleDelete,
  handleEdit,
  handleReviewSubmit,
  review,
  setReview,
  reviews,
  handleReviewDelete,
}) {
  const { isLoaded, session, isSignedIn } = useSession();
  return (
    <div className="container lg:mx-auto lg:w-4/6 h-full md:w-5/6 sm:w-full">
      <div className="flex flex-col">
        <h3 className="head_text blue_gradient my-4">
          <span>{listing.title}</span>
        </h3>
        <div className="w-full h-[30vw] overflow-hidden bg-slate-400 rounded-2xl relative">
          <img
            src={
              listing.image?.url ||
              "https://fastly.picsum.photos/id/649/200/200.jpg?hmac=tj148mYv7Me5ctSyCePc_TNjma4W3n3RwnqJcIogLoI"
            }
            alt="listing_image"
            className="object-cover w-full h-full"
            style={{ objectFit: "cover" }}
          />
        </div>
        <p className="text-gray-800  text-sm">
          Owned By : {listing.owner?.username}
        </p>
        <p className="desc">{listing.description}</p>
        <p className="text-gray-600 mt-2 text-xl">
          {listing.location}, <span>{listing.country}</span>
        </p>
        <p className=" font-bold text-lg text-start mt-2">
          &#8377;{listing.price}/ Night
        </p>
        {session?.user && session?.user.id === listing.owner?.id && (
          <div className="mt-5 flex-start gap-4 border-t border-gray-100 pt-3">
            <button
              className="red_btn"
              onClick={() => handleEdit && handleEdit(listing)}
            >
              Edit
            </button>
            <button
              className="red_btn"
              onClick={() => handleDelete && handleDelete(listing)}
            >
              Delete
            </button>
          </div>
        )}
        {session?.user && (
          <ReviewForm
            review={review}
            type={"Create"}
            setReview={setReview}
            handleSubmit={handleReviewSubmit}
            submitting={submitting}
          />
        )}
        <div className="mt-8 prompt_layout">
          {reviews &&
            reviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                handleDelete={() => handleReviewDelete(review, listing)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ShowListing;
