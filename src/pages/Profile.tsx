
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { useToast } from "@/hooks/use-toast";
import UserProfile from '@/components/UserProfile'; // Fixed import statement

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      if (!supabase) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Supabase configuration is missing.",
        });
        navigate('/login');
        return;
      }

      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error || !user) {
          throw new Error('Not authenticated');
        }

        setUserData({
          name: user.email?.split('@')[0] || 'User',
          email: user.email,
          avatarUrl: user.user_metadata.avatar_url,
          rank: 'Contributor',
          xp: 750,
          totalViews: 1234,
          supportCount: 42,
          verifiedPosts: 15,
          joinedDate: new Date(user.created_at).toLocaleDateString(),
          bio: 'A passionate contributor to our community.'
        });
      } catch (error) {
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate, toast]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container max-w-4xl mx-auto">
        {userData && <UserProfile {...userData} />}
      </div>
    </div>
  );
};

export default Profile;
