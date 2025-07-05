import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";

// ... (import tetap)

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
  setUser: (user: User | null) => void;
  login: (user: User, token: string) => void; // ✅ tambahkan login di tipe
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

        setUser({
          id: session.user.id,
          email: session.user.email!,
          fullName: profile?.fullName,
          phone: profile?.phone,
          avatar: profile?.avatar,
          bio: profile?.bio,
          location: profile?.location,
          website: profile?.website,
          plan: profile?.plan,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const { data: profile } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("user_id", session.user.id)
            .single();

          setUser({
            id: session.user.id,
            email: session.user.email!,
            fullName: profile?.fullName,
            phone: profile?.phone,
            avatar: profile?.avatar,
            bio: profile?.bio,
            location: profile?.location,
            website: profile?.website,
            plan: profile?.plan,
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // ✅ Tambahkan login manual (untuk login setelah register)
  const login = (userData: User, _token: string) => {
    setUser(userData);
    // Simpan token jika kamu butuh, contoh:
    // localStorage.setItem("token", token);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading, logout, setUser, login }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
