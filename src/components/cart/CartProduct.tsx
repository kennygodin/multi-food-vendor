import Avatar from '@/components/Avatar';

interface CartProductProps {
  id?: string;
  name: string;
  desc: string;
  price: number;
  vendor: string;
  image: string | null;
  onDelete: () => void;
}

const CartProduct: React.FC<CartProductProps> = ({
  id,
  name,
  desc,
  price,
  vendor,
  image,
  onDelete,
}) => {
  return (
    <div className="flex gap-2 items-center justify-between bg-neutral-200 py-2 px-4 rounded-md text-sm">
      <div className="flex gap-2 items-center">
        {image && <Avatar image={image} tab />}
        <div className="flex flex-col">
          <span>
            <b>Name: </b>
            {name}
          </span>
          <span>
            <b>Desc: </b> {desc}
          </span>
          <span>
            <b>Price: </b>
            {price}
          </span>
          <span>
            <b>Vendor: </b>
            {vendor}
          </span>
        </div>
      </div>
      <button onClick={onDelete} className="text-xl">
        x
      </button>
    </div>
  );
};

export default CartProduct;
