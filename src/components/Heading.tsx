interface HeadingProps {
  mainTitle: string;
  subTitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ mainTitle, subTitle, center }) => {
  return (
    <div className={center ? 'text-center' : ''}>
      <div className="text-2xl font-semibold">{mainTitle}</div>
      <div className="text-md">{subTitle}</div>
    </div>
  );
};

export default Heading;
