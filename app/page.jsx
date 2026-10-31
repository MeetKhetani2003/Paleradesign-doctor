import { PROFILE_DATA } from '@/lib/profile-data';
import DynamicProfileView from '@/components/DynamicProfileView';

export default function HomePage() {
  return <DynamicProfileView profile={PROFILE_DATA} isPreview={false} />;
}
