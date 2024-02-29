import React from "react";
import Link from "next/link";
function Form({ type, listing, submitting, handleSubmit, setListing}) {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-full">
        {type} and share amazing stays with the world.
      </p>

      <form
      encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Title
          </span>
          <input
            value={listing.title}
            onChange={(e) => setListing({ ...listing, title: e.target.value })}
            placeholder="Enter title"
            className="form_input"
            required
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Description
          </span>
          <input
            value={listing.description}
            onChange={(e) => setListing({ ...listing, description: e.target.value })}
            placeholder="Enter description"
            className="form_input"
            required
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Image Url
          </span>
          <input
            name="file"
            type="file"
            placeholder="Enter url"
            className="form_input"
            required
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Price
          </span>
          <input
            value={listing.price}
            type="number"
            onChange={(e) => setListing({ ...listing, price: e.target.valueAsNumber })}
            placeholder="Enter price"
            className="form_input"
            required
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Location
          </span>
          <input
            value={listing.location}
            onChange={(e) => setListing({ ...listing, location: e.target.value })}
            placeholder="Enter location"
            className="form_input"
            required
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Country
          </span>
          <input
            value={listing.country}
            onChange={(e) => setListing({ ...listing,country: e.target.value })}
            placeholder="Enter country"
            className="form_input"
            required
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Category
          </span>
          <input
            value={listing.category}
            onChange={(e) => setListing({ ...listing, category: e.target.value })}
            placeholder="Enter category"
            className="form_input"
          />
        </label>
       
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;
