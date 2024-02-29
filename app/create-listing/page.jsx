"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import toast from "react-hot-toast";


function CreateListing() {
  const router = useRouter();
  
  const [submitting, setSubmitting] = useState(false);
  const [listing, setListing] = useState({
    title: "",
    description: "",
    image: {
      url: "",
      filename: "",
    },
    location: "",
    country: "",
    price: 0,
    category: "",
  });
  async function handleResponse(response) {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
  }

  const CreateListing = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );
    const formData = new FormData();
    for (const file of fileInput.files) {
      formData.append("file", file);
    }
    formData.append("upload_preset", "my-uploads");
    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dnwxccz0p/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then(r => r.json());
    try {
      console.log(typeof(listing.price))
      const response = await fetch("/api/listing/new", {
        method: "POST",
        body: JSON.stringify({
          title: listing.title,
          description: listing.description,
          image: { url: data.secure_url, filename: data.original_filename },
          location: listing.location,
          country: listing.country,
          price: listing.price,
          category: listing.category,
        }),
      });
    
      await handleResponse(response);
    
      // If the response is successful, continue with further actions
      router.push("/");
      toast.success("New Listing Created!");
    } catch (error) {
      // Handle errors
      console.error("Error:", error.message);
      toast.error(error.message);
    } finally {
      // Reset submitting state
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Create"
      listing={listing}
      submitting={submitting}
      handleSubmit={CreateListing}
      setListing={setListing}
    />
  );
}

export default CreateListing;
