import Container from './Container';
import Heading from './Heading';

const About = () => {
  return (
    <Container>
      <div className="max-w-3xl mx-auto p-5 flex flex-col gap-3 text-justify">
        <Heading
          mainTitle="FoodTroops"
          subTitle="Where Culinary Delights Unite!"
          center
          home
        />
        <p>
          At FoodTroops, we believe that every meal tells a unique story, a tale
          woven with flavors, aromas, and the passion of talented chefs.
          We&apos;ve brought together a diverse array of food vendors, each with
          their own culinary prowess, ready to embark on a journey to satisfy
          your cravings.
        </p>
        <p>
          Explore a symphony of flavors from various categories, whether
          you&apos;re in the mood for mouth-watering cakes, sizzling pizzas, or
          delightful pastas. Our vendors are culinary enthusiasts, crafting each
          dish with precision and love to bring you an exceptional dining
          experience.
        </p>
      </div>
    </Container>
  );
};

export default About;
