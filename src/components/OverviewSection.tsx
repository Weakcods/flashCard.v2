import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from "date-fns";
import { Calendar, Activity } from "lucide-react";

export function OverviewSection() {
  const { data: user } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      return { ...user, ...profile };
    },
  });

  const { data: flashcardsData } = useQuery({
    queryKey: ['flashcards-stats'],
    queryFn: async () => {
      const { data: flashcards } = await supabase
        .from('flashcards')
        .select('created_at')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);
      return flashcards;
    },
  });

  const { data: aiQuestionsData } = useQuery({
    queryKey: ['ai-questions-stats'],
    queryFn: async () => {
      const { data: questions } = await supabase
        .from('ai_questions')
        .select('created_at')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);
      return questions;
    },
  });

  const updateChatData = async () => {
    const { data: chats } = await supabase
      .from('chat')
      .select('created_at')
      .eq('user_id', (await supabase.auth.getUser()).data.user?.id);
    setChatData(chats);
  };

  const { data: chatData, refetch: refetchChatData } = useQuery({
    queryKey: ['chat-stats'],
    queryFn: async () => {
      const { data: chats } = await supabase
        .from('chats')
        .select('created_at')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);
      return chats;
    },
  });

  const chartData = [
    { name: 'Flashcards', count: flashcardsData?.length || 0 },
    { name: 'AI Questions', count: aiQuestionsData?.length || 0 },
    { name: 'Chats', count: chatData?.length || 0 },
  ];

  const today = new Date();

  return (
    <div className="space-y-6 pt-16 md:pt-0">
      <div className="flex flex-col gap-4">
        <Card className="p-6 bg-gradient-to-r from-revigreen/10 to-transparent">
          <h2 className="text-2xl font-bold mb-2">
            Welcome back, {user?.first_name || 'User'}!
          </h2>
          <p className="text-muted-foreground">
            Today is {format(today, 'EEEE, MMMM do, yyyy')}
          </p>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-revigreen" />
              <h3 className="text-lg font-semibold">Your Activity</h3>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="count" stroke="#24FE41" fill="#24FE41" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-revigreen" />
              <h3 className="text-lg font-semibold">Statistics</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Flashcards</p>
                <p className="text-2xl font-bold">{flashcardsData?.length || 0}</p>
                <p className="text-sm text-muted-foreground">
                  Last updated: {flashcardsData?.[0]?.created_at ? 
                    format(new Date(flashcardsData[0].created_at), 'MMM do, yyyy') : 
                    'No cards yet'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total AI Questions</p>
                <p className="text-2xl font-bold">{aiQuestionsData?.length || 0}</p>
                <p className="text-sm text-muted-foreground">
                  Last updated: {aiQuestionsData?.[0]?.created_at ? 
                    format(new Date(aiQuestionsData[0].created_at), 'MMM do, yyyy') : 
                    'No questions yet'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}