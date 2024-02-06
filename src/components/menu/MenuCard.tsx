import Image from 'next/image';
import { MenuItem } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface MenuCardProps {
  name: string;
  desc: string;
  price: string | number;
  vendor: { name: string };
  image: string | null;
  menuItem: MenuItem;
}

const MenuCard: React.FC<MenuCardProps> = ({
  name,
  desc,
  price,
  vendor,
  image,
  menuItem,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/menu-items/${menuItem.id}`)}
      className="h-[280px] transform transition-transform hover:scale-105 shadow-sm"
    >
      <div className="w-40 h-full p-5 bg-neutral-200 flex flex-col gap-1 rounded-lg cursor-pointer hover:opacity-80 hover:border">
        <div className="relative w-full h-20">
          {image === null || '' ? (
            <div>No image</div>
          ) : (
            <Image
              src={image}
              alt="menu-item"
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          )}
        </div>
        <div className="flex flex-col gap-1 text-sm leading-4 mt-1">
          <span>
            <span className="font-bold">Name: </span> {name}
          </span>
          <span>
            <span className="font-bold "> Desc: </span>
            {desc}
          </span>
          <span>
            <span className="font-bold">Price: </span> {price}
          </span>
          <span>
            <span className="font-bold">Vendor: </span> {vendor.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
