import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ProfileAvatarProps {
  user: {
    id: string;
    avatar_url: string;
    email?: string;
  };
  onAvatarUpdate: (url: string) => void;
}

export function ProfileAvatar({ user, onAvatarUpdate }: ProfileAvatarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setIsLoading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      onAvatarUpdate(publicUrl);

      toast({
        title: "Avatar updated successfully!",
        duration: 2000,
      });
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "Error updating avatar",
        description: (error as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-24 h-24">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <Avatar className="w-24 h-24">
        <AvatarImage src={user.avatar_url} />
        <AvatarFallback className="bg-revigreen text-background text-xl">
          {user.email?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <label 
        htmlFor="avatar-upload" 
        className="absolute bottom-0 right-0 p-1 bg-background border rounded-full cursor-pointer hover:bg-accent"
      >
        <Camera className="w-4 h-4" />
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
          disabled={isLoading}
        />
      </label>
    </div>
  );
}