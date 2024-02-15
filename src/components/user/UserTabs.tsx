import NavLinksItem from '../navbar/NavLinksItem';
import { usePathname } from 'next/navigation';

interface UserTabsProps {
  role: null | string;
}

const UserTabs: React.FC<UserTabsProps> = ({ role }) => {
  const currentPath = usePathname();
  // console.log(role);
  return (
    <div className="flex flex-wrap justify-center gap-3 items-center">
      <NavLinksItem
        tab
        label="Profile"
        path={currentPath === '/profile'}
        url="/profile"
      />
      {role === 'VENDOR' && (
        <NavLinksItem
          tab
          label="Categories"
          path={currentPath === '/categories'}
          url="/categories"
        />
      )}
      {role === 'VENDOR' && (
        <NavLinksItem
          tab
          label="Menu Items"
          path={currentPath === '/menu-items'}
          url="/menu-items"
        />
      )}
      {
        <NavLinksItem
          tab
          label="Orders"
          path={currentPath === '/orders'}
          url="/orders"
        />
      }
    </div>
  );
};

export default UserTabs;
