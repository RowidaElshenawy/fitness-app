import ProfileContent from '@/features/profile/components/profile-content';
import LayoutBackground from '@/shared/components/auth/layout-background';

const Profile = () => {
  return (
    <>
      <LayoutBackground />
      <div className="z-50">
        <ProfileContent />
      </div>
    </>
  );
};

export default Profile;
