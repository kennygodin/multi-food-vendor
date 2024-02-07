interface HeadingProps {
  mainTitle: string;
  subTitle?: string;
  center?: boolean;
  home?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  mainTitle,
  subTitle,
  center,
  home,
}) => {
  return (
    <div className={`${center && 'text-center'}`}>
      <div
        className={`
      text-2xl font-semibold ${home && 'text-orange-500'}
      `}
      >
        {mainTitle}
      </div>
      <div className="text-md">{subTitle}</div>
    </div>
  );
};

export default Heading;
