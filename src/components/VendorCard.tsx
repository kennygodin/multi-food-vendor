import Avatar from '@/components/Avatar';

interface VendorCardProps {
  name: string | null;
  email: string;
  phoneNumber: string | null;
  image: string | null;
}
const VendorCard: React.FC<VendorCardProps> = ({
  name,
  email,
  phoneNumber,
  image,
}) => {
  return (
    <div className="w-[300px] rounded-md p-4 text-sm leading-4 cursor-pointer transform transition-transform hover:scale-105 shadow-sm bg-white border border-gray-500 flex gap-2 items-start">
      {image && (
        <div>
          <Avatar image={image} />
        </div>
      )}
      <div className="flex flex-col">
        <span className="flex items-center">
          Vendor name:&nbsp;<span>{name}</span>
        </span>
        <span className="flex items-center">
          Email:&nbsp;<span>{email}</span>
        </span>
        <span className="flex items-center">
          phone:&nbsp;<span>{phoneNumber}</span>
        </span>
      </div>
    </div>
  );
};

export default VendorCard;
