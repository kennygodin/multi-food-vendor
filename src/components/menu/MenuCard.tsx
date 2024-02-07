import Image from 'next/image';
import { MenuItem } from '@prisma/client';
import { useRouter } from 'next/navigation';
import Button from '../buttons/Button';

interface MenuCardProps {
  name: string;
  desc: string;
  price: string | number;
  vendor: { name: string };
  image: string | null;
  menuItem?: MenuItem;
  home?: boolean;
}

const MenuCard: React.FC<MenuCardProps> = ({
  name,
  desc,
  price,
  vendor,
  image,
  menuItem,
  home,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => menuItem && router.push(`/menu-items/${menuItem.id}`)}
      className={`${
        home
          ? 'h-[300px] flex flex-col justify-between'
          : 'h-[280px] cursor-pointer'
      } p-5 transform transition-transform hover:scale-105 shadow-sm bg-neutral-200 rounded-lg`}
    >
      <div
        className={`w-40 flex flex-col gap-1  ${
          home ? 'h-[90%]' : 'hover:opacity-80 hover:border h-full'
        } `}
      >
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
      {home && <Button label="Add to cart" small outline />}
    </div>
  );
};

export default MenuCard;
