import CustomInput from '@/shared/components/custom-ui/custom-input';

const Home = () => {
  return (
    <div>
      Home page
      <CustomInput variant="default" subVariant="first-name" />
      <CustomInput variant="default" subVariant="last-name" />
      <CustomInput variant="email" />
      <CustomInput variant="otp" error={true} />
      <CustomInput variant="search" />
      <CustomInput variant="password" subVariant="password" />
      <CustomInput variant="password" subVariant="new-password" />
      <CustomInput variant="password" subVariant="confirm-new-password" disabled={true} />
    </div>
  );
};

export default Home;
