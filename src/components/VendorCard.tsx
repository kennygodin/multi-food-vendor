import Avatar from '@/components/Avatar';

interface VendorCardProps {
  name: string | null;
  email?: string;
  phoneNumber: string | null;
  image: string | null;
  role?: string | null;
  state?: string | null;
  postalCode?: string | null;
  address?: string | null;
  onClick?: () => void;
  large?: boolean;
}
const VendorCard: React.FC<VendorCardProps> = ({
  name,
  email,
  phoneNumber,
  image,
  role,
  state,
  postalCode,
  address,
  onClick,
  large,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${
        large ? 'mt-5' : 'w-full md:w-[300px]'
      }  rounded-md p-4 text-sm leading-4 cursor-pointer transform transition-transform hover:scale-105 shadow-sm bg-white border border-gray-500 flex gap-2 items-start`}
    >
      {image && (
        <div>
          <Avatar image={image} />
        </div>
      )}
      <div className="flex flex-col text-sm">
        <span>
          Vendor name:&nbsp;<b>{name}</b>
        </span>
        <span className="hidden md:block">
          Email:&nbsp;<b>{email}</b>
        </span>
        <span>
          phone:&nbsp;<b>{phoneNumber}</b>
        </span>
        {large && (
          <span>
            Role:&nbsp;<b>{role}</b>
          </span>
        )}
        {large && (
          <span className="flex items-center">
            Address:&nbsp;<span>{address}</span>
          </span>
        )}
        {large && (
          <span className="flex items-center">
            State:&nbsp;<span>{state}</span>
          </span>
        )}
        {large && (
          <span className="flex items-center">
            Postal code:&nbsp;<span>{postalCode}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default VendorCard;
