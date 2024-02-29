"use client";
import React, { useEffect, useState } from "react";
import ShowListing from "@components/ShowListing";
import { useSession } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Listing({ params }) {
  const router = useRouter();
  const { isLoaded, session, isSignedIn } = useSession();


  const [submitting, setSubmitting] = useState(false);
  let [listing, setListing] = useState({});
  let [reviews, setReviews] = useState([]);
  let [review, setReview] = useState({
      comment: "",
      rating: "",
    });
    
    useEffect(() => {
        const fetchListing = async () => {
            let response = await fetch(`/api/listing/${params?.id}`);
            let res = await response.json();
            setListing(res);
            setReviews(res.reviews)
        };
        fetchListing();
    }, [review]);
    
    const handleReviewDelete = async (reviewd, listingd) => {
        const hasConfirmed = confirm(
          "Are you sure you want to delete this review?"
        );
    
        if (hasConfirmed) {
          try {
            let filteredReviews = reviews.filter(
              (review) => review._id !== reviewd._id
            );
            console.log(filteredReviews)
            setReviews(filteredReviews);
            await fetch(
              `/api/listing/${listingd._id.toString()}/review/${reviewd._id.toString()}`,
              {
                method: "DELETE",
              }
            );
          } catch (error) {
            console.log(error);
          }
          // }finally {
          //   router.push(`/listing/${listing._id}`);
          // }
        }
      };  
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/listing/${listing._id}/review`, {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          comment: review.comment,
          rating: review.rating,
        }),
      });
      if (response.ok) {
        router.push(`/listing/${listing._id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      setReview({
        comment: "",
        rating: "",
      });
    }
  };

  const handleEdit = async (listing) => {
    router.push(`/listing/${listing._id}/edit`);
  };

  const handleDelete = async () => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this Listing"
    );

    if (hasConfirmed) {
      try {
        let response = await fetch(`/api/listing/${listing._id.toString()}`, {
          method: "DELETE",
        });
        if(response.ok){
          router.push("/");
          toast.success("Listing deleted Successfully");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ShowListing
      listing={listing}
      review={review}
      reviews={reviews}
      setReviews={setReviews}
      setReview={setReview}
      handleReviewSubmit={handleReviewSubmit}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      handleReviewDelete={handleReviewDelete}
      submitting={submitting}
    />
  );
}

export default Listing;
