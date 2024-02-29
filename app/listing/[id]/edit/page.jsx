"use client";
import EditForm from "@components/EditForm";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function Edit({ params }) {
  let router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [listing, setListing] = useState({});
  useEffect(() => {
    const fetchListing = async () => {
      let response = await fetch(`/api/listing/${params?.id}`);
      let res = await response.json();
      setListing(res);
    };
    fetchListing();
  }, []);

  async function handleResponse(response) {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }else{
      setSubmitting(false);
      router.push(`/listing/${params.id}`);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const form = e.currentTarget;
      const fileInput = Array.from(form.elements).find(
        ({ name }) => name === "file"
      );

      // console.log(fileInput.files)
      if (fileInput.files.length > 0) {
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
        ).then((r) => r.json());
        const response = await fetch(`/api/listing/${params.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            title: listing.title,
            description: listing.description,
            image: { url: data.secure_url, filename: data.original_filename },
            location: listing.location,
            country: listing.country,
            price: listing.price,
            category: listing.category,
            formData,
          }),
        });
        await handleResponse(response);
      } else {
        const response = await fetch(`/api/listing/${params.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            title: listing.title,
            description: listing.description,
            location: listing.location,
            country: listing.country,
            image: { url: listing.image.url, filename: listing.image.filename },
            price: listing.price,
            category: listing.category,
          }),
        });
        await handleResponse(response);
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      toast.error(error.toString());
    }
  };
  return (
    <>
      <EditForm
        type="Edit"
        listing={listing}
        submitting={submitting}
        handleSubmit={handleSubmit}
        setListing={setListing}
      />
    </>
  );
}

export default Edit;
