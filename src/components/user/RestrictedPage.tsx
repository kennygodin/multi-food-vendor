import React from 'react';
import UserTabs from './UserTabs';
import Heading from '../Heading';

interface RestrictedPageProps {
  role: string | null;
}

const RestrictedPage: React.FC<RestrictedPageProps> = ({ role }) => {
  return (
    <div className="max-w-3xl mx-auto mt-8 text-center flex flex-col gap-3 items-center">
      <UserTabs role={role} />
      <Heading
        mainTitle="Not Allowed!!!"
        subTitle="Only vendors are allowed to view this page"
      />
    </div>
  );
};

export default RestrictedPage;
