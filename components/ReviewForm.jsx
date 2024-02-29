import React from "react";

export default function Reviewform({
  handleSubmit,
  review,
  setReview,
  submitting,
  type,
}) {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text">
        <span className="blue_gradient">Leave a review</span>
      </h1>
      <form
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="slider" className="text-lg">
            Rating:
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              name="slider"
              min="1"
              max="5"
              step="1"
              value={review?.rating}
              onChange={(e) => setReview({ ...review, rating: e.target.value })}
              className="appearance-none w-64 h-2 bg-gray-300 rounded-md outline-none focus:outline-none active:outline-none"
            />
            <span className="text-lg">{review?.rating}</span>
          </div>
        </div>

        <div className="mb-3">
          <label
            className="block text-base font-semibold text-gray-700"
            htmlFor="review"
          >
            Enter a review
          </label>
          <input
            type="text"
            id="review"
            placeholder="Leave a review"
            value={review?.comment || ""}
            className="form_input"
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`px-5 py-2 text-sm bg-primary-orange rounded-full text-white ${
            submitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {submitting ? `${type}ing...` : type}
        </button>
      </form>
    </section>
  );
}
