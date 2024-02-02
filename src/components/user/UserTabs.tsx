import NavLinksItem from '../navbar/NavLinksItem';
import { usePathname } from 'next/navigation';

const UserTabs = () => {
  const currentPath = usePathname();
  //   console.log(currentPath);
  return (
    <div className="flex gap-3 items-center">
      <NavLinksItem
        tab
        label="Profile"
        path={currentPath === '/profile'}
        url=""
      />
      <NavLinksItem
        tab
        label="Categories"
        path={currentPath === '/categories'}
        url=""
      />
      <NavLinksItem
        tab
        label="Menu Items"
        path={currentPath === '/menu-items'}
        url=""
      />
      <NavLinksItem
        tab
        label="Orders"
        path={currentPath === '/orders'}
        url=""
      />
    </div>
  );
};

export default UserTabs;
