'use client';

import Input from './Input';
import Button from '../buttons/Button';

interface ProfileDetailsProps {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  state: string;
  country: string;
  postalCode: string;
  setName: (value: any) => void;
  setEmail: (value: any) => void;
  setPhoneNumber: (value: any) => void;
  setAddress: (value: any) => void;
  setState: (value: any) => void;
  setCountry: (value: any) => void;
  setPostalCode: (value: any) => void;
  label?: string;
  onClick?: () => void;
  profile?: boolean;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  name,
  email,
  address,
  phoneNumber,
  state,
  country,
  postalCode,
  setName,
  setEmail,
  setPhoneNumber,
  setAddress,
  setState,
  setCountry,
  setPostalCode,
  label,
  profile,
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <Input
        id="name"
        label="Name or Business name"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      />
      <Input
        id="email"
        label="Email or Admin email"
        disabled={profile}
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
      />
      <Input
        id="phoneNumber"
        label="Phone number"
        value={phoneNumber}
        onChange={(e: any) => setPhoneNumber(e.target.value)}
      />
      <Input
        id="address"
        label="Address"
        value={address}
        onChange={(e: any) => setAddress(e.target.value)}
      />
      <Input id="state" label="State" value={state} onChange={setState} />

      <div className="flex gap-2">
        <Input
          id="country"
          label="Country"
          value={country}
          onChange={(e: any) => setCountry(e.target.value)}
        />
        <Input
          id="postal code"
          label="Postal code"
          value={postalCode}
          onChange={(e: any) => setPostalCode(e.target.value)}
        />
      </div>
      {!profile && label && <Button label={label} onClick={() => {}} />}
    </div>
  );
};

export default ProfileDetails;
