import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProfileAvatar } from "./profile/ProfileAvatar";
import { ProfileForm } from "./profile/ProfileForm";
import { Loader2 } from "lucide-react";

export function ProfileSection() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // Try to get the profile data
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          // If no profile exists, create one
          if (!profile) {
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert([{ 
                id: session.user.id,
                first_name: '',
                last_name: '',
              }])
              .select()
              .single();

            if (!createError && newProfile) {
              setCurrentUser({
                ...session.user,
                ...newProfile
              });
            }
          } else {
            setCurrentUser({
              ...session.user,
              ...profile
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          setCurrentUser({
            ...session.user,
            ...profile
          });
        }
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-full">
        Please sign in to view your profile
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <ProfileAvatar 
          user={currentUser} 
          onAvatarUpdate={(url) => setCurrentUser(prev => ({ ...prev, avatar_url: url }))}
        />
        <ProfileForm 
          user={currentUser}
          onProfileUpdate={(data) => setCurrentUser(prev => ({ ...prev, ...data }))}
        />
      </div>
    </div>
  );
}