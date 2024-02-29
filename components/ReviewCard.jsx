import Image from "next/image";
import { useSession } from "@clerk/nextjs";

const ReviewCard = ({ review, handleDelete }) => {
  const { isLoaded, session, isSignedIn } = useSession();
  return ( 
    <div className='prompt_card'>
    <div className='flex justify-between items-start gap-5'>
      <div
        className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
      >
        <Image
          src="/images/user.svg"
          alt='user_image'
          width={30}
          height={30}
          className='rounded-full object-cover'
        />

        <div className='flex flex-col'>
          <h3 className='font-satoshi font-semibold text-gray-900'>
            {review.author?.username}
          </h3>
        </div>
      </div>
    </div>

    <p className='my-4 font-satoshi text-sm text-gray-700'>{review?.comment}</p>

    {session?.user.id === review.author?.id && (
      <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
        <p
          className='font-inter text-sm orange_gradient cursor-pointer'
          onClick={handleDelete}
        >
          Delete
        </p>
      </div>
    )}
  </div>
  );
};

export default ReviewCard;
