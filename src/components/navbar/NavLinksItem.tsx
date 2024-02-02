import Link from 'next/link';

interface NavLinkItemProps {
  url: string;
  label: string;
  tab?: boolean;
  path?: boolean;
}

const NavLinksItem: React.FC<NavLinkItemProps> = ({
  url,
  label,
  tab,
  path,
}) => {
  return (
    <Link
      className={`items-center font-semibold rounded-full px-2 py-1 hover:text-orange-500 hover:bg-neutral-100 transition cursor-pointer ${
        tab ? 'bg-neutral-100' : ''
      } ${tab ? 'text-black' : ''} ${
        path ? 'border border-orange-500 text-orange-500' : ''
      }`}
      href={url}
    >
      {label}
    </Link>
  );
};

export default NavLinksItem;
