import ProfileBackground from '@/features/profile/components/profile-background';
import ProfileContent from '@/features/profile/components/profile-content';

const Profile = () => {
  return (
    <div className="relative min-h-screen w-full">
      <ProfileBackground />
      <ProfileContent />
    </div>
  );
};

export default Profile;
